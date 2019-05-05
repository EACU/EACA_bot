
const { Bot } = require('vk-bots');
const easyvk = require('easyvk');

// Объявляем комманды
const ScheduleCommand       = require('./Commands/ScheduleCommand');
const HelloCommand          = require('./Commands/HelloComands');
const UndefinedCommand      = require('./Commands/UndefinedCommand');

easyvk({
  access_token: process.env.TOKEN,
  lang: ["ru", "en"][0]
}).then(vk => {
  // За-одно vk-bots авторизуем возможно тут лучше через что то одно авторизоваться т.к vk-bots это надстройка над easyvk
  // Нам нужен то только функционал всяких запросов .call .is 
  // надо короче подумать как лучше сделать
  let bot = new Bot({
      token: process.env.TOKEN
  });
  
  bot.command('пр(и)?в(е)?т', async (message) => HelloCommand(vk, message));
  bot.command('/расписание', async (message) => ScheduleCommand(message));
  bot.command('.*', async (message) => UndefinedCommand(message));

  bot.start();
  console.log(`Бот ${vk.session.group_name} запущен!`);
})
