import { FrameEntryType, SlippiGame } from '@slippi/slippi-js';
import assert from 'assert';
import TimeConverter from '../src/TimeConverter';

function randtime(): [string, number] {
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
      it(`tc1 != null`, () => {
        assert.notEqual(tc1, null);
      });

      // todo get the last frame number
      const sg: SlippiGame = new SlippiGame(fname);
      const lastframe: FrameEntryType | null = sg.getLatestFrame();
      it(`tc1->lastframe != null`, () => {
        assert.notEqual(lastframe, null);
      });

      const last: number = lastframe == null ? 0 : lastframe.frame;

      describe('#toFrames', () => {
        const looper: number[] = Array.from(Array(100).keys());
        looper.forEach((idx: number) => {
          const [r_time, _expected]: [string, number] = randtime();
          const expected: number | undefined =
            _expected < last ? _expected : undefined;
          const elapsed: number | undefined = tc1.toFrames(r_time);
          it(`test #${idx}: tc1 @ time ${r_time} elapsed = ${expected}`, () => {
            assert.equal(elapsed, expected);
          });
        });
      });

      describe('#toTime', () => {
        const zeroFrame: string | undefined = tc1.toTime('0');
        it(`tc1 @ frame 0 = 00:00`, () => {
          assert.equal(zeroFrame, '00:00');
        });

        const hundredFrame: string | undefined = tc1.toTime('100');
        it(`tc1 @ frame 100 = 00:01`, () => {
          assert.equal(hundredFrame, '00:01');
        });

        // TODO: random number of random time tests
      });
    });
  });
}
