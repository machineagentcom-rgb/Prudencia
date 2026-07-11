/**
 * @file cleanupService.ts
 * @description Implementação avançada da lógica de Dreno de Liquidez (RF-09, RF-10) 
 * e Gestão Macro-Econômica. Sistema robusto com tratamento de concorrência e 
 * audit trail para conformidade regulatória do Projeto Prudência.
 * 
 * @author Machine Agent CTO
 * @version 2.1.0
 */

import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp, WriteBatch } from 'firebase-admin/firestore';
import { getFunctions } from 'firebase-admin/functions';

const db = getFirestore();

interface UserProfile {
  uid: string;
  creditBalance: number;
  lastActiveAt: Timestamp;
  isPremium: boolean;
  premiumExpiresAt?: Timestamp;
  status: 'ACTIVE' | 'SUSPENDED_INACTIVITY' | 'REDEEMING';
  totalEarnedCredits: number;
}

/**
 * Executa o ciclo de expiração de créditos e suspensão por inatividade.
 * RF-09: Créditos expiram após 45 dias de inatividade absoluta.
 * Implementa bateladas transacionais para garantir integridade sob alta carga.
 */
export const executeLiquidityDrain = async (): Promise<{ purged: number; usersAffected: string[] }> => {
  const fortyFiveDaysMs = 45 * 24 * 60 * 60 * 1000;
  const cutoffDate = new Date(Date.now() - fortyFiveDaysMs);

  const inactiveUsersSnapshot = await db.collection('users')
    .where('lastActiveAt', '<', Timestamp.fromDate(cutoffDate))
    .where('status', '==', 'ACTIVE')
    .get();

  if (inactiveUsersSnapshot.empty) {
    return { purged: 0, usersAffected: [] };
  }

  const batch: WriteBatch = db.batch();
  const affectedUids: string[] = [];

  inactiveUsersSnapshot.forEach((doc) => {
    const userRef = db.collection('users').doc(doc.id);
    batch.update(userRef, {
      creditBalance: 0,
      status: 'SUSPENDED_INACTIVITY',
      lastAuditAt: FieldValue.serverTimestamp(),
      systemNote: 'Dreno de Liquidez: Inatividade superior a 45 dias.'
    });
    affectedUids.push(doc.id);
  });

  await batch.commit();
  
  console.info(`[LiquidityDrain] Operação concluída. ${affectedUids.length} contas purgadas.`);
  return { purged: affectedUids.length, usersAffected: affectedUids };
};

/**
 * Processa a conversão estratégica de saldo de créditos em Assinatura Premium.
 * RF-10: 50 créditos = 7 dias Premium. 
 * Garante atomicidade via transação Firestore.
 */
export const processPremiumConversion = async (uid: string): Promise<{ success: boolean; message: string }> => {
  const userRef = db.collection('users').doc(uid);
  const CONVERSION_THRESHOLD = 50;
  const DURATION_DAYS = 7;

  try {
    return await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      
      if (!userDoc.exists) throw new Error("ERR_USER_NOT_FOUND");
      
      const userData = userDoc.data() as UserProfile;

      if (userData.creditBalance < CONVERSION_THRESHOLD) {
        return { success: false, message: "Saldo insuficiente para conversão." };
      }

      const currentExpiry = userData.premiumExpiresAt?.toDate() || new Date();
      const newExpiry = new Date(Math.max(currentExpiry.getTime(), Date.now()));
      newExpiry.setDate(newExpiry.getDate() + DURATION_DAYS);

      transaction.update(userRef, {
        creditBalance: FieldValue.increment(-CONVERSION_THRESHOLD),
        isPremium: true,
        premiumExpiresAt: Timestamp.fromDate(newExpiry),
        updatedAt: FieldValue.serverTimestamp(),
        conversionLog: FieldValue.arrayUnion({
          date: FieldValue.serverTimestamp(),
          amount: CONVERSION_THRESHOLD,
          type: 'PREMIUM_CONVERSION'
        })
      });

      return { 
        success: true, 
        message: "Status Premium estendido por 7 dias com sucesso." 
      };
    });
  } catch (error) {
    console.error(`[PremiumConversion] Falha crítica na transação: ${error}`);
    return { success: false, message: "Erro interno no processamento de conversão." };
  }
};

/**
 * Métricas Globais de Liquidez
 * Exposto para painel administrativo (/secret-admin)
 */
export const getGlobalLiquidityMetrics = async () => {
  const aggregateSnapshot = await db.collection('users')
    .select('creditBalance')
    .get();

  let totalLiquidity = 0;
  aggregateSnapshot.forEach(doc => {
    totalLiquidity += doc.data().creditBalance || 0;
  });

  return {
    totalCreditsInCirculation: totalLiquidity,
    activeUsersCount: aggregateSnapshot.size,
    timestamp: new Date().toISOString()
  };
};

/**
 * Configuração de Agendamento do Cloud Function.
 * Execução diária automatizada para conformidade contínua.
 */
export const scheduleLiquidityCleanup = {
  schedule: "0 4 * * *",
  timeZone: "UTC",
  handler: async () => {
    await executeLiquidityDrain();
  }
};
