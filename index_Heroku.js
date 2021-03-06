const os = require('os');
const fs = require("fs");
const Discord = require('discord.js');

const {prefix, authorUserID} = require('./config.json');

const client = new Discord.Client();// Create an instance of a Discord client
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


// The ready event is vital, it means that your bot will only start reacting to information
client.on('ready', () => {
    console.log(client.user.tag + ': Bot Initialisé avec succès.');
    client.users.fetch(authorUserID, true).then(user => user.send(`${client.user.tag} a été initialisé sur la machine : **${os.hostname()}**, sous l'os : ${os.platform}.`))
});


client.on('message', message => {
    //Ne commence pas par le préfixe, ou est écrit par un Bot: return
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // On cherche si la commande existe ou si c'est un alias
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
        console.log(`La commande ${commandName} est inconnue.`);
        return;
    }

    if (command.guildOnly && message.channel.type !== 'text') return message.reply("Je ne peux pas faire ça quand on n'est qu'entre nous choux <3");

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    } else {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply("Il m'est impossible d'accéder à votre demande, il y a eu une erreur ! :O");
    }
});


// Testeur du message sur l'heure.
client.on('message', message => {
    //On prend le pattern "hh:mm", on utilise le regex: /\d{2}:\d{2}/
    let pattern_match_nojoin = message.content.match(/\d{2}.\d{2}/);
    //On vérifie la présence d'une occurrence du pattern
    if (pattern_match_nojoin != null) {
        let diff_timezone = 1; // 2 = heure d'été 1 = heure d'hivers en FR

        let pattern_match = pattern_match_nojoin.join();
        let mess_hour = parseInt((pattern_match[0] + pattern_match[1]));// message_heures
        let mess_minute = parseInt(pattern_match[3] + pattern_match[4]);// message_minutes

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
});

// Server greeting
// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    let channel = member.guild.channels.find('id', `${member.guild.systemChannel.id}`)
    // Do nothing if the channel wasn't found on this server
    if (!channel) return; // Send the message, mentioning the member
    channel.send(`Bienvenue sur le serveur p\'tite merde, ah, non pardon, ${member}, ouais, bah... c\'est bien ce que je disais.`);
});

// Conneries pour le fun:
// Quel Savant ce Tristan !
client.on('message', message => {
    if (message.author.id === '254957788583821313') {
        let random = (Math.floor(Math.random() * 101));
        let random2 = (Math.floor(Math.random() * 101));
        if (random <= 1 && random2 <= 5) return message.reply(`Oh, waw, quel humain, il rivaliserait presque avec mon processeur !\n ... Calme toi, j\'ai dis **presque** hein D:`);
    }
});

// Log our bot in using the token from https://discord.com/developers/applications
// Crypter / décrypter le token ( déprécié, à changer...)
//https://gist.github.com/chris-rock/993d8a22c7138d1f0d2e#file-crypto-ctr-js
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = process.env.PSSWD;

function decrypt(text) {
    const decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

const token = decrypt(process.env.CRYPTED_TOKEN);
client.login(token);
