# GhostTales AI 👻

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Model](https://img.shields.io/badge/AI%20Model-Google%20Gemma%20(Open--Weight)-purple.svg)](https://ai.google.dev/gemma)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20TypeScript-61dafb.svg)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38bdf8.svg)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Backend-Express.js-000000.svg)](https://expressjs.com)

> **Where Halloween Folklore Meets the Machine.**  
> An atmospheric, full-stack AI web application that transforms user prompts into spine-chilling supernatural tales—powered exclusively by Google's open-weight **Gemma** model family.

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [How It Works](#-how-it-works)
- [AI Technology & Architecture](#-ai-technology--architecture)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Privacy and Security](#-privacy-and-security)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## 🔮 Overview

**GhostTales AI** is a specialized, interactive storytelling platform built around the aesthetic intersection of gothic Halloween lore and the uncanny **"Ghost in the Machine"** theme. 

Traditional ghost stories often dwell in dusty attics and Victorian crypts; GhostTales AI bridges that folklore with digital terror—haunted dial-up modems, rogue AI processes, phantom CRT monitors, and corrupted memory sectors.

At its core, GhostTales AI pairs a responsive, dark purple-and-black cyber-gothic interface with a friendly animated spectral mascot, **"Specter Byte"**. Beneath the eerie atmosphere lies a production-grade full-stack architecture that uses Google's open-weight **Gemma** foundation models (`gemma-4-26b-a4b-it` and `gemma-4-31b-it`) via secure server-side inference.

---

## ✨ Key Features

### 1. 🧠 AI-Powered Story Generation
- Generates rich, multi-paragraph, atmospheric stories from any custom prompt or idea.
- Employs deep narrative prompt engineering designed to produce vivid sensory details, escalating suspense, and chilling plot twists.
- Integrates simulated **"Ghost in the Machine" system logs** with every tale (e.g., `[ERR_0x666]: Spirit packet detected in L3 cache`).

### 2. 🩸 Three Curated Story Categories
- **Horror**: Pure psychological dread, visceral tension, cybernetic rot, and shocking revelations.
- **Mystery**: Cryptic anomalies, missing records, encrypted ciphers, and supernatural detective investigations.
- **Supernatural**: Phantoms crossing the digital veil, electronic poltergeists, and entities lingering inside firmware.

### 3. 📜 Immersive Reading Card Experience
- Displays the generated narrative within a gothic-cyber reading parchment adorned with glowing ornate borders, drop-cap typography, and atmospheric metadata badges.
- Highlights a chilling teaser hook extracted from the generated tale.
- Formats paragraphs for optimal readability with comfortable leading and contrast.

### 4. ⏱️ Automatic Word Count & Reading Time
- Analyzes generated prose in real time.
- Dynamically calculates word count and estimated reading time based on standard reading speed benchmarks.

### 5. 🔊 Read Aloud Functionality (Text-to-Speech)
- Integrated browser-native narration via the **Web Speech API**.
- Customized with pitch and pacing calibrations tailored for eerie, suspenseful auditory storytelling.
- Instant play, pause, and stop controls with clean state transitions.

### 6. 📻 Procedural Ambient Background Audio
- Built-in procedural ambient synthesizer developed with the **Web Audio API**.
- Generates a real-time, low-frequency dual-oscillator drone (55 Hz & 82.4 Hz) combined with bandpass-filtered noise emulating ghostly crypt winds.
- **Zero external audio files**: 100% procedurally synthesized, immediate playback, no network asset latency.

### 7. 🔍 Adjustable Text Size
- Dedicated reading accessibility controls:
  - **Normal** (`A-`): Balanced for compact screens and standard browsing.
  - **Large** (`A`): Increased font size and line height for relaxed reading.
  - **Huge** (`A+`): High-visibility presentation mode for tablets and long reading sessions.

### 8. 📋 Copy, Export & Regenerate Stories
- **Copy Story**: One-click clipboard copy including title, category, formatted story text, and system telemetry log, accompanied by toast feedback.
- **Generate Another**: One-click smooth scroll back to the summoning form with preserved or cleared inputs.
- **Export to File**: Instant download of the story as a timestamped `.txt` document.

### 9. 👻 Interactive Mascot — "Specter Byte"
- Custom SVG animated ghost with floating hover kinematics, blinking expressive eyes, and reactive mood states (`idle`, `typing`, `thinking`, `celebrate`, `error`).
- Interactive easter egg: Click the ghost to trigger spectral chimes and randomized spooky quips.

### 10. 📚 Grimoire of Past Tales (History & Storage)
- LocalStorage-backed story archive (`ghosttales_saved_grimoire_v1`).
- Allows users to revisit, re-read, copy, delete, or bulk-export all previously summoned tales to a formatted JSON file.

### 11. 💡 "Whisper an Idea" & Thematic Modifiers
- Quick random prompt inspirer cycling through curated cyber-Halloween scenarios.
- Thematic trope chips (e.g., *Haunted Server Farm*, *90s Dial-Up Ghost*, *Smart Home Poltergeist*, *Cursed Code Repository*) that append directly into the creative prompt.

---

## 📸 Screenshots

> *Placeholder previews for GhostTales AI interface on desktop and mobile devices.*

| Desktop Experience | Mobile & Tablet View |
| :---: | :---: |
| ![GhostTales AI Desktop Dashboard](https://placehold.co/800x480/080312/c084fc?text=GhostTales+AI+-+Desktop+Parchment+View) | ![GhostTales AI Mobile Interface](https://placehold.co/400x600/080312/c084fc?text=GhostTales+AI+-+Mobile+View) |
| *Desktop reading card with ambient audio and telemetry log* | *Responsive touch-friendly story generation controls* |

| Mascot Reactions & Loading | Grimoire Archive Modal |
| :---: | :---: |
| ![Specter Byte Mascot](https://placehold.co/600x400/120822/f59e0b?text=Specter+Byte+Summoning+Gemma) | ![Grimoire Drawer](https://placehold.co/600x400/120822/38bdf8?text=Saved+Grimoire+Tales) |
| *Interactive animated ghost reacting to story generation* | *Archive drawer for managing and exporting saved stories* |

---

## 🛠️ How It Works

```
 ┌────────────────┐       ┌─────────────────┐       ┌────────────────────────┐
 │   User Prompt  │ ────> │  Story Form UI  │ ────> │   POST /api/stories/   │
 │   & Category   │       │  & Tropes Chips │       │   generate (Express)   │
 └────────────────┘       └─────────────────┘       └───────────┬────────────┘
                                                                │
                                                                ▼
 ┌────────────────┐       ┌─────────────────┐       ┌────────────────────────┐
 │  Reading Card  │ <──── │ Structured JSON │ <──── │  Google Gemma Model    │
 │  Display & TTS │       │ Story Payload   │       │  (Open-Weight Engine)  │
 └────────────────┘       └─────────────────┘       └────────────────────────┘
```

1. **Craft the Tale Idea**: The user selects a category (**Horror**, **Mystery**, or **Supernatural**), writes their story concept or clicks **"Whisper an Idea"**, and selects desired length and spookiness levels.
2. **Initiate Generation**: Clicking **"Generate Story"** sends a payload to the application's backend server.
3. **Spectral Processing**: "Specter Byte" enters a thinking state with orbiting energy particles while status updates cycle in real time.
4. **Server-Side Inference**: The Node.js/Express server queries Google's open-weight **Gemma** model with structured prompt parameters and defensive JSON extraction.
5. **Reading & Immersive Audio**: The story arrives in the parchment reading card, launches celebratory purple particles, activates the read-aloud option, and allows ambient procedural drone playback.

---

## 🤖 AI Technology & Architecture

### Google's Open-Weight Gemma Integration

GhostTales AI is built strictly with Google's open-weight **Gemma** models. The application does not use Gemini or third-party closed-source models for story generation.

- **Primary Model**: `gemma-4-26b-a4b-it` — High-parameter, instruction-tuned open-weight Gemma model capable of rich literary fiction, nuanced tone adaptation, and strict schema adherence.
- **Failover Model**: `gemma-4-31b-it` — Secondary Gemma model used as an automated fallback if the primary model experiences transient latency.
- **SDK**: Official `@google/genai` TypeScript SDK on the server layer.
- **Telemetry & Identification**: In accordance with developer specifications, requests pass the custom `User-Agent: aistudio-build` header within `httpOptions`.

### Secure Server-Side Pipeline

```typescript
// server.ts
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});
```

- **Zero Client Exposure**: The client application never imports `@google/genai` and never has direct access to `GEMINI_API_KEY`.
- **Defensive JSON Parsing**: The server-side generation handler formats responses to strict JSON schemas, implementing multi-stage regex extraction (fenced codeblocks, curly brace boundary checks, and structured fallback formatters) to ensure zero UI crashes.

---

## 💻 Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) | Component architecture, state hooks, and UI rendering |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe contracts across frontend and backend |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Dark purple/black color palette, gothic themes, and utilities |
| **Animations** | [Motion](https://motion.dev/) | Smooth Mascot transitions, floating particles, and fade effects |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, accessible vector UI icons |
| **Celebration** | [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) | Ectoplasmic particle explosion on story arrival |
| **Server & API** | [Express 4](https://expressjs.com/) | REST API proxy, story generation endpoint, and static serving |
| **Build Tooling** | [Vite 8](https://vitejs.dev/) + [tsx](https://github.com/privatenumber/tsx) | Lightning-fast development server with integrated middleware |
| **AI Inference** | [@google/genai](https://www.npmjs.com/package/@google/genai) | Server-side execution of Google open-weight Gemma models |
| **Audio Synthesis** | [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Procedural dual-oscillator ambient soundscape |
| **Voice Narration** | [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | Client-side accessible text-to-speech engine |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **bun** package manager
- A valid Google API key with access to Gemma generative endpoints.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ghosttales-ai.git
   cd ghosttales-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
   Add your API key into `.env`:
   ```env
   GEMINI_API_KEY="your_actual_api_key_here"
   APP_URL="http://localhost:3000"
   PORT=3000
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will start on **http://localhost:3000** with hot reload and server-side routes mounted via Vite middleware.

5. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🔐 Environment Variables

The project requires the following environment variables on the server. Never commit your `.env` file to version control.

| Variable | Description | Client Exposed? |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | API key required to communicate with Google's Gemma inference service. | **No** (Server-only) |
| `APP_URL` | Self-referential URL where the applet is hosted (injected by host environment). | **No** |
| `PORT` | Local port for the Express application server (defaults to `3000`). | **No** |

---

## 📁 Project Structure

```
ghosttales-ai/
├── .env.example              # Template for environment configuration
├── .gitignore                # Git exclusions (node_modules, dist, .env)
├── index.html                # Entry HTML with custom Google Fonts & metadata
├── metadata.json             # AI Studio applet definition & server capabilities
├── package.json              # Project dependencies, devDependencies, and scripts
├── server.ts                 # Full-stack Express server & Gemma AI endpoints
├── tsconfig.json             # TypeScript compiler settings
├── vite.config.ts            # Vite configuration with React & Tailwind plugins
└── src/
    ├── main.tsx              # React DOM root entry point
    ├── App.tsx               # Main application container & state orchestration
    ├── index.css             # Tailwind CSS imports, custom animations & glows
    ├── types/
    │   └── story.ts          # TypeScript interfaces (Story, Category, Moods)
    ├── utils/
    │   └── audio.ts          # Web Audio synthesizer & Web Speech narrator
    └── components/
        ├── GhostIllustration.tsx # Interactive animated "Specter Byte" SVG mascot
        ├── Header.tsx            # Navigation, branding & atmospheric controls
        ├── Footer.tsx            # Open-source credits & model attribution
        ├── StoryForm.tsx         # Story idea input, categories, tropes & controls
        ├── StoryCard.tsx         # Gothic reading card with actions, audio & logs
        ├── LoadingGrimoire.tsx   # Atmospheric loading animation with status cycler
        ├── ErrorMessage.tsx      # Diagnostic error card with retry flow
        └── StoryHistoryModal.tsx # Grimoire modal for managing archived tales
```

---

## 🛡️ Privacy and Security

- **Server-Side Secret Isolation**: `GEMINI_API_KEY` is read strictly on the Node.js/Express server (`server.ts`). No API keys or tokens are passed to or bundled with the frontend client.
- **No Third-Party Telemetry**: The app does not bundle analytics trackers, third-party user fingerprinting, or tracking pixels.
- **Local-Only Tale Persistence**: Stories saved in the "Grimoire" are stored purely in the user's browser `localStorage`. No user-generated prompts or personal stories are stored in remote tracking databases.
- **Safe Audio Synthesis**: Ambient audio is generated dynamically using mathematical waveforms within the client's Web Audio buffer, requiring no external cookies or media downloads.

---

## 🔮 Future Improvements

- [ ] **Branching "Choose Your Own Path" Tales**: Allow readers to prompt Gemma for alternate chapter outcomes.
- [ ] **Multi-Voice Audio Narration**: Integration with advanced dual-speaker synthesis for distinct character voices.
- [ ] **Custom Ghost Costumes**: Unlockable skins for "Specter Byte" based on categories and reading streaks.
- [ ] **EPUB & PDF Exporter**: Generate beautifully formatted illustrated chapbooks for reading on e-readers.
- [ ] **Community Haunted Library**: Optional opt-in anonymous sharing board for community spooky tales.

---

## 📄 License

This project is distributed under the **Apache-2.0** License. See the repository headers and source code files for full license details.

---

<div align="center">
  <sub>Built with 🎃 by the GhostTales AI team • Powered by Google Gemma</sub>
</div>
