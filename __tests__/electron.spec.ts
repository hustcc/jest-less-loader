// @ts-ignore
import transformer from '../src';
import './index.less';

describe('jest-less-loader', () => {
  test('import less', () => {
    expect(document.querySelectorAll('style')[0].innerHTML).toContain('background: red;');
  });

  test('transformer success', () => {
    const less = `
    html {
      body {
        background: green;
      }
    }
    `;

    expect(transformer.process(less).code).toEqual('');
    expect(document.querySelectorAll('style')[1].innerHTML).toContain('background: green;');
  });

  test('transformer less syntax', () => {
    const less = `
    html {
      body {
        background;
      }
    }
    `;

    expect(() => transformer.process(less)).not.toThrow();
  });
});
