import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { personalInfo, socialLinks, skills, projects } from "../../lib/data";

// Store chat session for conversation history
let chatSession: ChatSession | null = null;

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

// Initialize or get existing chat session
const getChatSession = (): ChatSession => {
  if (!chatSession) {
    const genAI = getGeminiAPI();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Start chat with portfolio context as system instruction
    const portfolioContext = getPortfolioContext();
    chatSession = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: portfolioContext }],
        },
        {
          role: "model",
          parts: [
            {
              text: "I understand! I'm ready to help visitors learn about this portfolio. I have all the information about skills, projects, experience, and contact details. How can I assist?",
            },
          ],
        },
      ],
    });
  }
  return chatSession;
};

// Reset chat session (useful for starting fresh conversation)
export const resetChatSession = () => {
  chatSession = null;
};

// Chat with Gemini using portfolio context with conversation history
export const chatWithGemini = async (userMessage: string): Promise<string> => {
  try {
    const session = getChatSession();

    // Send message and get response (maintains conversation history)
    const result = await session.sendMessage(userMessage);
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
