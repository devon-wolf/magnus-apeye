interface EpisodeBase {
  episodeNumber: number | null;
  title: string;
  season: number | null;
  releaseDate: Date;
  official: boolean;
}

export interface EpisodeInput extends EpisodeBase {
  transcript: string;
}

export interface EpisodeMetadata extends EpisodeBase {
  id: string;
  transcriptPath: string;
}

export interface TranscriptFileData {
  filename: string;
  data: string;
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

export interface CollectionResponse<T> {
  count: number;
  description: string;
  data: Array<T>;
}
