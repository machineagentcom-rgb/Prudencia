import { getFirestore, doc, runTransaction, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore';

const db = getFirestore();

export interface RedemptionTask {
  id: string;
  targetAppId: string;
  status: 'PENDING' | 'COMPLETED';
}

export const triggerIndustrialAlert = async (campaignId: string, reason: string) => {
  const alertRef = doc(db, 'alerts', `${campaignId}_${Date.now()}`);
  await updateDoc(alertRef, {
    type: 'INDUSTRIAL_DESERTION_ALERT',
    severity: 'CRITICAL',
    timestamp: serverTimestamp(),
    message: `ALERTA DE DESERÇÃO NA CONTENÇÃO: ${reason}`,
    target: campaignId,
    notified: false
  });
};

export const activateRedemptionMode = async (userId: string) => {
  return await runTransaction(db, async (transaction) => {
    const userRef = doc(db, 'users', userId);
    transaction.update(userRef, {
      status: 'REDEMPTION_MODE',
      lockoutActive: true,
      redemptionProgress: 0,
      redemptionRequired: 3,
      frozenCredits: true,
      updatedAt: serverTimestamp()
    });
    return { success: true, message: 'Modo Redenção ativado.' };
  });
};

export const completeRedemptionTask = async (userId: string) => {
  return await runTransaction(db, async (transaction) => {
    const userRef = doc(db, 'users', userId);
    const userDoc = await transaction.get(userRef);
    if (!userDoc.exists() || userDoc.data()?.status !== 'REDEMPTION_MODE') {
      throw new Error("Usuário não está em Modo Redenção.");
    }
    const currentProgress = (userDoc.data()?.redemptionProgress || 0) + 1;
    if (currentProgress >= 3) {
      transaction.update(userRef, {
        status: 'ACTIVE',
        lockoutActive: false,
        redemptionProgress: 3,
        redemptionRequired: 0,
        frozenCredits: false,
        lastRehabDate: serverTimestamp()
      });
      return { status: 'REHABILITATED', progress: currentProgress };
    } else {
      transaction.update(userRef, { redemptionProgress: currentProgress });
      return { status: 'IN_PROGRESS', progress: currentProgress };
    }
  });
};

export const getMatchmakingPool = async (userId: string): Promise<'ELITE' | 'ISOLATED'> => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  const data = userDoc.data();
  return (data?.redemptionCount > 3) ? 'ISOLATED' : 'ELITE';
};

export const validateCrashReport = async (userId: string, appId: string, hardwareModel: string) => {
  const reportRef = doc(db, 'fraud_checks', `${userId}_${appId}`);
  await updateDoc(reportRef, {
    lastReportedAt: serverTimestamp(),
    hardwareModel: hardwareModel,
    crashConfirmed: false,
    status: 'PENDING_VERIFICATION'
  });
};