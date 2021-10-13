module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message, client) {
        //On prend le pattern "hh:mm", on utilise le regex: /\d{2}:\d{2}/
        let pattern_match_nojoin = message.content.match(/\d{2}:\d{2}/);
        //On vérifie la présence d'une occurrence du pattern
        if (pattern_match_nojoin != null) {
            let pattern_match = pattern_match_nojoin.join();
            
            let mess_hour = parseInt((pattern_match[0] + pattern_match[1]));// message_heures
            let mess_minute = parseInt(pattern_match[3] + pattern_match[4]);// message_minutes

            let serv_hour = message.createdAt.getHours();// serveur_heures
            let serv_minute = message.createdAt.getMinutes();// serveur_minutes
            let serv_second = message.createdAt.getSeconds();// serveur_secondes

            // Check if the message is xx < 24 and xx:xx
            if (mess_hour < 24 && mess_hour === mess_minute) {
                // check if the message is on time.
                if (serv_hour === mess_hour) {
                    if (serv_minute === mess_minute) {
                        // Seconds = same as hour
                        if (serv_second === mess_hour) {
                            message.reply(mess_hour + ":" + mess_hour + ":" + serv_second + ' ? Triplette ?! Un perfect pour toi !');
                            console.log("Parfait !! " + message.author.username + " à écrit " + mess_hour + ":" + mess_hour + " à " + mess_hour + ":" + mess_hour + ":" + serv_second);
                        }

                        // Seconds = 59 or 00
                        else if ((serv_second === 0) || (serv_second === 59)) {
                            message.reply('Waw, excellent ! Quelle ponctualité très exactement à ' + serv_second + 's !');
                            console.log("Excellent !! " + message.author.username + " à écrit " + mess_hour + ":" + mess_minute + " à " + serv_second + " seconde(s)");
                        }

                        // If the message is "01:01" on time
                        else {
                            message.reply('GG ! \:smiley:');
                            console.log("GG ! " + message.author.username + " à écrit " + mess_hour + ":" + mess_minute + " à l'heure ! (s=" + serv_second + ")");
                        }
                    } else {
                        // If the message is too soon
                        let possibleResponses = [];
                        possibleResponses.push('Hahaha, dommage t\'as loupé de peu :p. Mais t\'en fais pas, on t\'en veut pas, on s\'en souviendra c\'est tout ! :p ' +
                            '\n ...' +
                            '\nÇa veut dire t\'es qu\'une merde hein \:smiley:.');
                        possibleResponses.push('Hahaha, noob.');
                        possibleResponses.push('U suck noobie.');
                        possibleResponses.push('if(notTheRightHour) then[InsulteDesDaronnes]');

                        if (serv_minute === (mess_minute - 1) || (serv_hour === 23 && serv_minute === 59)) {
                            possibleResponses.push('it\'s too soon, U little piece of sh*t');
                            possibleResponses.push('Mais... pourquoi tu fais ça D: prends ton temps, t\'avais UNE MINUTE entière devant toi !');
                            possibleResponses.push('Rien ne sert de courir, il faut partir à point !');

                            message.reply(possibleResponses[((Math.floor(Math.random() * (possibleResponses.length + 1))) % (possibleResponses.length))]);
                            console.log(message.author.username + " s'est trompé et a répondu une minute trop tôt ! (s=" + serv_second + " seconde(s)");
                        }
                        // If the message is too late
                        if (serv_minute === ((mess_minute + 1) % 24)) {
                            possibleResponses.push('it\'s too late, U little piece of sh*t');
                            possibleResponses.push('TOO LATEEEE MOTHERFUCKEEER');
                            message.reply(possibleResponses[((Math.floor(Math.random() * (possibleResponses.length + 1))) % (possibleResponses.length))]);
                            console.log(message.author.username + " s'est trompé et a répondu une minute trop tard ! (s=" + serv_second + " seconde(s)");
                        }
                    }
                }
                // If the message is not at the right time
                else {
                    message.reply('Nope.');
                    console.log(message.author.username + " s'est trompé et a reçu un nope ! (s=" + serv_second + " seconde(s)");
                }
            }
        }
    },
};
