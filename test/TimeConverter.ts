import assert from 'assert';
import TimeConverter from '../src/TimeConverter';

export function null_tc_tests() {
  describe('Time Converter Tests', () => {
    const fname = 'slippis/test.slp';
    const tc1 = new TimeConverter(fname);
    const tc2 = new TimeConverter(fname, false);
    const tc3 = new TimeConverter(null, false);

    it('invoking TimeConverter on an actual file should work', () => {
      assert.notEqual(tc1, null);
    });

    it('invoking TimeConverter on an actual file with no file check should work', () => {
      assert.notEqual(tc2, null);
    });
    it('invoking TimeConverter on null should work', () => {
      assert.notEqual(tc3, null);
    });
  });
}
