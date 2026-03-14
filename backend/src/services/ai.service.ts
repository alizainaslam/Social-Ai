import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_KEY as string,
});

const generateCaption = async (base64ImageFile: string): Promise<string> => {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: contents,
    config: {
      systemInstruction:
        "Write a caption for the image. Add a emojis and hashtags. Caption should be less than 100 characters.",
    },
  });

  return response.text ?? "";
};

export default generateCaption;
