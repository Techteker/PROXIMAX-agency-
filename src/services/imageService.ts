import { GoogleGenAI } from "@google/genai";

export const generateInductionBanner = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'A premium, modern induction banner for a professional digital marketing company. Style: sleek, high-tech, corporate, futuristic vibe. Features: abstract geometric shapes, smooth gradients, subtle shadows. Color palette: professional blue, white, and silver. High contrast. Ultra high resolution, 4K quality, vector-style clean design. Dynamic and eye-catching composition, professional branding style. No clutter, minimal yet impactful. Space for company logo and headline.',
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
