/**
 * @fileoverview Definições de esquema para Firestore - Projeto Prudência
 * @version 2.0.1
 * @description Esquemas tipados para persistência de dados. 
 * Estrutura otimizada para consultas de baixa latência e conformidade com o ecossistema TestPool.
 */

import { Timestamp } from 'firebase/firestore';

/**
 * Representa os estados de saúde do slot de testador no Dashboard de Telemetria (RF-02)
 */
export type SlotStatus = 'OK' | 'EXECUTION' | 'FAILURE' | 'IDLE';

/**
 * Identificadores das espécies de bugs conforme Taxonomia RF-11 (O Pote de Bugs)
 */
export type BugSpecies = 
  | 'HERCULES_BEETLE' | 'ANT' | 'WASP' // Categoria 1: Fatal
  | 'SPIDER' | 'DRAGONFLY' | 'CATERPILLAR' // Categoria 2: UI/UX
  | 'PRAYING_MANTIS' | 'CENTIPEDE' | 'TERMITE' // Categoria 3: Lógica
  | 'SNAIL' | 'EARTHWORM' | 'FIREFLY' // Categoria 4: Performance
  | 'CICADA' | 'MOSQUITO'; // Categoria 5: Rede

/**
 * Patentes do Squad Dedetizador (RF-06.2)
 */
export type UserRank = 'RECRUTA' | 'OPERADOR' | 'ESPECIALISTA' | 'TATICO' | 'COMANDANTE';

/**
 * Esquema de Usuário (Perfil e Estado de Gamificação)
 */
export interface UserProfile {
  uid: string;
  uuid: string; // Identificador criptografado (EncryptedSharedPreferences)
  displayName: string;
  email: string;
  credits: number;
  premiumStatus: boolean;
  premiumExpiry?: Timestamp;
  rank: UserRank;
  sprayTankLevel: number; // 0 - 100 (Medidor de pressão industrial)
  lastActivity: Timestamp;
  activeTestCount: number; // Teto de 14 apps simultâneos
  isRedemptionMode: boolean; // Flag para RF-18
  redemptionTasksCompleted: number;
  createdAt: Timestamp;
}

/**
 * Esquema de Campanha (RF-01)
 */
export interface Campaign {
  id: string;
  developerUid: string;
  packageName: string;
  appName: string;
  googleGroupLink: string;
  supportLink: string;
  versionCode: number;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'REDEMPTION_HOLD';
  createdAt: Timestamp;
  slots: TesterSlot[]; // Array fixo de 40 posições
  infestationLevel: 'CRITICAL' | 'MODERATE' | 'LIGHT' | 'CLEAN';
  totalReports: number;
  lastUpdated: Timestamp;
}

/**
 * Estrutura de cada um dos 40 slots (RF-02)
 */
export interface TesterSlot {
  slotId: number; // 0 a 39
  testerUid: string | null;
  status: SlotStatus;
  lastTestDate: Timestamp | null;
  consecutiveDays: number;
  joinedAt: Timestamp | null;
}

/**
 * Esquema de Submissão de Teste (RF-05 / RF-08)
 */
export interface TestSubmission {
  submissionId: string;
  campaignId: string;
  testerUid: string;
  timestamp: Timestamp;
  proofOfWorkResult: string; // Hash SHA-256 para integridade
  sessionDurationSeconds: number;
  isValidated: boolean;
  isBonusClaimed: boolean;
  type: 'DAILY' | 'NEW_VERSION_BONUS' | 'REDEMPTION_TASK';
}

/**
 * Esquema de Reporte de Bug (RF-11 / RF-12)
 */
export interface BugReport {
  reportId: string;
  campaignId: string;
  testerUid: string;
  species: BugSpecies;
  category: 1 | 2 | 3 | 4 | 5;
  description: string;
  isFatal: boolean;
  createdAt: Timestamp;
  isVerifiedByDev: boolean;
  processed: boolean; // Para integração com Pote de Bugs
}

/**
 * Configuração Global de Parâmetros Econômicos (Controlado via /secret-admin)
 */
export interface GlobalConfig {
  id: 'GLOBAL_SYSTEM_CONFIG';
  rewardPerTest: number;
  costToPublish: number;
  costToJoin: number;
  maxSlotsPerCampaign: number; // Teto 40
  minTestDurationSeconds: number; // 120s
  redemptionThreshold: number; // Tarefas obrigatórias para Modo Redenção
  updatedAt: Timestamp;
  version: string;
  isMaintenanceMode: boolean;
}

/**
 * Registro de Assinatura Premium / Logs de Segurança (RF-04 / RF-26)
 */
export interface SecurityLog {
  logId: string;
  uid: string;
  event: 'APP_OPEN' | 'BUG_REPORT' | 'SDK_SIGNAL' | 'REDEMPTION_TRIGGER';
  metadata: Record<string, any>;
  timestamp: Timestamp;
  integrityScore: number;
}
