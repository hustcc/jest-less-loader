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

    expect(transformer.process(less).code).toEqual('');
  });

  test('transformer less syntax', () => {
    const less = `
    html {
      body {
        background;
      }
    }
    `;

    expect(() => transformer.process(less)).toThrow();
  });
});
