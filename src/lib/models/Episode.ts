import { marked } from 'marked';

import { EpisodeInput } from '../../types';

class Episode {
  episodeNumber: number;
  title: string;
  season: number;
  releaseDate: Date;
  official: boolean;
  transcript: string;
  rawTranscript: string;

  constructor(rawTranscript: string) {
    this.rawTranscript = rawTranscript;
    const episodeData = this.getEpisodeData();
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

    const episodeNumber = Number(
      metadata.split('episode_number:')[1].trim().slice(1, 4)
    );

    const season =
      episodeNumber <= 40
        ? 1
        : episodeNumber <= 80
        ? 2
        : episodeNumber <= 120
        ? 3
        : episodeNumber <= 160
        ? 4
        : 5;

    const title = metadata.split('episode_title:')[1].split('\n')[0].trim();

    const releaseDate = new Date(
      metadata.split('date:')[1].trim().slice(0, 10)
    );

    const official = metadata.split('official:')[1].trim().startsWith('true');

    return {
      episodeNumber,
      season,
      title,
      releaseDate,
      official,
      transcript,
    };
  }

  returnWithTranscriptMessage(): Episode {
    const transcriptMessage = `GET /episodes/${this.episodeNumber} for transcript`;
    return {
      ...this,
      transcript: transcriptMessage,
      rawTranscript: transcriptMessage,
    };
  }
}

export default Episode;
