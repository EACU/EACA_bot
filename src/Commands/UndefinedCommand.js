const _ = require('underscore');

function UndefinedCommand(message) {
    message.reply(`${_.sample([
        'О чем это вы? напишите мне Привет',
        'Ваш запрос не распознан. Я еще ничего не умею, напишите мне привет!','Я не знаю как ответить, напишите мне привет!'
    ])} `)
};

module.exports = UndefinedCommand;