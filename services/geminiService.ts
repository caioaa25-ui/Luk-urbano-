
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getStylistAdvice = async (userPrompt: string, history: { role: string, content: string }[]) => {
  try {
    const chat = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: "Você é um Personal Stylist da loja 'LookUrbano'. Seja amigável, entenda o gosto do cliente e sugira looks baseados no clima, ocasião e tendências brasileiras atuais. Responda em Português do Brasil." }]
        },
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.content }]
        })),
        {
          role: "user",
          parts: [{ text: userPrompt }]
        }
      ],
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    const response = await chat;
    return response.text || "Desculpe, estou com dificuldades para pensar em um look agora. Tente novamente!";
  } catch (error) {
    console.error("Gemini Stylist Error:", error);
    return "Ocorreu um erro ao conectar com o seu Personal Stylist. Verifique sua conexão.";
  }
};
