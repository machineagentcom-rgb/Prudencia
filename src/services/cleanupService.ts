/**
 * @file cleanupService.ts
 * @description Implementação da lógica de Dreno de Liquidez conforme RF-09 e RF-10.
 * Este serviço é executado via Firebase Cloud Functions (Scheduled) para purgar 
 * créditos inativos e processar conversões Premium.
 * 
 * @author Machine Agent CTO
 * @version 1.0.0
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getFunctions } from 'firebase-admin/functions';

const db = getFirestore();

interface UserProfile {
  uid: string;
  creditBalance: number;
  lastActiveAt: Date;
  isPremium: boolean;
  streakStatus: string;
}

/**
 * Executa o ciclo de expiração de créditos (45 dias de inatividade).
 * RF-09: Créditos e saldos virtuais expiram de forma irreversível após 45 dias.
 */
export const executeLiquidityDrain = async (): Promise<{ purged: number }> => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 45);

  const inactiveUsersSnapshot = await db.collection('users')
    .where('lastActiveAt', '<', cutoffDate)
    .where('creditBalance', '>', 0)
    .get();

  const batch = db.batch();
  let count = 0;

  inactiveUsersSnapshot.forEach((doc) => {
    const userRef = db.collection('users').doc(doc.id);
    batch.update(userRef, {
      creditBalance: 0,
      lastAuditAt: FieldValue.serverTimestamp(),
      status: 'SUSPENDED_INACTIVITY'
    });
    count++;
  });

  await batch.commit();
  console.info(`[LiquidityDrain] Limpeza executada: ${count} usuários purgados.`);
  return { purged: count };
};

/**
 * Processa a conversão de saldo de créditos em Assinatura Premium.
 * RF-10: 50 créditos acumulados = 7 dias de assinatura Premium.
 */
export const processPremiumConversion = async (uid: string): Promise<{ success: boolean; message: string }> => {
  const userRef = db.collection('users').doc(uid);
  
  return await db.runTransaction(async (transaction) => {
    const userDoc = await transaction.get(userRef);
    
    if (!userDoc.exists) throw new Error("Usuário não encontrado.");
    
    const userData = userDoc.data() as UserProfile;
    const CONVERSION_THRESHOLD = 50;

    if (userData.creditBalance < CONVERSION_THRESHOLD) {
      return { success: false, message: "Saldo insuficiente para conversão." };
    }

    const premiumExpiry = new Date();
    premiumExpiry.setDate(premiumExpiry.getDate() + 7);

    transaction.update(userRef, {
      creditBalance: FieldValue.increment(-CONVERSION_THRESHOLD),
      isPremium: true,
      premiumExpiresAt: premiumExpiry,
      updatedAt: FieldValue.serverTimestamp()
    });

    return { 
      success: true, 
      message: "Conversão realizada com sucesso. Status Premium ativado por 7 dias." 
    };
  });
};

/**
 * Monitoramento de Risco de Liquidez Global
 * Utilizado pelo dashboard administrativo para controle macroeconômico.
 */
export const getGlobalLiquidityMetrics = async () => {
  const stats = await db.collection('system_metrics').doc('economy').get();
  return stats.data();
};

// Configuração do gatilho agendado (Firebase Cron)
// Execução diária às 04:00 (UTC)
export const scheduleLiquidityCleanup = () => {
    // Integração com Firebase Scheduled Functions
    // Trigger: 0 4 * * *
    return {
        schedule: "0 4 * * *",
        timeZone: "UTC",
        handler: executeLiquidityDrain
    };
};
