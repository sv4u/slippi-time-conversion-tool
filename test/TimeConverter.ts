import { FrameEntryType, SlippiGame } from '@slippi/slippi-js';
import assert from 'assert';
import TimeConverter from '../src/TimeConverter';

function randtimeframe(): [string, number] {
  // TODO weight minute closer towards [2...4]
  const minute: number = Math.floor(Math.random() * 10 + 1);
  const second: number = Math.floor(Math.random() * 60);
  const frames: number = (second + minute * 60) * 60;

  return [
    (minute < 10 ? `0${minute}:` : `${minute}:`) +
      (second < 10 ? `0${second}` : `${second}`),
    frames
  ];
}

export function tc_tests() {
  describe('Time Converter Tests', () => {
    const fname = 'slippis/test.slp';

    describe('actual file with game check enabled', () => {
      const tc1 = new TimeConverter(fname, true);
      const sg: SlippiGame = new SlippiGame(fname);
      const lastframe: FrameEntryType | null = sg.getLatestFrame();

      describe('null tests', () => {
        it(`tc1 != null`, () => {
          assert.notEqual(tc1, null);
        });

        it(`tc1->lastframe != null`, () => {
          assert.notEqual(lastframe, null);
        });
      });

      const last: number = lastframe == null ? 0 : lastframe.frame;

      describe('#toFrames', () => {
        const looper: number[] = Array.from(Array(100).keys());
        looper.forEach((idx: number) => {
          const [r_time, _expected]: [string, number] = randtimeframe();
          const expected: number | undefined =
            _expected < last ? _expected : undefined;
          const elapsed: number | undefined = tc1.toFrames(r_time);
          it(`test #${idx}: tc1 @ time ${r_time} elapsed = ${expected}`, () => {
            assert.equal(elapsed, expected);
          });
        });
      });

      describe('#toTime', () => {
        const looper: number[] = Array.from(Array(100).keys());
        looper.forEach((idx: number) => {
          const [r_time, r_frame]: [string, number] = randtimeframe();
          const frame = `${r_frame}`;
          const time: string | undefined = tc1.toTime(frame);
          const expected: string | undefined =
            r_frame < last ? r_time : undefined;
          it(`test #${idx}: tc1 @ frame ${r_frame} = ${expected}`, () => {
            assert.equal(time, expected);
          });
        });
      });
    });
  });
}
