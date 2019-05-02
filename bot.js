const {
    Bot,
    Keyboard,
    Button,
    Receiver,
    Command
} = require('vk-bots');

// const Profile = new Receiver('profile');

// Profile.command('баланс', (message) => {
//     // Вы можете выводить баланс, например, из базы данных
//     message.reply('Ваш баланс: ' + 0);
// });

// // Даем знать боту, что у нас есть такой приемник
// bot.addReceivers([Profile]);

async function main() {

    let bot = new Bot({
        token: process.env.TOKEN // access_token вашей группы
    });

    let botKeyboard = new Keyboard([
        [
            new Button('Профиль', Button.GREEN)
        ],
        [
            new Button('Отправить мем', Button.BLUE),
        ]
    ]);
    // botKeyboard.oneTime(false); // Тут неодноразовая
    

    bot.command('пр(и)?в(е)?т', async (message) => { // jshint ignore:line
        console.log('Новое сообщение!'); // jshint ignore:line
        message.reply('Привет! у тебя есть для меня мемы?');
        bot.keyboard(botKeyboard);

    }); // jshint ignore:line


    const Profile = new Receiver('profile');
    


    let profileCommand = new Command({
        match: 'Профиль',
        handler: (_, history) => {
        history.go('profile')
        },
        buttons: [botKeyboard.rows[0][0]] // здесь мы указываем массив кнопок
        // при нажатии на одну из них, произойдет выполнение команды
    });


    // Мы можем указать, что клавиаутура одноразовая (на одно сообщение)
    // botKeyboard.oneTime(false); // Тут неодноразовая

    Profile.command('долги', (message) => {
        message.reply('У вас: ' + 0 + " долгов"); // Вы можете выводить баланс, например, из базы данных
    });

    Profile.onInit((message) => {
        message.reply('Это ваш профиль!\n\nЧтобы посмотреть сколько у вас долгов, введите команду "долги", чтобы вернуться в главное меню, введите команду "меню"');
    });

    Profile.command('меню', (_, history) => {
        history.back(); // Возвращаемся на один приемник назад
    });

    // bot.command('профиль', (_, history) => {
    //     history.go('profile');
    // });
    
    bot.onInit((message) => {
        message.reply('Вы в меню');
    })
 
    bot.addCommand(profileCommand);
    bot.addReceivers([Profile]);
    // Запускаем бота
    let connection = await bot.start();  
    console.log('Бот запущен!');


}


main();