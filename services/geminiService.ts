
import { GoogleGenAI } from "@google/genai";

// Ensure we are using the correct types from the app
import { StylistMessage } from "../types";

/**
 * Service to get fashion advice from the AI Stylist.
 * Uses the Gemini 3 Flash model for fast and helpful responses.
 */
export const getStylistAdvice = async (userPrompt: string, history: StylistMessage[]) => {
  // Initialize the client inside the function to ensure the correct API key is used.
  // The API key is obtained directly from process.env.API_KEY as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        // Map the conversation history to the format expected by the SDK (assistant -> model role)
        ...history.map(h => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        })),
        {
          role: "user",
          parts: [{ text: userPrompt }]
        }
      ],
      config: {
        // Defined the system instruction here instead of as a user message for better performance
        systemInstruction: "Você é um Personal Stylist especialista da loja LookUrbano. Seu objetivo é ajudar brasileiros a se vestirem melhor com peças da nossa loja. Sugira combinações, explique por que certas cores funcionam e seja sempre muito educado e antenado com as tendências de 2024/2025. Responda de forma concisa e amigável em Português do Brasil.",
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
      }
    });

    // Access the .text property directly (not a method) as specified in SDK documentation
    return response.text || "Estou analisando as melhores tendências para você... Pode repetir a pergunta?";
  } catch (error) {
    console.error("Gemini Stylist Error:", error);
    return "Tive um pequeno problema de conexão com as passarelas. Pode tentar novamente em instantes?";
  }
};
