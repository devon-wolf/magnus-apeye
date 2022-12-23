import { CollectionResponse } from '../../types';
import { GET_EPISODES } from '../../constants/constants';
import Episode from './Episode';

class EpisodeCollection {
  episodes: Episode[] = [];

  constructor(rawTranscripts: string[]) {
    this.episodes = rawTranscripts.map((transcript) => new Episode(transcript));
  }

  getEpisodeCount(): number {
    return this.episodes.length;
  }

  getAll(): CollectionResponse<Episode> {
    return {
      count: this.getEpisodeCount(),
      description: GET_EPISODES,
      data: this.episodes.map((episode) =>
        episode.returnWithTranscriptMessage()
      ),
    };
  }

  getByEpisodeNumber(episodeNumber: number): Episode | null {
    return (
      this.episodes.find(
        (episode) => episode.episodeNumber === episodeNumber
      ) ?? null
    );
  }
}

export default EpisodeCollection;
