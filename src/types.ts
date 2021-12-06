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
