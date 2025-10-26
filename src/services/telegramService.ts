interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface TelegramResponse {
  ok: boolean;
  result?: unknown;
  description?: string;
}

/**
 * Send a message to Telegram using the Bot API
 * This is a client-side implementation - the bot token will be exposed in the browser
 * For production, consider using a backend proxy for better security
 */
export const sendToTelegram = async (
  formData: ContactFormData
): Promise<{ success: boolean; error?: string }> => {
  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  // Validate environment variables
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram credentials not configured");
    return {
      success: false,
      error: "Telegram is not configured. Please contact via email.",
    };
  }

  try {
    const { name, email, message } = formData;

    // Format message for Telegram with proper escaping for Markdown
    const telegramMessage = `
🔔 *New Contact Form Submission*

👤 *Name:* ${escapeMarkdown(name)}
📧 *Email:* ${email}

💬 *Message:*
${escapeMarkdown(message)}

━━━━━━━━━━━━━━━━━━━━
_Sent from Portfolio Contact Form_
    `.trim();

    // Telegram Bot API endpoint
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    });

    const data: TelegramResponse = await response.json();

    if (!response.ok || !data.ok) {
      console.error("Telegram API error:", data);

      // Provide helpful error messages
      let errorMessage =
        data.description || "Failed to send message to Telegram";

      if (errorMessage.includes("chat not found")) {
        errorMessage =
          "Chat not found. Please:\n1. Open Telegram and find your bot\n2. Click START or send a message to your bot\n3. Verify your Chat ID is correct";
      } else if (errorMessage.includes("Unauthorized")) {
        errorMessage =
          "Invalid bot token. Please check your VITE_TELEGRAM_BOT_TOKEN in .env file";
      }

      return {
        success: false,
        error: errorMessage,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Escape special characters for Telegram Markdown
 */
const escapeMarkdown = (text: string): string => {
  return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
};
