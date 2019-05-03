const { Keyboard, Button, Receiver, Command } = require('vk-bots');

const Profile = new Receiver('profile');

const profileKeyboard = new Keyboard([
    [
        new Button('Профиль', Button.GREEN)
    ],
    [
        new Button('Долги', Button.BLUE),
    ],
    [
        new Button('что-то ещё', Button.RED),
    ]
]);

Profile.keyboard(profileKeyboard);

Profile.addCommand(new Command({
    match: 'Профиль',
    handler: (_, history) => {
        history.go('profile')
    },
    buttons: [profileKeyboard.rows[0][0]]
}));

Profile.onInit((message) => {
    message.reply('Инит Профиля');
});

module.exports.Profile = Profile;
  