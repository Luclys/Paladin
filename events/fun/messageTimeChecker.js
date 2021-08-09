module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message, client) {
        //On prend le pattern "hh:mm", on utilise le regex: /\d{2}:\d{2}/
        let pattern_match_nojoin = message.content.match(/\d{2}:\d{2}/);
        //On vérifie la présence d'une occurrence du pattern
        if (pattern_match_nojoin != null) {
            let diff_timezone = 2; // 2 = heure d'été 1 = heure d'hivers en FR

            let pattern_match = pattern_match_nojoin.join();
            let mess_hour = parseInt((pattern_match[0] + pattern_match[1]));// message_heures
            let mess_minute = parseInt(pattern_match[3] + pattern_match[4]);// message_minutes

            let messageDate = message.createdAt.getUTCDate();
            let serv_hour = ((message.createdAt.getHours() + diff_timezone) % 24);// serveur_heures
            let serv_minute = message.createdAt.getMinutes();// serveur_minutes
            let serv_second = message.createdAt.getSeconds();// serveur_secondes

            // Check if the message is xx:xx and xx < 24
            if (mess_hour === mess_minute && mess_hour < 24) {
                // check if the message is on time.
                if (serv_hour === mess_hour) {
                    if (serv_minute === mess_minute) {
                        // Seconds = same as hour
                        if (serv_second === mess_hour) {
                            message.reply('Un perfect pour toi !');
                            console.log("Parfait !! " + message.author.username + " à écrit " + mess_hour + ":" + mess_hour + " à " + mess_hour + ":" + mess_hour + ":" + serv_second);
                        }

                        // Seconds = 59 or 00
                        else if ((serv_second === 0) || (serv_second === 59)) {
                            message.reply('Waw, excellent !');
                            console.log("Excellent !! " + message.author.username + " à écrit " + mess_hour + ":" + mess_minute + " à " + serv_second + " seconde(s)");
                        }

                        // If the message is "01:01" on time
                        else {
                            message.reply('Gg ! \:smiley:');
                            console.log("GG ! " + message.author.username + " à écrit " + mess_hour + ":" + mess_minute + " à l'heure ! (s=" + serv_second + ")");
                        }
                    } else {
                        // If the message is too soon
                        if (serv_minute === (mess_minute - 1) || (serv_hour === 23 && serv_minute === 59)) {
                            let rep0 = 'Hahaha, dommage t\'as loupé de peu :p. Mais t\'en fais pas, on t\'en veut pas, on s\'en souviendra c\'est tout ! :p ' +
                                '\n ...' +
                                '\nÇa veut dire t\'es qu\'une merde hein \:smiley:';
                            let rep1 = 'it\'s too soon, U little piece of sh*t';
                            let rep2 = 'Hahaha, noob.';
                            let rep3 = 'Mais... pourquoi tu fais ça D: prends ton temps, t\'avais UNE MINUTE entière devant toi !';
                            let rep4 = 'Rien ne sert de courir, il faut partir à point !';
                            let rep5 = 'U suck noobie';
                            let rep = [rep0, rep1, rep2, rep3, rep4, rep5];
                            message.reply(rep[((Math.floor(Math.random() * (rep.length + 1))) % (rep.length))]);
                            console.log(message.author.username + " s'est trompé et a répondu une minute trop tôt ! (s=" + serv_second + " seconde(s)");
                        }
                        // If the message is too late
                        if (serv_minute === ((mess_minute + 1) % 24)) {
                            let rep0 = 'Hahaha, dommage t\'as loupé de peu :p. Mais t\'en fais pas, on t\'en veut pas, on s\'en souviendra c\'est tout ! :p' +
                                '\n ...' +
                                '\n Ca veut dire t\'es qu\'une merde hein \:smiley:';
                            let rep1 = 'it\'s too late, U little piece of sh*t';
                            let rep2 = 'Hahaha, noob.';
                            let rep3 = 'U suck noobie';
                            let rep4 = 'TOO LATEEEE MOTHERFUCKEEER';
                            let rep = [rep0, rep1, rep2, rep3, rep4];
                            message.reply(rep[((Math.floor(Math.random() * (rep.length + 1))) % (rep.length))]);
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