const http = require('http');
const fs = require('fs');

const file = fs.createWriteStream("src/font/PT_Sans.ttf");
const request = http.get("http://cdn.glitch.com/48c8d8e3-8ca0-42ee-8e5b-f2984d1bc648%2FPT_Sans-Web-Regular.ttf?1557103745830", function(response) {
  response.pipe(file);
});
