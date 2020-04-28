import less from 'less';

interface TransformerResult {
  readonly code: string;
}

interface Transformer {
  process: (fileContent: string) => TransformerResult;
}

/**
 * transform less sync
 * @param content
 */
function transformLess(content: string): string {
  const data = content.replace(/^\uFEFF/, '');

  const options = { sync: true };

  let css = '';

  less.render(data, options, function(err, result) {
    if (err) throw err;
    css = result.css;
  });

  return css;
}

/**
 * inject style css into header
 * @param css
 */
function injectStyle(css: string): void {
  const head = document.getElementsByTagName('head')[0];

  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));

  head.appendChild(style);
}

/**
 * the transformer entry
 * @type {{process(*=): *}}
 */
module.exports = {
  process(fileContent: string, filePath: string): object {
    let css = fileContent;
    try {
      // if .less, transform, if .css, keep it
      css = filePath.endsWith('.less')
        ? transformLess(fileContent)
        : filePath.endsWith('.css')
        ? fileContent
        : fileContent;
    } catch (e) {
      // if throw, use file content
      css = fileContent;
      console.warn('jest-less-loader: process the file error.', { fileContent, filePath });
    } finally {
      // when running in nodejs env, will throw error.
      try {
        injectStyle(css);
      } catch (e) {
        // do nothing
      }
    }

    // no code for js module
    return {
      code: '',
    };
  },
} as Transformer;
