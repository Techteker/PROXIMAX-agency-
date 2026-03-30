import { GoogleGenAI } from "@google/genai";

export const generateInductionBanner = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'A high-quality, modern business growth banner for PROXIMAX. Include the PROXIMAX text logo prominently. Show elements of business growth like trending charts, upward arrows, digital connections, and network icons. Include graphics/icons of social media platforms: Instagram, Facebook, Google, YouTube. Use vibrant, professional colors (yellow, gold, deep black) with a tech-savvy, futuristic style. Premium, sleek, and visually engaging. 4K quality, vector-style clean design.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
