// @ts-ignore
import transformer from '../src';
import './css.css';

describe('jest-less-loader', () => {
  test('import css', () => {
    expect(document.querySelectorAll('style')[0].innerHTML).toContain('antd');
  });
});
