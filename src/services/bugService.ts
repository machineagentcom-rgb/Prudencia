import { doc, updateDoc, increment, serverTimestamp, getFirestore, collection, addDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

/**
 * @fileoverview Serviço de processamento de reportes (BugService).
 * Gerencia a taxonomia dos insetos, validação de RF-16 (Bypass de Crash)
 * e integração com a governança econômica do TestPool.
 */

export interface BugReport {
  appId: string;
  testerId: string;
  category: 'fatal' | 'ui' | 'logic' | 'performance' | 'network';
  insectType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  isStartupCrash: boolean;
  timestamp: Date;
}

const db = getFirestore();
const functions = getFunctions();

export const BugService = {
  /**
   * Processa o envio de um reporte de bug seguindo a taxonomia 
   * definida na Seção 4.3 do SRS.
   */
  async submitBugReport(report: BugReport) {
    try {
      // Validação de segurança (PoW e Integridade ocorrem no backend via Cloud Function)
      const submitCloudFunction = httpsCallable(functions, 'processBugReport');
      
      const result = await submitCloudFunction({
        ...report,
        submissionContext: {
          clientVersion: '2.0.0',
          platform: 'android'
        }
      });

      // Se for um "Reporte de Barata" (Crash on Startup), aciona RF-16
      if (report.isStartupCrash) {
        await this.handleStartupCrashBypass(report.testerId, report.appId);
      }

      return { success: true, data: result.data };
    } catch (error) {
      console.error("Erro crítico na submissão do Pote de Bugs:", error);
      throw new Error("Falha na sincronização do reporte com o ninho central.");
    }
  },

  /**
   * Gerencia o RF-16: Bypass de Crash Rápido.
   * Garante que o testador receba seus créditos mesmo com falhas críticas.
   */
  async handleStartupCrashBypass(testerId: string, appId: string) {
    const reportRef = collection(db, 'bug_reports');
    
    // Registro de intenção de bypass para auditoria de fraude (Anti-fraude)
    await addDoc(reportRef, {
      testerId,
      appId,
      type: 'STARTUP_CRASH_BYPASS',
      status: 'pending_validation',
      createdAt: serverTimestamp()
    });

    // Chama a função de distribuição de recompensa de emergência
    const releaseCredits = httpsCallable(functions, 'processEmergencyCreditGrant');
    await releaseCredits({ testerId, reason: 'CRASH_ON_STARTUP_BYPASS' });
  },

  /**
   * Tradução da taxonomia de insetos para fins de UI (RF-11)
   */
  getInsectMetadata(insectType: string) {
    const taxonomy: Record<string, { category: string, label: string }> = {
      'hercules': { category: 'fatal', label: 'Besouro-Hércules (Crash)' },
      'ant': { category: 'fatal', label: 'Formiga Paralisadora (ANR)' },
      'wasp': { category: 'fatal', label: 'Vespa do Loop' },
      'spider': { category: 'ui', label: 'Aranha de Layout' },
      'dragonfly': { category: 'ui', label: 'Libélula de Transição' },
      'caterpillar': { category: 'ui', label: 'Lagarta Letárgica' },
      'mantis': { category: 'logic', label: 'Louva-a-Deus Divisor' },
      'centipede': { category: 'logic', label: 'Centopeia Errante' },
      'termite': { category: 'logic', label: 'Cupim Corruptor' },
      'snail': { category: 'performance', label: 'Caracol de Latência' },
      'earthworm': { category: 'performance', label: 'Minhoca de Memória' },
      'firefly': { category: 'performance', label: 'Vaga-lume Térmico' },
      'cicada': { category: 'network', label: 'Cigarra Estridente' },
      'mosquito': { category: 'network', label: 'Mosquito Redundante' }
    };
    
    return taxonomy[insectType] || { category: 'unknown', label: 'Inseto Desconhecido' };
  }
};
