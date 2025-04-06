import OpenAI from 'openai';

// Create a conditional client that only initializes when API key is available
let openaiInstance: OpenAI | null = null;

// Initialize only in browser context and when API key is available
if (typeof window !== 'undefined') {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  if (apiKey) {
    openaiInstance = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Allow usage in browser (note: this exposes your API key in client-side code)
    });
  }
}

// Function to get or create OpenAI client
export const getOpenAI = (): OpenAI | null => {
  if (typeof window !== 'undefined' && !openaiInstance) {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    
    if (apiKey) {
      openaiInstance = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });
    } else {
      console.error('OpenAI API key is not available');
    }
  }
  
  return openaiInstance;
};

export default getOpenAI; 