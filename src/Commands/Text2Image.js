// const fs       = require('fs');
const text2png = require('text2png');
var fs = require('fs');
const path = require('path')


async function Text2Image(vk,vkr,url, message) {
  // var text  = message.text;
  var text  = message.text;

  // var generate_image = text2png(text, {color: 'blue', output : "buffer"}); // Image: dataURL buffer stream canvas
  fs.writeFileSync('./image/out.png', text2png(`${text}`, {color: 'blue'}));
  
	const server = vk.uploader
  var field    = 'photo';
  const filePath = path.join('./image', 'out.png')
  url = url.response.upload_url

  //console.log(generate_image);
  //console.log(server);
  
  let  {vkr: fileData} = await (server.uploadFile(url, filePath, field, {}));

  //Сохраняем фотографию, чтобы дальше ее прикреплять к сообщениям или куда-то еще

  fileData = await( vk.call('photos.saveMessagesPhoto', fileData) );
  // console.log(fileData);
  fileData = fileData.vkr[0];
  
	const attahcments = [
	  	`photo${fileData.owner_id}_${fileData.id}_${fileData.access_key}`
	]
  
  console.log(fileData);
  
  message.reply({text:`Написал ${text}`,
    attachments: attahcments}); //не так не пойдет photo-166176986_456239083 [fileData]
  
}

module.exports = Text2Image;

