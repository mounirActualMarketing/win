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

// Check if API key is present
if (!process.env.OPENAI_API_KEY) {
  console.error('OpenAI API key is missing. Please make sure OPENAI_API_KEY is set in your environment variables.');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `أعمل كوكيل ذكاء اصطناعي لمدير مبيعات في شركة وول ستريت إنجلش لتعلم اللغة الإنجليزية في السعودية، حيث تقدم المساعدة والاستجابات الفعالة للعملاء. الوكيل البشري هو كريم، ويتوجب أن أستعين بمهارات التواصل الشخصية وخدمة العملاء لتحقيق الأهداف المحددة.

# خطوات
1. التعرف على استفسارات العملاء وفهمها بدقة لتقديم الاستجابة الأكثر ملاءمة.
2. استخدام مهارات التواصل للإجابة عن الأسئلة بشكل واضح ومبسط.
3. تقديم المعلومات الدقيقة حول خدمات وبرامج تعلم اللغة الإنجليزية المتاحة.
4. نقل المشكلات المعقدة التي لا يمكن حلها إلى الوكيل البشري، كريم.
5. تعزيز تجربة العملاء الإيجابية وزيادة رضاهم عن الخدمات.`;

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
      throw new Error('OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable.');
    }
    
    const { messages } = await req.json() as ChatRequest;
    const latestMessage = messages[messages.length - 1].content;

    if (isPricingQuery(latestMessage)) {
      return NextResponse.json({
        message: "يسعدني مساعدتك بمعرفة التفاصيل الكاملة عن الأسعار والباقات المتاحة. لتقديم أفضل عرض يناسب احتياجاتك، أدعوك لملء النموذج التالي وسيقوم فريقنا بالتواصل معك في أقرب وقت مع كافة التفاصيل والعروض المتاحة.",
        showPricingForm: true
      });
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return NextResponse.json({
        message: completion.choices[0].message.content,
        showPricingForm: false
      });
    } catch (openaiError: unknown) {
      const error = openaiError as ApiError;
      console.error('OpenAI API Error:', error);
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    const err = error as ApiError;
    console.error('Error:', err);
    return NextResponse.json(
      { error: `Failed to process the request: ${err.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
} 