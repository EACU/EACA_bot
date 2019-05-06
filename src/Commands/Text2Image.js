const text2png = require('text2png');
var fs = require('fs');
const path = require('path')
const _ = require('underscore');
var wrap = require('word-wrap');


// https://medium.com/dailyjs/how-to-prevent-your-node-js-process-from-crashing-5d40247b8ab2
// Все равно крашашится почему то( 

async function Text2Image(vk,vkr,url, message) {
  // var text  = message.text;
  var text  = message.text.split(" "); //массив из текста сообщений
  // console.log(text);
  
  text = _.rest(text).join(" ");  // удаляется команда и обратно добавляем пробелы
  
  const filePath = path.join('./image',
                             'out.png'); //Путь к будущему изображению
  
  text = wrap(text,{width: 45,
                    trim: true,
                    // cut: true
                    }); // wrap текста
  
  console.log(text);  
  
  text = text2png(text, {color: '#001538', 
                         padding: 20,
                         lineSpacing: 3,
                         font: '30px PT_Sans',
                         localFontPath: './src/font/PT_Sans.ttf',
                         localFontName: 'PT_Sans'}); //Cообщение в виде изображения 
                                                     // output: dataURL buffer stream canvas
  
  fs.writeFile(filePath, text,(err) => {
  if (err) throw err;                        // Записываем изображение в файл
  console.log('Записано изображениеd в '+ filePath); 
  });
  
	const server = vk.uploader;
  url = url.response.upload_url;
  
  // console.log(filePath);
  // console.log(url);
  // console.log(server);
  
  let  {vkr: fileData} = await (server.uploadFile(url, filePath, 'photo', {})); //Загружаем изображение на сервер и получаем его
  
  //Удаляем изображение. незнаю зачем, но так стало меньше глючить
  fs.unlinkSync(filePath);
  console.log('Изображение удалено');
  
  //Сохраняем изображение, чтобы дальше ее прикрепить к ответу
  fileData = await( vk.call('photos.saveMessagesPhoto', fileData) );
  // console.log(fileData);
  fileData = fileData.vkr[0];
  // console.log(fileData);
  const attahcments = [
	  	`photo${fileData.owner_id}_${fileData.id}_${fileData.access_key}`
	]
  
  // console.log(fileData); //тут я пиво все выпил(
  
  message.reply({text:``, //`Написал ${text}` 
    attachments: attahcments}); //отправляем изображение как файл он кста сжимается в jpg 
}

module.exports = Text2Image;
