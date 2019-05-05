const fetch = require("node-fetch");

const format = require('date-fns/format');
const getDay = require('date-fns/get_day');

function ScheduleCommand(message) {
    var group_Id = message.text.split(" ")[1];
    var day_now = getDay(format(message.date * 1000));
    const additional_info = [];
    const this_day = [];

    if (day_now == 0) {
        additional_info.push("Сегодня выходной! \n");
    }

    fetch(`https://eaca.azurewebsites.net/api/schedule/${group_Id}/odd/${day_now}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            json.lessons.forEach(day => {
                if(day.lessonName!=" ") {
                    this_day.push("⏱ " + day.time + "\n \v" + day.lessonName + "\n \n");
                }
            });
            message.reply(additional_info + "День: " + json.day + '\n \n' + this_day.join(""));
        })
        .catch(function(e) {
            console.log('ошибочка(', e)
        })
};

module.exports = ScheduleCommand;