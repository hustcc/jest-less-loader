// @ts-ignore
import transformer from '../src';
import './index.less';

describe('jest-less-loader', () => {
  test('transformer success', () => {
    const less = `
    html {
      body {
        background: green;
      }
    }
    `;

    expect(transformer.process(less).code).toBe('');
  });

  test('transformer less syntax', () => {
    const less = `
    html {
      body {
        background;
      }
    }
    `;

    // only warn, not throw
    expect(() => transformer.process(less)).not.toThrow();
  });
});
