import { GoogleGenAI, Type } from "@google/genai";
import { Designer, DesignRequest, JobStatus } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartAssignments = async (
  designers: Designer[],
  pendingRequests: DesignRequest[]
) => {
  if (!process.env.API_KEY) return null;

  const prompt = `
    You are a resource manager for a design agency.
    
    Here are the Designers:
    ${JSON.stringify(designers.map(d => ({ id: d.id, name: d.name, skills: d.skills, assigned: d.assignedHours })))}

    Here are the Pending Requests:
    ${JSON.stringify(pendingRequests.map(r => ({ id: r.id, title: r.title, type: r.type, estHours: r.estimatedHours })))}

    Please assign the pending requests to the best matching designer based on skills and current load.
    Return a JSON array of objects with 'requestId', 'designerId', and 'rationale'.
  `;

  try {
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
              requestId: { type: Type.STRING },
              designerId: { type: Type.STRING },
              rationale: { type: Type.STRING },
            },
            required: ["requestId", "designerId", "rationale"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini assignment failed:", error);
    return [];
  }
};

export const generateReportInsights = async (
  period: string,
  stats: any
) => {
  if (!process.env.API_KEY) return "AI Insights unavailable (No API Key).";

  const prompt = `
    Analyze the following design team performance stats for the ${period} period.
    Provide a concise, 3-bullet point executive summary highlighting key trends, utilization risks, or achievements.
    
    Stats: ${JSON.stringify(stats)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini insights failed:", error);
    return "Could not generate insights.";
  }
};