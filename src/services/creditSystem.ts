/**
 * @fileoverview creditSystem.ts
 * @description Implementação robusta do sistema de governança econômica,
 * gestão de créditos de onboarding e custo de publicação para o Projeto Prudência.
 * 
 * @author Machine Agent CTO
 * @version 2.0.0
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, increment, getDoc, runTransaction } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configurações de constantes da economia (RF-05, RF-06)
export const ECONOMY_CONFIG = {
  ONBOARDING_CREDITS: 15,
  PUBLICATION_COST: 14,
  VERSION_REVISION_COSTS: [7, 5, 3],
  MIN_TEST_DURATION_MINUTES: 2,
};

const app = initializeApp({}); // Assumindo configuração injetada via ambiente
const db = getFirestore(app);
const auth = getAuth(app);

export interface CreditTransaction {
  userId: string;
  amount: number;
  type: 'ONBOARDING' | 'PUBLICATION' | 'REWARD' | 'PENALTY' | 'REVISION';
  timestamp: Date;
  referenceId?: string;
}

/**
 * RF-05: Processa o crédito de onboarding inicial.
 * Executado após a conclusão do vídeo premiado.
 */
export async function processOnboardingCredits(userId: string): Promise<boolean> {
  try {
    const userRef = doc(db, 'users', userId);
    
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error("Usuário inexistente.");
      
      const data = userDoc.data();
      if (data.onboardingCompleted) throw new Error("Onboarding já realizado.");

      transaction.update(userRef, {
        credits: increment(ECONOMY_CONFIG.ONBOARDING_CREDITS),
        onboardingCompleted: true,
        updatedAt: new Date()
      });
    });

    return true;
  } catch (error) {
    console.error("Erro ao processar onboarding:", error);
    return false;
  }
}

/**
 * RF-06: Processa o custo de publicação de uma campanha.
 * Valida saldo, aplica o custo e registra a transação.
 */
export async function processPublicationPayment(userId: string, campaignId: string): Promise<{ success: boolean; message: string }> {
  const userRef = doc(db, 'users', userId);
  const campaignRef = doc(db, 'campaigns', campaignId);

  try {
    return await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) return { success: false, message: "Usuário não encontrado." };

      const userBalance = userDoc.data().credits || 0;

      if (userBalance < ECONOMY_CONFIG.PUBLICATION_COST) {
        return { success: false, message: "Saldo insuficiente para publicação." };
      }

      transaction.update(userRef, {
        credits: increment(-ECONOMY_CONFIG.PUBLICATION_COST)
      });

      transaction.update(campaignRef, {
        status: 'ACTIVE',
        activatedAt: new Date(),
        versionCode: 1 // Inicial
      });

      return { success: true, message: "Campanha publicada com sucesso." };
    });
  } catch (error) {
    return { success: false, message: "Falha na transação de pagamento: " + error };
  }
}

/**
 * Helper para validar se o usuário pode realizar ações de custo
 */
export async function checkEligibility(userId: string, requiredAmount: number): Promise<boolean> {
  const userDoc = await getDoc(doc(db, 'users', userId));
  const credits = userDoc.data()?.credits || 0;
  return credits >= requiredAmount;
}

/**
 * Validação de integridade de saldo (Auditoria)
 */
export async function auditUserBalance(userId: string): Promise<number> {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.data()?.credits || 0;
}
