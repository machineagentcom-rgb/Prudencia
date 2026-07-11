/**
 * src/services/aiAssistant.ts
 * 
 * Implementação da lógica de negócio e interface de comunicação com Gemini API
 * para o Projeto Prudência. Gerencia o acesso baseado em Premium/Free tiers
 * e a contabilização de consumos conforme RF-27.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { doc, getDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

interface AssistantResponse {
  success: boolean;
  message: string;
  remainingFreeConsultations?: number;
  data?: string;
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export const consultAI = async (
  userId: string,
  appId: string,
  prompt: string,
  isPremium: boolean
): Promise<AssistantResponse> => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    if (!isPremium) {
      const freeConsultationsUsed = userData?.freeAiConsultationsUsed || 0;
      if (freeConsultationsUsed >= 1) {
        return {
          success: false,
          message: "Limite de consultas gratuitas atingido. Assista a um vídeo para desbloquear nova consulta."
        };
      }
    } else {
      const premiumConsultationsUsed = userData?.appPremiumConsultations?.[appId] || 0;
      if (premiumConsultationsUsed >= 3) {
        return {
          success: false,
          message: "Cota de consultas premium esgotada para este aplicativo. Assista a um vídeo para continuar."
        };
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const context = `Você é o consultor técnico sênior do Projeto Prudência. Ajude desenvolvedores Android com conformidade, Google Play Console e otimização. Responda de forma direta e técnica. Prompt do usuário: ${prompt}`;
    
    const result = await model.generateContent(context);
    const response = await result.response;
    const text = response.text();

    if (!isPremium) {
      await updateDoc(userRef, {
        freeAiConsultationsUsed: increment(1),
        lastConsultationAt: serverTimestamp()
      });
    } else {
      await updateDoc(userRef, {
        [`appPremiumConsultations.${appId}`]: increment(1)
      });
    }

    return {
      success: true,
      message: "Análise concluída com sucesso.",
      data: text
    };

  } catch (error) {
    console.error("Erro na comunicação com Gemini AI:", error);
    return {
      success: false,
      message: "Falha na conexão com o oráculo de IA. Tente novamente mais tarde."
    };
  }
};