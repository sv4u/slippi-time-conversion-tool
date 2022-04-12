import { SlippiGame } from '@slippi/slippi-js';

class TimeConverter {
  game: SlippiGame;

  constructor(file: string) {
    this.game = new SlippiGame(file);
  }
}
