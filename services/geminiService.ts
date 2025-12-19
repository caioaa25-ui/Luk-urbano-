
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getStylistAdvice = async (userPrompt: string, history: { role: string, content: string }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: "Você é um Personal Stylist especialista da loja LookUrbano. Seu objetivo é ajudar brasileiros a se vestirem melhor com peças da nossa loja. Sugira combinações, explique por que certas cores funcionam e seja sempre muito educado e antenado com as tendências de 2024/2025. Responda de forma concisa e amigável em Português do Brasil." }]
        },
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
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "Estou analisando as melhores tendências para você... Pode repetir a pergunta?";
  } catch (error) {
    console.error("Gemini Stylist Error:", error);
    return "Tive um pequeno problema de conexão com as passarelas. Pode tentar novamente em instantes?";
  }
};
