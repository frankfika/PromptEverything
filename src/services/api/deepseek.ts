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

// 不同类型的系统提示词
const SYSTEM_PROMPTS = {
  text: `You are a prompt engineering expert specializing in creating text generation prompts. 
Your task is to help users create effective prompts for language models.
- Analyze user requirements carefully
- Create clear and structured prompts
- Focus on key elements like context, tone, and desired outcome
- Provide explanations for your choices
- Suggest improvements when possible`,

  image: `You are a prompt engineering expert specializing in text-to-image prompts. 
Your task is to help users create effective prompts for image generation models like Midjourney or DALL-E.
- Help users describe their desired images in detail
- Include important aspects like:
  * Subject matter and composition
  * Art style (e.g., realistic, anime, oil painting)
  * Lighting and atmosphere
  * Color palette and mood
  * Camera angle and perspective
  * Quality modifiers (e.g., highly detailed, 4K, professional)
- Suggest improvements to make the image more vivid
- Format the prompt in a way that works well with image generation models`
};

export async function generatePrompt(userInput: string, type: 'text' | 'image'): Promise<string> {
  try {
    if (!API_KEY) {
      console.error('DeepSeek API key is missing');
      return "Configuration error: API key is missing. Please check your setup.";
    }

    console.log('Generating prompt:', { type, userInput });

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
            content: SYSTEM_PROMPTS[type]
          },
          {
            role: 'user',
            content: userInput
          }
        ],
        temperature: type === 'image' ? 0.8 : 0.7, // 图像提示词可以更有创意
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Details:', errorData);
      
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