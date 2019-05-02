require('custom-env').env();

console.log(process.env.TOKEN);
var fs = require('fs');
var text2png = require('text2png');
fs.writeFileSync('out.png', text2png('Hello!', {color: 'black'}));
