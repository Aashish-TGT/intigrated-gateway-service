const fs = require('fs');
const ejs = require('ejs');
const sanitizeHtml = require('sanitize-html');

module.exports = async function render(templatePath, data) {
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  const html = await ejs.render(templateContent, data, { async: true });
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      '*': ['style', 'class'],
      'img': ['src']
    }
  });
};
