const API_BASE_URL = 'https://api.deepseek.com/v1';
const API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function generatePrompt(userInput: string, type: 'text' | 'image'): Promise<string> {
  try {
    // 检查 API Key
    if (!API_KEY) {
      console.error('DeepSeek API key is missing');
      return "Configuration error: API key is missing. Please check your setup.";
    }

    console.log('Generating prompt:', { type, userInput });
    console.log('Using API Key:', API_KEY.substring(0, 4) + '...');  // 只显示前4位

    const systemPrompt = type === 'text' 
      ? "You are a prompt engineering expert. Create clear, detailed prompts based on user requirements. Focus on text generation tasks."
      : "You are a prompt engineering expert for image generation. Create detailed image prompts that will help users generate the images they want. Include aspects like style, mood, lighting, and composition.";

    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userInput
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Details:', errorData);
      
      // 处理特定的错误情况
      if (errorData.error?.type === 'authentication_error') {
        return "Authentication failed. Please check your API key configuration.";
      }
      
      throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    console.log('API Response:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error('Error generating prompt:', error);
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }
    return "An unexpected error occurred. Please try again.";
  }
} 