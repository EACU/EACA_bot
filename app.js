require('custom-env').env();

const { Bot } = require('vk-bots');
const { Profile } = require('./Receivers/Profile/ProfileReceivers');


let bot = new Bot({
    token: process.env.TOKEN // access_token вашей группы
});

bot.command('пр(и)?в(е)?т', async (message) => {
    console.log('Новое сообщение! ' + message);
    message.reply('Привет! у тебя есть для меня мемасы?');
});

bot.addReceivers([Profile]);
bot.start();

console.log('Бот запущен!');

