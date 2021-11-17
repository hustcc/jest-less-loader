// @ts-ignore
import transformer from '../src';
import path from 'path';
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

  test('transform less syntax with import', () => {
    const less = `
      @import "./variable.less";
      .test{
        color: @blue;
        padding: @size;
      }
    `;

    expect(() => transformer.process(less, path.join(__dirname, 'index.less'))).not.toThrow();
  });
});
