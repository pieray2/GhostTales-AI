export type StoryCategory = 'Horror' | 'Mystery' | 'Supernatural';

export type StoryLength = 'short' | 'standard' | 'epic';

export type SpookinessLevel = 'campy' | 'eerie' | 'nightmare';

export interface GeneratedStory {
  id: string;
  title: string;
  category: StoryCategory;
  story: string;
  spookyHook: string;
  ghostLog: string;
  atmosphereTags: string[];
  wordCount: number;
  readingTimeMinutes: number;
  model: string;
  generatedAt: string;
  promptIdea: string;
}

export interface StoryGenerationParams {
  prompt: string;
  category: StoryCategory;
  length: StoryLength;
  spookiness: SpookinessLevel;
  atmosphere?: string;
}

export type GhostMood = 'idle' | 'happy' | 'thinking' | 'scary' | 'celebrate' | 'error';
