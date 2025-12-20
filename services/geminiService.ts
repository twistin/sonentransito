
import { GoogleGenAI } from "@google/genai";

// Get API key from Vite environment
const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY || '';

// Only initialize if we have an API key
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

// Check if Gemini is available
const isGeminiAvailable = (): boolean => {
  return !!ai && !!API_KEY;
};

// Helper to parse error type
const getErrorMessage = (error: unknown): string => {
  const errorStr = String(error);

  if (errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('quota')) {
    return "⏳ Cuota de API agotada. Espera unos minutos o revisa tu plan en Google AI Studio.";
  }

  if (errorStr.includes('401') || errorStr.includes('UNAUTHENTICATED')) {
    return "🔑 API key inválida. Verifica tu configuración en .env.local";
  }

  if (errorStr.includes('403') || errorStr.includes('PERMISSION_DENIED')) {
    return "🚫 Acceso denegado. Verifica los permisos de tu API key.";
  }

  return "Error al conectar con la sabiduría artificial. Intenta de nuevo más tarde.";
};

export const getArtisticInterpretation = async (abstract: string): Promise<string> => {
  if (!isGeminiAvailable()) {
    return "✨ La interpretación poética estará disponible cuando se configure la API de Gemini. Mientras tanto, deja que tu imaginación interprete estas palabras.";
  }

  try {
    const response = await ai!.models.generateContent({
      model: "gemini-1.5-flash",  // Using stable model with better quota
      contents: `Proporciona una interpretación poética y artística de este resumen de investigación doctoral. 
      Usa un lenguaje evocador que conecte la academia con el arte sonoro y visual. Máximo 100 palabras.
      Abstract: "${abstract}"`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });
    return response.text || "La musa se ha quedado en silencio por un momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return getErrorMessage(error);
  }
};

export const generateManifesto = async (bio: string): Promise<string> => {
  if (!isGeminiAvailable()) {
    return "🌀 El manifiesto efímero espera a ser revelado. Configura la API de Gemini para desbloquear las palabras del cosmos.";
  }

  try {
    const response = await ai!.models.generateContent({
      model: "gemini-1.5-flash",  // Using stable model with better quota
      contents: `Basado en este perfil de un investigador y artista: "${bio}", escribe un manifiesto efímero de 3 frases. 
      Debe sonar filosófico, neogrotesco, experimental y profundo. Usa conceptos como tránsito, kairos y vibración.`,
      config: {
        temperature: 1.0,
      }
    });
    return response.text || "El silencio es la única respuesta posible.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return getErrorMessage(error);
  }
};

// Export utility to check if Gemini is configured
export const isAIConfigured = isGeminiAvailable;
