// Тоже не совсем понятно зачем делать запрос на страницу пользователя наверное 
// чтобы узнать его имя, можно и объектом message обойтись или узнать че там вообще внутри него полезного есть

function HelloCommand(vk, message) {
    vk.call('users.get', { user_id: message.from_id }, "GET")
        .then(( { vkr: Response } ) => {

        // console.log(Response[0].first_name);
        message.reply(`Привет ${Response[0].first_name}! это бот для еаси, напиши ему \n "/расписание" и группу через пробел. \n например: /расписание 125`);   
    });
};

module.exports = HelloCommand;