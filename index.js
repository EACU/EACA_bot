require('custom-env').env();

const easyvk = require('easyvk');
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main (vk) {
	console.log(vk.session);
	// vk.call("wall.post", {
	// 	owner_id: process.env.EACA_MEMES,
	// 	from_group: 1,
	// 	signed: 0,
	// 	message: `
	// 	Ну приветики
	// 	`,
	// }, "POST")
	vk.call("messages.createChat", {
		user_ids: [15696325,230868199,-166176986],
		title: 'Для тестов',
	}, "POST")

}

async function logInWith2Auth (params) {
  return new Promise((_2faNeed) => {

	function relogIn (_2faCode = "") {

	  if (_2faCode) params.code = _2faCode

	  easyvk(params).then(main).catch((err) => {

		if (!err.easyvk_error) {
		  if (err.error_code == "need_validation") {
			_2faNeed({
			  err: err,
			  relogIn: relogIn
			});
		  }

		}

	  })
	}

	relogIn()

  })
}

logInWith2Auth({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  reauth: true,
}).then(({err: error, relogIn}) => {

  console.log(error.validation_type);

  rl.question(error.error + " ", (answer) => {

	let code = answer;
	relogIn(code);

	rl.close();

  });

})
