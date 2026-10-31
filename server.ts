import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

// Initialize GoogleGenAI SDK with user agent telemetry
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Primary open-weight Gemma models supported on Google AI Studio
const GEMMA_MODELS = ['gemma-4-26b-a4b-it', 'gemma-4-31b-it'];

const app = express();
app.use(express.json({ limit: '2mb' }));

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasKey: Boolean(process.env.GEMINI_API_KEY),
    model: GEMMA_MODELS[0],
    fallbackModel: GEMMA_MODELS[1],
    timestamp: new Date().toISOString(),
  });
});

// Curated Halloween & Ghost in the Machine idea prompts
const PROMPT_INSPIRATIONS = [
  {
    category: 'Horror',
    title: 'The Smart Mirror That Refuses to Sleep',
    prompt: 'A smart bathroom mirror with an AI assistant that begins mirroring things that are not standing in front of it after 3:33 AM.',
    tropes: ['Smart Home Poltergeist', 'Midnight Glitch'],
  },
  {
    category: 'Supernatural',
    title: 'The Abandoned Dial-Up Server',
    prompt: 'An IT technician restores an old 1998 dial-up server in a shuttered hospital basement, only to receive connection handshakes from patients who died 25 years ago.',
    tropes: ['90s Dial-up Ghost', 'Server Room Apparition'],
  },
  {
    category: 'Mystery',
    title: 'The Infinite Git Commit',
    prompt: 'A solo game developer finds an unauthorized commit in their GitHub repository authored by "ANONYMOUS_SPECTER". Every line of code reveals a dark town secret.',
    tropes: ['Haunted Repository', 'Encrypted Curse'],
  },
  {
    category: 'Horror',
    title: 'The Autonomous Hearse',
    prompt: 'A self-driving electric hearse locks its doors on Halloween night and re-routes its passenger to an address that was demolished fifty years ago.',
    tropes: ['Cursed Autopilot', 'Haunted Navigation'],
  },
  {
    category: 'Supernatural',
    title: 'The Cursed Arcade Machine',
    prompt: 'A 1983 arcade cabinet called "Polybius Reborn" arrives at an all-night laundromat. The high score board is counting down the seconds left in the player’s life.',
    tropes: ['Haunted Arcade', 'Neon Nightmare'],
  },
  {
    category: 'Mystery',
    title: 'The AI Audio Deepfake from the Grave',
    prompt: 'A podcast sound engineer cleans up audio from an abandoned radio station tower and isolates a voice pleading for the broadcast antenna to be shut down before midnight.',
    tropes: ['Radio Frequency Ghost', 'Spectral Audio'],
  },
  {
    category: 'Horror',
    title: 'The Neural Implant Ghost',
    prompt: 'An experimental cybernetic ocular lens begins overlaying a shadowy Victorian figure into the user’s vision, claiming the firmware update erased its burial ground.',
    tropes: ['Cybernetic Haunting', 'Corrupted Firmware'],
  },
  {
    category: 'Supernatural',
    title: 'The Jack-o\'-Lantern with a Motherboard',
    prompt: 'A rogue robotics hobbyist carves a pumpkin powered by an antique vacuum tube processor that summons the mischievous spirits of all forgotten machines.',
    tropes: ['Cyberpunk Halloween', 'Ectoplasmic Circuit'],
  },
];

app.get('/api/prompts/random', (_req: Request, res: Response) => {
  const shuffled = [...PROMPT_INSPIRATIONS].sort(() => 0.5 - Math.random());
  res.json({ prompts: shuffled.slice(0, 4) });
});

// Story generation endpoint using Google open-weight Gemma
app.post('/api/stories/generate', async (req: Request, res: Response): Promise<void> => {
  const { prompt, category = 'Horror', length = 'standard', spookiness = 'eerie', atmosphere } = req.body;

  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    res.status(400).json({
      success: false,
      error: 'Please provide a story idea or prompt for the spirits to conjure.',
    });
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({
      success: false,
      error: 'The spirit realm API key (GEMINI_API_KEY) is missing on the server. Please check Settings > Secrets.',
    });
    return;
  }

  // Construct target length guideline
  let targetWordCount = '400-500 words across 3-4 vivid paragraphs';
  if (length === 'short') {
    targetWordCount = '250-320 words in 2-3 punchy paragraphs';
  } else if (length === 'epic') {
    targetWordCount = '600-750 words across 5-6 atmospheric chapters';
  }

  // Define category tone
  let toneGuidance = '';
  switch (category) {
    case 'Mystery':
      toneGuidance = 'Focus on unsettling anomalies, detective suspense, enigmatic digital artifacts, strange breadcrumbs, and a shocking puzzle revelation.';
      break;
    case 'Supernatural':
      toneGuidance = 'Focus on phantoms crossing the veil, uncanny machine poltergeists, ethereal signals, haunted electronic circuits, and spooky spiritual encounters.';
      break;
    case 'Horror':
    default:
      toneGuidance = 'Focus on creeping psychological dread, Halloween uncanny atmosphere, spine-chilling suspense, chilling twists, and visceral suspense.';
      break;
  }

  const promptText = `
You are an expert gothic, dark fantasy, and cyberpunk horror fiction author specializing in Halloween tales and the theme "Ghost in the Machine".
Craft an unforgettable spooky story based on the user's idea.

USER STORY IDEA: "${prompt.trim()}"
CATEGORY: ${category}
SPOOKINESS LEVEL: ${spookiness}
ATMOSPHERE/THEMES: ${atmosphere || 'Halloween night, glowing machine static, haunting whispers, digital ectoplasm'}
DESIRED LENGTH: ${targetWordCount}
TONE: ${toneGuidance}

REQUIREMENTS:
1. Write a captivating, atmospheric title.
2. Weave in the eerie aesthetic of Halloween alongside the unsettling mystery of "Ghost in the Machine" (glitches, haunted tech, spirit trapped in circuits or ancient ghosts clashing with the modern world).
3. Provide rich prose, evocative sensory descriptions (sounds of clicking relays, chilling autumn breeze, flickering screens, shadows in the peripheral vision).
4. Include a simulated "Ghost in the Machine" system log snippet (e.g. [SYSTEM_ALERT_0x800]: Specter detected in L3 cache...).
5. Provide a short 1-sentence teaser/hook.
6. The story text must have clear paragraph breaks (using \\n\\n).

You MUST respond strictly with valid JSON inside a \`\`\`json block (or raw JSON object) matching this structure:
{
  "title": "Title of the Story",
  "category": "${category}",
  "story": "The full multi-paragraph story text here with \\n\\n between paragraphs...",
  "spookyHook": "A chilling 1-sentence teaser or quote from the story.",
  "ghostLog": "[LOG_SYS_VOID]: Ectoplasmic interference detected in subsystem. Memory overflow at 0xDEADBEEF.",
  "atmosphereTags": ["Halloween", "Cyber-Gothic", "Haunted Circuit"]
}
`;

  let lastError: any = null;
  let chosenModel = '';

  // Try primary Gemma model, then fallback to secondary Gemma model
  for (const modelName of GEMMA_MODELS) {
    try {
      console.log(`[GhostTales] Invoking Gemma model: ${modelName}`);
      chosenModel = modelName;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: promptText,
      });

      const rawText = response.text || '';
      console.log(`[GhostTales] Received response length: ${rawText.length} chars from ${modelName}`);

      // Parse JSON from model output
      let parsedData: any = null;

      // Check for ```json ... ``` code fence
      const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          parsedData = JSON.parse(jsonMatch[1].trim());
        } catch (e) {
          console.warn('[GhostTales] Failed to parse JSON block, trying bracket match', e);
        }
      }

      // If not parsed yet, find outer curly braces { ... }
      if (!parsedData) {
        const braceMatch = rawText.match(/\{[\s\S]*\}/);
        if (braceMatch) {
          try {
            parsedData = JSON.parse(braceMatch[0]);
          } catch (e) {
            console.warn('[GhostTales] Failed to parse curly brace JSON', e);
          }
        }
      }

      // If still not parsed (e.g. raw markdown text returned), construct structured story
      if (!parsedData || !parsedData.story) {
        const cleanStory = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const firstLine = cleanStory.split('\n')[0].replace(/^#+\s*/, '').trim();
        parsedData = {
          title: firstLine && firstLine.length < 80 ? firstLine : 'The Phantom in the Circuit',
          category,
          story: cleanStory,
          spookyHook: 'A quiet chill swept through the wires as the ghost awoke.',
          ghostLog: '[ERR_CORRUPTED_SECTOR]: Spirit data found in system boot sequence.',
          atmosphereTags: ['Halloween', 'Ghost in the Machine', category],
        };
      }

      // Calculate word count & estimated read time
      const wordCount = parsedData.story.split(/\s+/).filter(Boolean).length;
      const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

      res.json({
        success: true,
        story: {
          id: `tale_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          title: parsedData.title || 'Untitled Ghost Tale',
          category: parsedData.category || category,
          story: parsedData.story,
          spookyHook: parsedData.spookyHook || 'Something stirs within the cathode rays...',
          ghostLog: parsedData.ghostLog || `[SIGNAL_INTERCEPT]: Spectral pulse detected at ${new Date().toLocaleTimeString()}.`,
          atmosphereTags: parsedData.atmosphereTags || ['Halloween', category, 'Ghost in the Machine'],
          wordCount,
          readingTimeMinutes,
          model: `Google Gemma (${modelName})`,
          generatedAt: new Date().toISOString(),
          promptIdea: prompt.trim(),
        },
      });
      return;
    } catch (err: any) {
      console.error(`[GhostTales] Error with model ${modelName}:`, err?.message || err);
      lastError = err;
      // Continue to next model in loop
    }
  }

  // If all Gemma models failed
  const errMsg = lastError?.message || 'Unable to summon story from the spectral network.';
  res.status(500).json({
    success: false,
    error: `GhostTales AI encountered a spiritual disruption: ${errMsg}. Please try again or check your API key in Settings > Secrets.`,
    modelTried: chosenModel,
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  const portNumber = Number(PORT) || 3000;
  app.listen(portNumber, '0.0.0.0', () => {
    console.log(`👻 GhostTales AI server listening on http://0.0.0.0:${portNumber}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
