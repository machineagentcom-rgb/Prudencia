/**
 * @fileoverview Definições de esquema para Firestore - Projeto Prudência
 * @version 2.0.0
 * @description Esquemas tipados para persistência de dados. 
 * Estrutura otimizada para consultas de baixa latência e conformidade com o ecossistema TestPool.
 */

import { Timestamp } from 'firebase/firestore';

/**
 * Representa os estados de saúde do slot de testador no Dashboard de Telemetria (RF-02)
 */
export type SlotStatus = 'OK' | 'EXECUTION' | 'FAILURE' | 'IDLE';

/**
 * Identificadores das espécies de bugs conforme Taxonomia RF-11
 */
export type BugSpecies = 
  | 'HERCULES_BEETLE' | 'ANT' | 'WASP' // Fatal
  | 'SPIDER' | 'DRAGONFLY' | 'CATERPILLAR' // UI/UX
  | 'PRAYING_MANTIS' | 'CENTIPEDE' | 'TERMITE' // Logica
  | 'SNAIL' | 'EARTHWORM' | 'FIREFLY' // Performance
  | 'CICADA' | 'MOSQUITO'; // Rede

/**
 * Esquema de Usuário
 */
export interface UserProfile {
  uid: string;
  uuid: string; // Identificador criptografado (EncryptedSharedPreferences)
  displayName: string;
  email: string;
  credits: number;
  premiumStatus: boolean;
  premiumExpiry?: Timestamp;
  rank: 'RECRUTA' | 'OPERADOR' | 'ESPECIALISTA' | 'TATICO' | 'COMANDANTE';
  sprayTankLevel: number; // 0 - 100
  lastActivity: Timestamp;
  activeTestCount: number; // Teto de 14 apps
  isRedemptionMode: boolean;
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
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  createdAt: Timestamp;
  slots: TesterSlot[];
  infestationLevel: 'CRITICAL' | 'MODERATE' | 'LIGHT' | 'CLEAN';
}

/**
 * Estrutura de cada um dos 40 slots (RF-02)
 */
export interface TesterSlot {
  slotId: number;
  testerUid: string | null;
  status: SlotStatus;
  lastTestDate: Timestamp | null;
  consecutiveDays: number;
}

/**
 * Esquema de Submissão de Teste (RF-05 / RF-08)
 */
export interface TestSubmission {
  submissionId: string;
  campaignId: string;
  testerUid: string;
  timestamp: Timestamp;
  proofOfWorkResult: string; // Hash de desafio para evitar bots
  sessionDurationSeconds: number;
  isValidated: boolean;
}

/**
 * Esquema de Reporte de Bug (RF-11 / RF-12)
 */
export interface BugReport {
  reportId: string;
  campaignId: string;
  testerUid: string;
  species: BugSpecies;
  category: number; // 1 a 5
  description: string;
  isFatal: boolean;
  createdAt: Timestamp;
  isVerifiedByDev: boolean;
}

/**
 * Configuração Global de Parâmetros Econômicos (Controlado via /secret-admin)
 */
export interface GlobalConfig {
  rewardPerTest: number;
  costToPublish: number;
  costToJoin: number;
  maxSlotsPerCampaign: number;
  minTestDurationSeconds: number;
  redemptionThreshold: number;
  updatedAt: Timestamp;
}
