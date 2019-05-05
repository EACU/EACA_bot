
const { Bot } = require('vk-bots');
const easyvk = require('easyvk');

// Объявляем комманды
const ScheduleCommand       = require('./Commands/ScheduleCommand');
const HelloCommand          = require('./Commands/HelloComands');
const UndefinedCommand      = require('./Commands/UndefinedCommand');
const Text2Image            = require('./Commands/Text2Image');

easyvk({
  access_token: process.env.TOKEN,
  lang: ["ru", "en"][0],
  utils: {
	  uploader: true
  }
  }).then(vk => {

    //Получаем URL для загрузки изображений
      return vk.uploader.getUploadURL(
    'photos.getMessagesUploadServer', {}, true
    )
  })
  .then(async ({vk, url, vkr}) => {
  
  // За-одно vk-bots авторизуем возможно тут лучше через что то одно авторизоваться т.к vk-bots это надстройка над easyvk
  // Нам нужен то только функционал всяких запросов .call .is 
  // надо короче подумать как лучше сделать
  let bot = new Bot({
      token: vk.session.access_token
  });

  
  bot.command('пр(и)?в(е)?т', async (message) => HelloCommand(vk, message));
  bot.command('/расписание', async (message) => ScheduleCommand(message));
  bot.command('/написать', async (message) => Text2Image(vk,vkr,url, message));
  
  
  bot.command('.*', async (message) => UndefinedCommand(message));

  bot.start();
  // console.log(`TOKEN: ${vk.session.access_token}`);
  console.log(`Бот ${vk.session.group_name} запущен!`);
})
