import { marked } from 'marked';

import { EpisodeInput, EpisodeMetadata, TranscriptFileData } from '../../types';

class Episode {
  id: string;
  episodeNumber: number | null;
  title: string;
  season: number | null;
  releaseDate: Date;
  official: boolean;
  transcript: string;
  rawTranscript: string;

  constructor(rawTranscript: TranscriptFileData) {
    this.rawTranscript = rawTranscript.data;
    const episodeData = this.getEpisodeData();

    this.id = rawTranscript.filename.replace(/\.md/, '');
    this.episodeNumber = episodeData.episodeNumber;
    this.title = episodeData.title;
    this.season = episodeData.season;
    this.releaseDate = episodeData.releaseDate;
    this.official = episodeData.official;
    this.transcript = episodeData.transcript;
  }

  private getEpisodeData(): EpisodeInput {
    const splitFileContents = this.rawTranscript.split('---\n\n');
    const metadata = splitFileContents[0];

    const transcript = marked
      .parse(splitFileContents[1], { headerIds: false })
      .split('\n')
      .join('');

    function getMetadataLine(splitTarget: string): string {
      return metadata.split(splitTarget)[1].split('\n')[0].trim();
    }

    const episodeNumberLine = getMetadataLine('episode_number:');

    const isSpecialEpisode = episodeNumberLine.includes('.');

    const episodeNumber = isSpecialEpisode
      ? null
      : Number(episodeNumberLine.slice(1, 4));

    const season = !episodeNumber
      ? null // TODO: make better considerations for special episodes
      : episodeNumber <= 40
      ? 1
      : episodeNumber <= 80
      ? 2
      : episodeNumber <= 120
      ? 3
      : episodeNumber <= 160
      ? 4
      : 5;

    const title = getMetadataLine('episode_title:').replace(/'$|^'|"/g, '');

    const releaseDate = new Date(getMetadataLine('date:').slice(0, 10));

    const official = getMetadataLine('official:').startsWith('true');

    return {
      episodeNumber,
      season,
      title,
      releaseDate,
      official,
      transcript,
    };
  }

  returnMetadata(): EpisodeMetadata {
    const { id, episodeNumber, season, title, releaseDate, official } = this;

    return {
      id,
      episodeNumber,
      season,
      title,
      releaseDate,
      official,
      transcriptPath: episodeNumber
        ? `/episodes/${episodeNumber}`
        : 'no episode number, path not yet available! sorry!',
    };
  }
}

export default Episode;
