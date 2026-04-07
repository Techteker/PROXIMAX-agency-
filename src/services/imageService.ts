import { GoogleGenAI } from "@google/genai";

export const generateInductionBanner = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'An ultra-premium, luxury digital agency banner for PROXIMAX. The aesthetic should be "Quiet Luxury" meets "High-Tech". Deep matte black background with vibrant orange and deep blue accents. Minimalist and sophisticated. Subtle, elegant 3D trending charts and network nodes in glowing blue. The PROXIMAX logo should be integrated with a metallic finish. Cinematic lighting, soft bokeh, and high-end textures. Avoid clutter. Focus on prestige, authority, and digital excellence. 8K resolution, photorealistic, architectural visualization style.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "3:4",
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
