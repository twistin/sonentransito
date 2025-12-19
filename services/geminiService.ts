
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getArtisticInterpretation = async (abstract: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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
    return "Error al conectar con la sabiduría artificial.";
  }
};

export const generateManifesto = async (bio: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Basado en este perfil de un investigador y artista: "${bio}", escribe un manifiesto efímero de 3 frases. 
      Debe sonar filosófico, neogrotesco, experimental y profundo. Usa conceptos como tránsito, kairos y vibración.`,
      config: {
        temperature: 1.0,
      }
    });
    return response.text || "El silencio es la única respuesta posible.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "La vibración se ha interrumpido.";
  }
};
