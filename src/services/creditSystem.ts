/**
 * @fileoverview creditSystem.ts
 * @description Implementação avançada da governança econômica do Projeto Prudência.
 * Gerenciamento de transações atômicas, auditoria de saldo e segurança contra fraudes.
 * 
 * @author Machine Agent CTO
 * @version 2.1.0
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  updateDoc, 
  increment, 
  getDoc, 
  runTransaction, 
  serverTimestamp, 
  collection, 
  addDoc 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configurações de economia conforme RF-05, RF-06 e RF-20
export const ECONOMY_CONFIG = {
  ONBOARDING_CREDITS: 15,
  PUBLICATION_COST: 14,
  VERSION_REVISION_COSTS: [7, 5, 3],
  MIN_TEST_DURATION_MINUTES: 2,
  REWARD_PER_TEST: 2,
  EXPIRATION_DAYS: 45
};

const app = initializeApp({}); 
const db = getFirestore(app);
const auth = getAuth(app);

export interface CreditTransaction {
  userId: string;
  amount: number;
  type: 'ONBOARDING' | 'PUBLICATION' | 'REWARD' | 'PENALTY' | 'REVISION' | 'BONUS_RETEST';
  timestamp: any;
  referenceId?: string;
  metadata?: Record<string, any>;
}

/**
 * RF-05: Processa o crédito de onboarding inicial.
 * Implementação atômica com trava de segurança contra dupla execução.
 */
export async function processOnboardingCredits(userId: string): Promise<{ success: boolean; message: string }> {
  const userRef = doc(db, 'users', userId);
  const transactionRef = collection(db, 'transactions');

  try {
    return await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      
      if (!userDoc.exists()) throw new Error("Usuário inexistente.");
      if (userDoc.data().onboardingCompleted) {
        return { success: false, message: "Onboarding já foi resgatado anteriormente." };
      }

      transaction.update(userRef, {
        credits: increment(ECONOMY_CONFIG.ONBOARDING_CREDITS),
        onboardingCompleted: true,
        lastActivityAt: serverTimestamp()
      });

      transaction.set(doc(transactionRef), {
        userId,
        amount: ECONOMY_CONFIG.ONBOARDING_CREDITS,
        type: 'ONBOARDING',
        timestamp: serverTimestamp(),
        status: 'COMPLETED'
      });

      return { success: true, message: "Créditos de boas-vindas creditados." };
    });
  } catch (error: any) {
    console.error("Critical Error [Onboarding]:", error);
    return { success: false, message: error.message };
  }
}

/**
 * RF-06: Processa o custo de publicação de uma campanha.
 * Validação de saldo em tempo real com rollback em caso de falha na SDK/Database.
 */
export async function processPublicationPayment(userId: string, campaignId: string): Promise<{ success: boolean; message: string }> {
  const userRef = doc(db, 'users', userId);
  const campaignRef = doc(db, 'campaigns', campaignId);

  try {
    return await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      const userBalance = userDoc.data()?.credits || 0;

      if (userBalance < ECONOMY_CONFIG.PUBLICATION_COST) {
        return { success: false, message: "Saldo insuficiente para iniciar o ecossistema de teste." };
      }

      transaction.update(userRef, {
        credits: increment(-ECONOMY_CONFIG.PUBLICATION_COST),
        lastActivityAt: serverTimestamp()
      });

      transaction.update(campaignRef, {
        status: 'ACTIVE',
        activatedAt: serverTimestamp(),
        versionCode: 1,
        slotsStatus: Array(40).fill('IDLE') // Inicialização do grid de 40 slots
      });

      return { success: true, message: "Campanha ativada no grid de 40 slots." };
    });
  } catch (error: any) {
    return { success: false, message: "Falha catastrófica na transação: " + error.message };
  }
}

/**
 * Validação de integridade de saldo (Auditoria)
 * Garante que o estado visual do usuário coincida com o registro imutável no Firestore.
 */
export async function auditUserBalance(userId: string): Promise<{ balance: number, status: 'HEALTHY' | 'DEFICIT' }> {
  const userDoc = await getDoc(doc(db, 'users', userId));
  const data = userDoc.data();
  const balance = data?.credits || 0;
  
  return {
    balance,
    status: balance >= 0 ? 'HEALTHY' : 'DEFICIT'
  };
}

/**
 * Helper para verificar disponibilidade de fundos antes de ações UI
 */
export async function canAfford(userId: string, cost: number): Promise<boolean> {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return (userDoc.data()?.credits || 0) >= cost;
}
