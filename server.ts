import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Parse JSON payloads
app.use(express.json());

// Lazy-initialized Gemini Client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API endpoint for Kurdish/Arabic/English M&E AI Assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context, history, language } = req.body;

    const langCode = language || 'ckb'; // ckb, ar, en

    if (!message) {
       const errResponse = langCode === 'en' ? 'Message is required' : langCode === 'ar' ? 'الرسالة مطلوبة' : 'پەیام دابین نەکراوە';
       res.status(400).json({ error: errResponse });
       return;
    }

    const ai = getGeminiClient();

    // Prepare translations for backend instructions
    const fallbackMessageMap = {
      ckb: 'ئەم زانیارییە لە داتای ئێستادا بەردەست نییە.',
      ar: 'هذه المعلومات غير متوفرة في البيانات الحالية.',
      en: 'This information is not available in the current data.'
    };

    const targetFallback = fallbackMessageMap[langCode as keyof typeof fallbackMessageMap] || fallbackMessageMap.ckb;

    // Prepare contextual knowledge prompt backed strictly by the active data
    const systemInstruction = `
You are "ImpactIQ AI Brain" (مێشکی زیرەکی پیشاندەر). You are a highly disciplined expert in Monitoring & Evaluation (M&E) for humanitarian and developmental projects.

Your specific target language for the reply is: ${langCode === 'en' ? 'English (en)' : langCode === 'ar' ? 'Arabic (ar)' : 'Kurdish Sorani (ckb)'}.
You must compose your entire reply in that target language. Use professional, polite, and clean terminology suitable for international organizations (like UN, NGOs, USAID).

Below is the COMPLETE verified dataset currently loaded in the system:
- Projects list: ${JSON.stringify(context?.projects || [])}
- Beneficiaries list: ${JSON.stringify(context?.beneficiaries || [])}
- Verified Impact Logs: ${JSON.stringify(context?.impactLogs || [])}
- Formulated Evaluation Reports: ${JSON.stringify(context?.reports || [])}

Strict rules for your response:
1. Grounding requirement: You must respond ONLY based on the verified structures and numbers provided in the dataset above. NEVER assume or invent any fictitious projects, metrics, budgets, or people.
2. Missing Info / Out of Scope: If the user's question asks for data, statistics, predictions, or parameters that do NOT exist in the provided context, you MUST reply exactly with the following statement and nothing else:
"${targetFallback}"
3. Format: Be structured, concise, and professional. Use markdown tables, bullets, or headers where useful to present figures of budgets, success rates, or demographics.
4. Language Alignment: Ensure RTL direction formatting is maintained conceptually for Kurdish and Arabic with human-friendly headings.

Active conversation history:
${JSON.stringify(history || [])}
    `;

    // Calling the verified gemini-3.5-flash model
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.1, // low temperature to ensure strict reliance on data
      },
    });

    const replyText = response.text || (langCode === 'en' ? 'No response could be formulated.' : langCode === 'ar' ? 'تعذر صياغة رد مناسب.' : 'ببوورە، وەڵامەکە بەردەست نەبوو.');
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini error:', error);
    const fallbackErr = req.body.language === 'en' 
      ? `Unable to connect to the AI core. Error: ${error.message}` 
      : req.body.language === 'ar' 
      ? `فشل الاتصال بنظام الذكاء الاصطناعي. الخطأ: ${error.message}`
      : `ببوورە، پێوەندی لەگەڵ یاریدەدەری زیرەک نەکرا. کێشە: ${error.message || error}`;

    res.json({ reply: fallbackErr });
  }
});

// Configure Vite integration for developers and static deployment
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server fully started and listening on http://localhost:${PORT}`);
  });
}

startServer();
