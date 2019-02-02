const path = require('path');
const fs = require('fs');

const file = fs.readFileSync(path.resolve(__dirname, './destyle.css'));
const result = file.toString().replace(/\/\*([\s\S\r]+?)\*\//g, (match, text) => {
  return text.split('\n').map(line => `// ${line.trim()}`).join('\n');
});

fs.writeFileSync('destyle.scss', result);
fs.writeFileSync('destyle.styl', result);
