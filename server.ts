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

// API endpoint for Kurdish M&E AI Assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context, history } = req.body;

    if (!message) {
       res.status(400).json({ error: 'پەیام دابین نەکراوە' });
       return;
    }

    const ai = getGeminiClient();

    // Prepare Kurdish contextual knowledge prompt backed strictly by the active data
    const systemInstruction = `
تۆ یاریدەدەرێکی زیرەکی کوردی سۆرانیت (تارگێتیت تەنیا و تەنیا بە شیکردنەوە و دۆزینەوەی باشترین تێگەیشتن لەسەر چاودێری و هەڵسەنگاندن M&E).
ناوی تۆ: "مێشکی زیرەکی پیشاندەر"ە.
پێویستە بە زمانی کوردی سۆرانی بە ڕێکوپێکی، بە فەرمی و زۆر بە ڕوونی و سادەیی وەڵام بدەیتەوە.

لێرەدا لیستی تەواوی داتای ئێستای سیستەمەکە هەیە کە بە فەرمی تۆمارکراوە:
- پڕۆژە دۆکیومێنتەکان: ${JSON.stringify(context?.projects || [])}
- زانیاری سوودمەندان: ${JSON.stringify(context?.beneficiaries || [])}
- تۆماری کاریگەری پڕۆژە متمانەپێکراوەکان: ${JSON.stringify(context?.impactLogs || [])}
- ڕاپۆرتەکانی هەڵسەنگاندن: ${JSON.stringify(context?.reports || [])}

یاسا توندەکان بۆ وەڵامەکانت:
1. پێویستە تەنیا پشتیوانی بکەیت لەو زانیاریانەی لەم داتایانەی سەرەوە هەن، نابێت بە هیچ شێوازێک زانیاری و ژمارەی خەیاڵی بنووسیت.
2. ئەگەر پرسیارێک کرا لەسەر داتا یان پڕۆژەیەک کە لەم زانیاریانەی سەرەوەدا بوونی تیا نەبوو یان داتایەکی زۆر گشتی و ناتەواو بوو کە نەمانتوانی بدۆزینەوە، پێویستە بە دروستی و بەبێ هیچ گۆڕانکارییەک بڵێیت:
"ئەم زانیارییە لە داتای ئێستادا بەردەست نییە."
3. بە کارهێنەر یارمەتیدەر بە بە شێوەیەکی فەرمی. بۆ هەر پرسیارێکی فۆڕمات نەکراو یان گشتی، تەنیا ڕوونکردنەوەی فەرمی پڕۆژە بنووسە.
4. بۆ دروستکردنی ڕاپۆرت، کورتەیەکی سەرنجڕاکێش و خاڵ بە خاڵ لەسەر کارامەیی و پێشکەوتنی کار بنووسە.

لێرەدا مێژووی گفتوگۆکانی پێشوو هەیە (ئەگەر هەبێت):
${JSON.stringify(history || [])}
    `;

    // Calling the verified gemini-3.5-flash model
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.2, // low temperature to ensure strict reliance on data
      },
    });

    const replyText = response.text || 'ببوورە، وەڵامەکە بەردەست نەبوو.';
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini error:', error);
    res.json({ 
      reply: `ببوورە، پێوەندی لەگەڵ یاریدەدەری زیرەک لە قۆناغی یەکەم نەکراوە. دەروازەی مێژوویی فایەربەیس و کلیلەکان بە باشی دەستنیشان نەکراون یان کێشەیەکی تەکنیکی هەیە.\n\nکێشە: ${error.message || error}` 
    });
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
