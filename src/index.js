<<<<<<< HEAD
require('custom-env').env();

// Библиотеки тут всякие
const { Bot }               = require('vk-bots');
const easyvk                = require('easyvk');

// Объявляем комманды
const ScheduleCommand       = require('./Commands/ScheduleCommand');
const HelloCommand          = require('./Commands/HelloComands');
const UndefinedCommand      = require('./Commands/UndefinedCommand');

=======
//Библиотеки тут всякие
require('custom-env').env();
const _ = require('underscore');
const {
  Bot
} = require('vk-bots');
const easyvk = require('easyvk');
const request = require('request');

// это для времени, тупа лень самому логику дней писать
const format = require('date-fns/format');
const getDay = require('date-fns/get_day');

const {
  Debugger
} = easyvk;

// пока не работает
const {
  Profile
} = require('./receivers/profile.js');

let myDebugger = new Debugger();

///DEBUG function
// function listAllProperties(o){     
//     var objectToInspect;     
//     var result = [];
//     for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)){  
//       result = result.concat(Object.getOwnPropertyNames(objectToInspect));  
//     }
//     return result; 
// }

// Авторизуемся через easyvk
>>>>>>> cb5f281b919c7c2b499451603d4d40be2084d63c
easyvk({
  access_token: process.env.TOKEN,
  lang: ["ru", "en"][0]
}).then(vk => {
<<<<<<< HEAD
=======

>>>>>>> cb5f281b919c7c2b499451603d4d40be2084d63c
  // За-одно vk-bots авторизуем возможно тут лучше через что то одно авторизоваться т.к vk-bots это надстройка над easyvk
  // Нам нужен то только функционал всяких запросов .call .is 
  // надо короче подумать как лучше сделать
  let bot = new Bot({
<<<<<<< HEAD
      token: process.env.TOKEN
  });
  
  bot.command('пр(и)?в(е)?т', async (message) => HelloCommand(vk, message));
  bot.command('/расписание', async (message) => ScheduleCommand(message));
  bot.command('.*', async (message) => UndefinedCommand(message));
=======
    token: process.env.TOKEN // access_token вашей группы
  });

  bot.command('пр(и)?в(е)?т', async (message) => {
    // console.log(listAllProperties(message));
    // console.log(message.text);

    // Тоже не совсем понятно зачем делать запрос на страницу пользователя наверное 
    // чтобы узнать его имя, можно и объектом message обойтись или узнать че там вообще внутри него полезного есть

    vk.call('users.get', {
      user_id: message.from_id
    }, "GET").then(({
      vkr: Response
    }) => {

      // console.log(Response[0].first_name);
      message.reply(`Привет ${Response[0].first_name}! это бот для еаси, напиши ему \n /расписание и группу через пробел. \n например: /расписание 125`);
    });
    // bot.addReceivers([Profile]);
  });

  bot.command('/расписание', async (message) => {
    // console.log(listAllProperties(message));
    var day_now = format(message.date * 1000); //Получаем время из диалога что бы узнать какой сейчас день
    var additional_info = [];

    if (getDay(day_now) == 0) {
      additional_info.push("Сегодня выходной! \n");
    };
    // Запрос к апи расписанию
    var opts = {
      method: 'GET',
      url: `https://eaca.azurewebsites.net/api/schedule/${message.text.split(" ")[1]}/odd/${getDay(day_now)}`, // Смотрим группи и номер дня
      body: {
        key: 'value'
      },
      json: true
    };

    request(opts, function (err, res, data) {
      if (err) throw err
      //
      // console.log(data);
      const this_day = [];
      // Заполняем день 
      data.lessons.forEach(function (day_item) {
        if (day_item.lessonName != " ") {
          this_day.push("⏱ " + day_item.time + "\n \v" + day_item.lessonName + "\n \n");
        };
      });

      //Присылаем расписос
      message.reply(additional_info + "День: " + data.day + '\n \n' + this_day.join(""));
    });
  });

  // Отвечаем на прочие запросы
  bot.command('.*', (message) => message.reply(`${_.sample([
      'О чем это вы? напишите мне Привет',
      'Ваш запрос не распознан. Я еще ничего не умею, напишите мне привет!','Я не знаю как ответить, напишите мне привет!'])} `));
  // bot.addReceivers([Profile]);
>>>>>>> cb5f281b919c7c2b499451603d4d40be2084d63c

  bot.start();
  console.log(`Бот ${vk.session.group_name} запущен!`);
})
