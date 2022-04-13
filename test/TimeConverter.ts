import assert from 'assert';
import TimeConverter from '../src/TimeConverter';

export function null_tc_tests() {
  describe('Time Converter Tests', () => {
    const fname = 'slippis/test.slp';
    const tc1 = new TimeConverter(fname);

    it('invoking TimeConverter on an actual file should work', () => {
      assert.notEqual(tc1, null);
    });
  });
}
