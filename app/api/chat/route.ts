import { NextResponse } from 'next/server';
import OpenAI from 'openai';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

// Error interface
interface ApiError extends Error {
  message: string;
  status?: number;
  code?: string;
}

// OpenAI API response type
interface ChatCompletion {
  choices: Array<{
    message: {
      content: string;
    };
    index: number;
  }>;
}

// Check if API key is present
if (!process.env.OPENAI_API_KEY) {
  console.error('OpenAI API key is missing. Please make sure OPENAI_API_KEY is set in your environment variables.');
}

// Set up OpenAI with a timeout
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 25000, // 25 second timeout (Vercel has a 30s limit for serverless functions)
});

// Make the system prompt shorter to reduce token count
const shortSystemPrompt = `أعمل كوكيل ذكاء اصطناعي لمدير مبيعات في شركة وول ستريت إنجلش لتعلم اللغة الإنجليزية في السعودية، حيث تقدم المساعدة والاستجابات الفعالة للعملاء.`;

const isPricingQuery = (message: string): boolean => {
  const pricingKeywords = [
    'سعر',
    'تسعير',
    'تكلفة',
    'كم السعر',
    'كم التكلفة',
    'الأسعار',
    'التسعيرة',
    'تكلف',
    'يكلف',
    'price',
    'pricing',
    'cost'
  ];
  return pricingKeywords.some(keyword => message.toLowerCase().includes(keyword));
};

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured');
      throw new Error('OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable.');
    }

    console.log('API Key available:', !!process.env.OPENAI_API_KEY);
    
    const { messages } = await req.json() as ChatRequest;
    const latestMessage = messages[messages.length - 1].content;

    if (isPricingQuery(latestMessage)) {
      return NextResponse.json({
        message: "يسعدني مساعدتك بمعرفة التفاصيل الكاملة عن الأسعار والباقات المتاحة. لتقديم أفضل عرض يناسب احتياجاتك، أدعوك لملء النموذج التالي وسيقوم فريقنا بالتواصل معك في أقرب وقت مع كافة التفاصيل والعروض المتاحة.",
        showPricingForm: true
      });
    }

    try {
      console.log('Making API request to OpenAI');
      
      // Create a promise with a timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('OpenAI API request timed out')), 25000);
      });
      
      // Create the actual API request promise
      const apiRequestPromise = openai.chat.completions.create({
        model: "gpt-4-turbo", // Using latest GPT-4 Turbo model
        messages: [
          { role: "system", content: shortSystemPrompt }, // Using shorter system prompt
          ...messages.slice(-3) // Only send the last 3 messages to reduce token count
        ],
        temperature: 0.7,
        max_tokens: 250, // Reduced token count for faster responses
      });
      
      // Race the API request against the timeout
      const completion = await Promise.race([apiRequestPromise, timeoutPromise]) as ChatCompletion;

      console.log('API response received');
      return NextResponse.json({
        message: completion.choices[0].message.content,
        showPricingForm: false
      });
    } catch (openaiError: unknown) {
      const error = openaiError as ApiError;
      console.error('OpenAI API Error details:', JSON.stringify(error));
      
      // If it's a timeout error, return a more specific message
      if (error.message === 'OpenAI API request timed out') {
        return NextResponse.json(
          { error: 'المعذرة، استغرق الرد وقتًا طويلاً. يرجى محاولة إرسال رسالة أقصر.' },
          { status: 504 }
        );
      }
      
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    const err = error as ApiError;
    console.error('Request processing error details:', JSON.stringify(err));
    return NextResponse.json(
      { error: `Failed to process the request: ${err.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
} 