import { 
  getFirestore, 
  doc, 
  runTransaction, 
  serverTimestamp, 
  updateDoc, 
  getDoc, 
  increment,
  Timestamp
} from 'firebase/firestore';

/**
 * Módulo de Anti-Fraude e Governança - Projeto Prudência
 * Responsável pela integridade do ecossistema e Modo Redenção (RF-18, RF-19).
 */

const db = getFirestore();

export interface RedemptionTask {
  id: string;
  targetAppId: string;
  status: 'PENDING' | 'COMPLETED';
  assignedAt: Timestamp;
}

/**
 * Dispara Alerta Industrial via FCM/Firestore para desenvolvedores (RF-17).
 * Utilizado em casos de debandada (churn) súbita ou inconsistência de versão.
 */
export const triggerIndustrialAlert = async (campaignId: string, reason: string) => {
  const alertId = `${campaignId}_${Date.now()}`;
  const alertRef = doc(db, 'alerts', alertId);
  
  await updateDoc(alertRef, {
    type: 'INDUSTRIAL_DESERTION_ALERT',
    severity: 'CRITICAL',
    timestamp: serverTimestamp(),
    message: `ALERTA DE DESERÇÃO NA CONTENÇÃO: ${reason}`,
    target: campaignId,
    notified: false,
    status: 'ACTIVE'
  });
};

/**
 * Ativa o Modo Redenção (RF-18).
 * Bloqueia recursos de saída e exige trabalho social forçado.
 */
export const activateRedemptionMode = async (userId: string) => {
  return await runTransaction(db, async (transaction) => {
    const userRef = doc(db, 'users', userId);
    
    transaction.update(userRef, {
      status: 'REDEMPTION_MODE',
      lockoutActive: true,
      redemptionProgress: 0,
      redemptionRequired: 3,
      frozenCredits: true,
      lastPenaltyDate: serverTimestamp(),
      rehabilitationStartedAt: serverTimestamp()
    });
    
    return { success: true, message: 'Status de conformidade rebaixado. Modo Redenção ativado.' };
  });
};

/**
 * Processa a conclusão de uma tarefa de redenção social (RF-18).
 * Ao atingir 3 testes, o status do usuário é restaurado.
 */
export const completeRedemptionTask = async (userId: string) => {
  return await runTransaction(db, async (transaction) => {
    const userRef = doc(db, 'users', userId);
    const userDoc = await transaction.get(userRef);
    
    if (!userDoc.exists()) throw new Error("Usuário inexistente.");
    
    const userData = userDoc.data();
    if (userData.status !== 'REDEMPTION_MODE') {
      throw new Error("Usuário não possui pendências de redenção.");
    }

    const currentProgress = (userData.redemptionProgress || 0) + 1;
    
    if (currentProgress >= 3) {
      transaction.update(userRef, {
        status: 'ACTIVE',
        lockoutActive: false,
        redemptionProgress: 0,
        redemptionRequired: 0,
        frozenCredits: false,
        lastRehabDate: serverTimestamp(),
        redemptionCount: increment(1) // Incrementa para controle de matchmaking seletivo
      });
      return { status: 'REHABILITATED', progress: currentProgress };
    } else {
      transaction.update(userRef, { 
        redemptionProgress: currentProgress 
      });
      return { status: 'IN_PROGRESS', progress: currentProgress };
    }
  });
};

/**
 * Define o Pool de Matchmaking Seletivo (RF-19).
 * Usuários reincidentes são segregados para proteger a base de elite.
 */
export const getMatchmakingPool = async (userId: string): Promise<'ELITE' | 'ISOLATED'> => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  const data = userDoc.data();
  
  // Se o histórico de punições for superior a 3, segrega no pool de infratores
  return (data?.redemptionCount > 3) ? 'ISOLATED' : 'ELITE';
};

/**
 * Validação de Bypass de Crash (RF-16).
 * Analisa a integridade de reportes de "Barata" para evitar abuso.
 */
export const validateCrashReport = async (userId: string, appId: string, hardwareModel: string) => {
  const fraudRef = doc(db, 'fraud_checks', `${userId}_${appId}`);
  
  await updateDoc(fraudRef, {
    lastReportedAt: serverTimestamp(),
    hardwareModel: hardwareModel,
    crashConfirmed: false,
    status: 'PENDING_VERIFICATION',
    attemptCount: increment(1)
  });
};

/**
 * Verifica consistência de versão (RF-21).
 * Executado quando um versionCode detectado não bate com o registrado.
 */
export const flagVersionMismatch = async (userId: string, campaignId: string, reportedVersion: number) => {
  const flagRef = doc(db, 'version_logs', `${campaignId}_${Date.now()}`);
  await updateDoc(flagRef, {
    userId,
    campaignId,
    reportedVersion,
    detectedAt: serverTimestamp(),
    status: 'PENDING_FIX'
  });
};
