import { FrameEntryType, FramesType, SlippiGame } from '@slippi/slippi-js';

class TimeConverter {
  game: SlippiGame | null;
  gameCheck: boolean;

  constructor(file: string | null, _gameCheck = true) {
    this.gameCheck = _gameCheck;
    this.game = _gameCheck ? new SlippiGame(file ?? '') : null;
  }

  toFrames(time: string): number | undefined {
    const TIME_REGEX_EXP = '([0-9]{1,2}):([0-9]{2})';
    const tokens: RegExpMatchArray | null = time.match(TIME_REGEX_EXP);

    if (tokens == null) {
      throw new Error(
        `Invalid input time (input: ${time}) passed into 'toFrames' within TimeConverter`
      );
    }

    // tokens is structured as follows
    // [ <time>, <minutes>, <seconds>, index: <starting index>, input: <time>, groups: undefined ]
    const minutes = Number(tokens[1]);
    const seconds = Number(tokens[2]);

    const total_seconds = seconds + minutes * 60;
    const frames = total_seconds * 60;

    if (this.gameCheck) {
      if (this.game == null) {
        throw new Error(`supplied game is null`);
      }

      const gameFrames: FramesType | undefined = this.game.getFrames();
      if (gameFrames == undefined) {
        throw new Error(`supplied game has undefined frames`);
      }

      const frameInQuestion: FrameEntryType = gameFrames[frames];
      if (frameInQuestion == null || frameInQuestion == undefined) {
        return undefined;
      }
    }

    return frames;
  }

  toTime(frame: string): string {
    const FRAME_REGEX_EXP = '([0-9]*)';
    const tokens: RegExpMatchArray | null = frame.match(FRAME_REGEX_EXP);

    if (tokens == null) {
      throw new Error(
        `Invalid frame (input: ${frame}) passed into 'toTime' within TimeConverter`
      );
    }

    // tokens is structured as follows
    // [ <frame>, <frame>, index: <starting index>, input: <frame>, groups: undefined ]
    const n_frame = Number(tokens[1]);

    // 60 frames/second
    const total_seconds = ~~(n_frame / 60);
    const minutes = ~~(total_seconds / 60);
    const seconds = total_seconds % 60;

    const time = `${minutes}:` + (seconds < 10 ? `0${seconds}` : `${seconds}`);

    // TODO check on game

    return time;
  }
}

export default TimeConverter;
