// че у тебя получилось бота запустить?
const easyvk = require('easyvk');
require('custom-env').env();

easyvk({
    access_token: process.env.TOKEN
  }).then(async (vk) => {
  	// user_id авторизованного аккаунта (по токену)
	// const me = vk.session.group_id

	// Обращаемся к методу messages.send с параметром user_id и message
	vk.call('messages.createChat', {
		user_ids: [15696325,230868199]
		title: 'Для тестов' // Текст сообщения, по мануалу ВКонтакте
	}).then(({ vkr: response }) => {

		// После выполнения запроса, ВКонтакте возвращает ответ
		console.log(response)

		// Получить полный ответ, а не только его часть response
		console.log(response.getFullResponse())
	}).catch((error) => {

		// Если произойдет ошибка при отправке запроса, она выводится в консоль
		console.log(error);

	})

}).catch(console.error)
