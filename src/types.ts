export interface DatabaseEpisode {
  id: string;
  episode_number: number;
  title: string;
  season: number;
  transcript: string;
  release_date: Date;
}

export interface EpisodeInput {
  episodeNumber: number;
  title: string;
  season: number;
  transcript: string;
  releaseDate: Date;
}

export interface MarkdownTranscript {
  metadata: {
    layout?: string;
    title?: string;
    date?: string;
    categories?: string | string[];
    tags?: string[];
    statement_of?: string | string[];
    recorder?: string | string[];
    voiced?: string | string[];
    episode_title?: string;
    episode_number?: string;
    case_number?: string;
    statement_date?: string;
    recording_date?: string;
    event_date?: string;
    summary?: string;
    content_flags?: string[];
    acast_url?: string;
    formats?: {
      PDF?: string;
      'PDF (Large-Print)'?: string;
      'Google Doc'?: string;
      DOCX?: string;
    };
    official?: boolean;
    unofficial?: boolean;
    unofficial_name?: boolean;
    unfinished?: boolean;
    wiki_url?: string;
  };
  transcript: string | string[];
}
