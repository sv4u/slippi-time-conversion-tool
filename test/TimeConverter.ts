import assert from 'assert';
import TimeConverter from '../src/TimeConverter';

export function tc_tests() {
  describe('Time Converter Tests', () => {
    const fname = 'slippis/test.slp';

    describe('actual file with game check enabled', () => {
      const tc1 = new TimeConverter(fname, true);
      it(`$tc1 != null`, () => {
        assert.notEqual(tc1, null);
      });

      describe('#toFrames', () => {
        const zeroElapsed: number | undefined = tc1.toFrames('00:00');
        it(`tc1 @ time 00:00 elapsed = 0`, () => {
          assert.equal(zeroElapsed, 0);
        });

        const oneElapsed: number | undefined = tc1.toFrames('01:00');
        it(`tc1 @ time 01:00 elapsed = 3600`, () => {
          assert.equal(oneElapsed, 3600);
        });

        const twoElapsed: number | undefined = tc1.toFrames('02:00');
        it(`tc1 @ time 02:00 elapsed = 7200`, () => {
          assert.equal(twoElapsed, 7200);
        });

        const tenElapsed: number | undefined = tc1.toFrames('10:00');
        it(`tc1 @ time 10:00 elapsed = undefined`, () => {
          assert.equal(tenElapsed, undefined);
        });
      });

      describe('#toTime', () => {
        const zeroFrame: string | undefined = tc1.toTime('0');
        it(`tc1 @ frame 0 = 00:00`, () => {
          assert.equal(zeroFrame, '00:00');
        });
      });
    });
  });
}
