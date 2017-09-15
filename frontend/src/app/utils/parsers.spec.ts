import {Utils} from './parsers';

describe('parseLinkedInId', () => {

  it('LinkedIn id', () => {
    const input = 'john-doe';
    const expected = 'john-doe';
    const result = Utils.parseLinkedInId(input);
    expect(result).toBe(expected);
  });

  it('LinkedIn url', () => {
    const input = 'https://www.linkedin.com/in/john-doe/';
    const expected = 'john-doe';
    const result = Utils.parseLinkedInId(input);
    expect(result).toBe(expected);
  });

  it('Special characters', () => {
    const input = 'https://www.linkedin.com/in/john-n%C3%B8rgaard-doe-472927/';
    const expected = 'john-n%C3%B8rgaard-doe-472927';
    const result = Utils.parseLinkedInId(input);
    expect(result).toBe(expected);
  });

  it('Query parameters', () => {
    const input = 'https://www.linkedin.com/in/john-doe/?param1=value1&param2=value2';
    const expected = 'john-doe';
    const result = Utils.parseLinkedInId(input);
    expect(result).toBe(expected);
  });

  it('Query parameters without leading slash', () => {
    const input = 'https://www.linkedin.com/in/john-doe?param1=value1&param2=value2';
    const expected = 'john-doe';
    const result = Utils.parseLinkedInId(input);
    expect(result).toBe(expected);
  });
});
