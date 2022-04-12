import TimeConverter from './TimeConverter';

const fname = 'slippis/test.slp';
const tc: TimeConverter = new TimeConverter(fname);

console.log(tc.toFrames('00:00'));
console.log(tc.toFrames('1:23'));
console.log(tc.toFrames('45:67'));

console.log(tc.toTime('0'));
console.log(tc.toTime('12'));
console.log(tc.toTime('345'));
console.log(tc.toTime('6789'));
console.log(tc.toTime('01234'));
console.log(tc.toTime('567890'));
