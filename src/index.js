//Библиотеки тут всякие
const _                 = require('underscore');
const { Bot }           = require('vk-bots');
const easyvk            = require('easyvk');
const request           = require('request');

// это для времени, тупа лень самому логику дней писать
const format            = require('date-fns/format');
const getDay            = require('date-fns/get_day');

const { Debugger }      = easyvk;

// пока не работает
const { Profile }       = require('./receivers/profile.js');

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
easyvk({
  access_token: process.env.TOKEN,
  debug: myDebugger,
  lang: ["ru", "en"][0]

}).then(vk => {
  
  // За-одно vk-bots авторизуем возможно тут лучше через что то одно авторизоваться т.к vk-bots это надстройка над easyvk
  // Нам нужен то только функционал всяких запросов .call .is 
  // надо короче подумать как лучше сделать
  
  let bot = new Bot({
      token: process.env.TOKEN // access_token вашей группы
  });
  
  bot.command('пр(и)?в(е)?т', async (message) => {
    // console.log(listAllProperties(message));
    // console.log(message.text);
    
    // Тоже не совсем понятно зачем делать запрос на страницу пользователя наверное 
    // чтобы узнать его имя, можно и объектом message обойтись   
    
    vk.call('users.get',{
        user_id: message.from_id
        },"GET").then(( { vkr: Response } ) => {

       // console.log(Response[0].first_name);
       message.reply(`Привет ${Response[0].first_name}! это бот для еаси, напиши ему \n "/расписание" и группу через пробел. \n например: /расписание 125`);   
     });
     // bot.addReceivers([Profile]);
  });
  
  bot.command('/расписание', async (message) => {
    // console.log(listAllProperties(message));
    var day_now = format(message.date*1000)  
    
    // Запрос к апи расписанию
    var opts = {
      method: 'GET',
      url: `https://eaca.azurewebsites.net/api/schedule/${message.text.split(" ")[1]}/odd/${getDay(day_now)}`, // Смотрим группи и номер дня
      body: {
        key: 'value'
      },
      json: true
    }
    
    request(opts, function (err, res, data) {
      if (err) throw err
      //
      // console.log(data);
      const this_day = [];
      // Заполняем день 
      data.lessons.forEach(function(day_item) {
        if(day_item.lessonName!=" "){
        this_day.push("⏱ " + day_item.time + "\n \v" + day_item.lessonName + "\n \n");
        }
      });
      
      //Присылаем расписос
      message.reply("День: "+data.day + '\n \n' + this_day.join(""));
    })
  });
  
  // Отвечаем на прочие запросы
  bot.command('.*', (message) => message.reply(`${_.sample([
      'О чем это вы? напишите мне Привет',
      'Ваш запрос не распознан. Я еще ничего не умею, напишите мне привет!','Я не знаю как ответить, напишите мне привет!'])} `));
  // bot.addReceivers([Profile]);
  
  bot.start();
  console.log('Бот запущен!');
})