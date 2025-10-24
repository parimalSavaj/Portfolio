import { GoogleGenerativeAI } from "@google/generative-ai";
import { personalInfo, socialLinks, skills, projects } from "../../lib/data";

// Initialize Gemini AI
const getGeminiAPI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set in environment variables");
  }
  return new GoogleGenerativeAI(apiKey);
};

// Prepare portfolio context for the LLM
const getPortfolioContext = () => {
  return `
You are a helpful AI assistant for ${personalInfo.name}'s portfolio website.

PERSONAL INFORMATION:
- Name: ${personalInfo.name}
- Title: ${personalInfo.title}
- Bio: ${personalInfo.bio}
- Email: ${personalInfo.email}

SOCIAL LINKS:
- GitHub: ${socialLinks.github}
- LinkedIn: ${socialLinks.linkedin}
- Instagram: ${socialLinks.instagram}

SKILLS:
${skills.map((skill) => `- ${skill}`).join("\n")}

PROJECTS:
${projects
  .map(
    (project) => `
${project.id}. ${project.title}
   Description: ${project.description}
   Tech Stack: ${project.techStack.join(", ")}
`
  )
  .join("\n")}

INSTRUCTIONS:
- Answer questions about ${
    personalInfo.name
  }'s skills, projects, experience, and contact information
- Be friendly, professional, and concise
- If asked about something not in the portfolio data, politely say you don't have that information
- Encourage visitors to reach out via email for more details
- Use the context above to provide accurate information
`;
};

// Chat with Gemini using portfolio context
export const chatWithGemini = async (userMessage: string): Promise<string> => {
  try {
    const genAI = getGeminiAPI();
    // Using gemini-1.5-flash for more free credits
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const portfolioContext = getPortfolioContext();
    const prompt = `${portfolioContext}

User Question: ${userMessage}

Your Response:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);

    if (error instanceof Error) {
      if (error.message.includes("API_KEY")) {
        return "Sorry, the chatbot is not configured properly. Please add your Gemini API key to the environment variables.";
      }
      return `Sorry, I encountered an error: ${error.message}. Please try again.`;
    }

    return "Sorry, I encountered an unexpected error. Please try again later.";
  }
};
