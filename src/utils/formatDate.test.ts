import { getFriendlyTime } from './formatDate';

describe('getFriendlyTime', () => {
  it('returns day, hours and minutes', () => {
    const seconds = 1550046;

    expect(getFriendlyTime(seconds)).toEqual('17D 22h 34m');
  });

  it('returns minutes only', () => {
    const seconds = 1550;

    expect(getFriendlyTime(seconds)).toEqual('25m');
  });
});
