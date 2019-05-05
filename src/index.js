const _                 = require('underscore');
const { Bot }           = require('vk-bots');
const easyvk            = require('easyvk');
const request           = require('request');

var format              = require('date-fns/format');
var getDay              = require('date-fns/get_day');

const { Debugger }      = easyvk;

const { Profile }       = require('./receivers/profile.js');

let myDebugger = new Debugger();


///DEBUG function
function listAllProperties(o){     
    var objectToInspect;     
    var result = [];
    for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)){  
      result = result.concat(Object.getOwnPropertyNames(objectToInspect));  
    }
    return result; 
}

easyvk({
  access_token: process.env.TOKEN,
  debug: myDebugger
}).then(vk => {
  
  let bot = new Bot({
      token: process.env.TOKEN // access_token вашей группы
  });
  
  console.log(vk.session.app_id);
  
  
  bot.command('пр(и)?в(е)?т', async (message) => {
      // console.log(listAllProperties(message));
    console.log(message.text);
      
    vk.call('users.get',{
        user_id: message.from_id
        },"GET").then(( { vkr: Response } ) => {

  //   console.log(Response[0].first_name);
       message.reply(`Привет ${Response[0].first_name}! это бот для еаси, и пока что он мало чего может, но потом будет круто!`);   
     });
     bot.addReceivers([Profile]);

  });
  
  bot.command('расписос', async (message) => {
      // console.log(listAllProperties(message));
    // date.setTime(message.date);
    // console.log();
    // message.reply('пик');
    var day_now = format(message.date*1000)
    
    var opts = {
      method: 'GET',
      url: `https://eaca.azurewebsites.net/api/schedule/${message.text.split(" ")[1]}/odd/${getDay(day_now)}`,
      body: {
        key: 'value'
      },
      json: true
    }
    request(opts, function (err, res, data) {
      if (err) throw err
      //
      console.log(data);
      message.reply(data.day + '\n' + JSON.stringify(data.lessons));
    })
    
  });
  
  bot.command('.*', (message) => message.reply(`${_.sample([
      'О чем это вы? напишите мне Привет',
      'Ваш запрос не распознан. Я еще ничего не умею, напишите мне привет!','Я не знаю как ответить, напишите мне привет!'])} `));
  // bot.addReceivers([Profile]);
  bot.start();

  console.log('Бот запущен!');
})

