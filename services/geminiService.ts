import { GoogleGenAI, Type } from "@google/genai";
import { Song } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-build' });

export const getSongRecommendations = async (
  criteria: string, 
  excludeSongs: string[] = []
): Promise<Song[]> => {
  try {
    const exclusionText = excludeSongs.length > 0 
      ? `Do NOT include the following songs: ${excludeSongs.join(", ")}.` 
      : "";

    const prompt = `
      Generate a list of 12 distinct popular songs based on the following criteria: "${criteria}".
      ${exclusionText}
      
      The recommendations should consider popularity on platforms like Spotify, YouTube, and Apple Music.
      If the criteria involves a specific era, artist, or genre, strictly adhere to it.
      
      For "Trending Now" or "This Month", use your knowledge of recent hits or perennial favorites if current data is limited.
      
      Provide a "popularityScore" between 0 and 100 based on estimated streaming numbers and cultural impact.
      Provide a short "reason" (1 sentence) why this song fits the criteria.
      Provide a "description" (2-3 sentences) detailing the song's impact, lyrical themes, or interesting facts for a detail view.
      Provide "platformStats" as a short string like "3B+ Streams" or "Viral on TikTok".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              artist: { type: Type.STRING },
              album: { type: Type.STRING },
              year: { type: Type.STRING },
              genre: { type: Type.STRING },
              popularityScore: { type: Type.INTEGER },
              reason: { type: Type.STRING },
              description: { type: Type.STRING },
              platformStats: { type: Type.STRING },
            },
            required: ["title", "artist", "year", "genre", "popularityScore", "reason"],
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) return [];

    const songs: Song[] = JSON.parse(jsonText);
    return songs;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};