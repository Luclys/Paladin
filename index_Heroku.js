const fs = require("fs");
const Discord = require('discord.js');// Import the discord.js module

const {prefix} = require('./config.json');

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
  console.log(client.user.tag+': Bot Initialisé avec succès.');
  client.users.get("144177543145062400").send(`${client.user.tag} a été initialisé.`);
 });


 client.on('message', message => {
 	if (!message.content.startsWith(prefix) || message.author.bot) return;//Ne commence pas par le préfixe, ou est écrit par un Bot: return

 	const args = message.content.slice(prefix.length).split(/ +/);
 	const commandName = args.shift().toLowerCase();


  const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

  if (!command) {
    console.log(`La commande ${commandName} est inconnue.`);
    return;
   }

  if (command.guildOnly && message.channel.type !== 'text') return message.reply('Je ne peux pas faire ça quand on n\'est qu\'entre nous choux <3');


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
  }
  else {
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
 	}
 	catch (error) {
 		console.error(error);
 		message.reply('Il m\'est impossible d\'accéder à votre demande, il y a eu une erreur ! :O');
 	}
 });


//Testeur du message sur l'heure.
client.on('message', message => {
  //On prend le pattern "hh:mm", on utilise le regex: /\d{2}:\d{2}/
  let pattern_match_nojoin = message.content.match(/\d{2}:\d{2}/);
  //On vérifie la présence d'une occurence du pattern
  if (pattern_match_nojoin != null ) {
    let pattern_match = message.content.match(/\d{2}:\d{2}/).join();
    let m_hh = (pattern_match[0]+pattern_match[1]);// message_heures
    let m_mm = (pattern_match[3]+pattern_match[4]);//message_minutes
    let diff_timezone = 1;
    let s_hh = ((message.createdAt.getHours()+diff_timezone)%24);//serveur_heures
    let s_mm = message.createdAt.getMinutes();//serveur_minutes
    let s_ss = message.createdAt.getSeconds();//serveur_secondes
    if (((pattern_match == (m_hh+":"+m_mm)) && ((m_hh == m_mm) || (m_hh == 23 && m_mm == 59)) ) && (m_hh%24 == m_hh)) {
      if ((s_hh == m_hh ) && (s_mm == m_mm )) {
        // If the message is "hh:mm" at "hh:mm:ss" where ss=mm=hh ex: "01:01" at "01:01:01"
        if (s_ss == m_hh) {
          message.reply('Un perfect pour toi !');
          console.log("Parfait !! "+message.author.username + " à écrit "+ m_hh+":"+m_hh+" à "+m_hh+":"+m_hh+":"+m_hh);
        }
        // If the message is "01:01" at "01:01:00" or "01:01:59"
        else if ((s_ss == '00') || (s_ss == '59')) {
          message.reply('Waw, excellent !');
          console.log("Excellent !! "+message.author.username + " à écrit "+ m_hh+":"+m_mm+" à "+s_ss+" seconde(s)");
        }
        // If the message is "01:01" at "01:01:ss avec ss != 59, 00, 01"
        else  message.reply('Gg ! \:smiley:');
              console.log("GG ! "+message.author.username + " à écrit "+ m_hh+":"+m_mm+" à l'heure ! (s="+s_ss+")");
        }
          // If the message is "01:01" at "01:00"
        else if ((s_hh == m_hh) && (s_mm == ((m_mm)-1)) || (m_hh == 23 && m_mm == 59)  ) {
          let rep0 = 'Hahaha, dommage t\'as loupé de peu :p. Mais t\'en fais pas, on t\'en veut pas, on s\'en souviendra c\'est tout ! :p '+
                       '\n ...'+
                       '\n Ca veut dire t\'es qu\'une merde hein \:smiley:';
          let rep1 = 'it\'s too soon, U little piece of sh*t';
          let rep2 = 'Hahaha, noob.';
          let rep3 = 'Mais... pourquoi tu fais ça D: prends ton temps, t\'avais UNE MINUTE entière devant toi !';
          let rep4 = 'Rien ne sert de courir, il faut partir à point !';
          let rep5 = 'U suck noobie';
          let rep = [rep0,rep1,rep2,rep3,rep4,rep5];
          message.reply(rep[((Math.floor(Math.random() * (rep.length+1)))%(rep.length))]);
          console.log(message.author.username + " s'est trompé et a répondu une minute trop tôt !");
        }
        // If the message is "01:01" at "01:02"
      else if ((s_hh == m_hh ) && (s_mm == (((m_mm)-(-1))%24))) {
          let rep0 = 'Hahaha, dommage t\'as loupé de peu :p. Mais t\'en fais pas, on t\'en veut pas, on s\'en souviendra c\'est tout ! :p'+
          '\n ...'+
          '\n Ca veut dire t\'es qu\'une merde hein \:smiley:';
          let rep1 = 'it\'s too late, U little piece of sh*t';
          let rep2 = 'Hahaha, noob.';
          let rep3 = 'U suck noobie';
          let rep4 = 'TOO LATEEEE MOTHERFUCKEEER';
          let rep = [rep0,rep1,rep2,rep3,rep4];
          message.reply(rep[((Math.floor(Math.random() * (rep.length+1)))%(rep.length))]);
          console.log(message.author.username + " s'est trompé et a répondu une minute trop tard !");
        }
      // If the message is "01:01" at ("XX:XX" != "01:01")
    else {
      message.reply('Nope.');
      console.log(message.author.username + " s'est trompé et a reçu un nope !");
    }
  }
}
});

//Server greeting
// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  let channel = member.guild.channels.find('id', `${member.guild.systemChannel.id}`)
  // Do nothing if the channel wasn't found on this server
  if (!channel) return; // Send the message, mentioning the member
  channel.send(`Bienvenue sur le serveur p\'tite merde, ah, non pardon, ${member}, ouais, bah... c\'est bien ce que je disais.`);
});
// Jeux de Rôle sur Robert:


//Conneries pour le fun:
//Tg Jo, tu pues
client.on('message', message => {
  if (message.author.id == '212672410367819776') {
    let random = (Math.floor(Math.random() * 101))
    if (random <= 2) return message.channel.send('Tg Jo, tu pues...', { tts: true });
  }
})

//Quel Savant ce Jérémy !
client.on('message', message => {
  if (message.author.id == '368065417555476480') {
    let random = (Math.floor(Math.random() * 101))
    if (random <= 1) return message.channel.send(`Oh, waw, quel humain, il rivaliserait presque avec mon processeur !\n ... Calme toi, j\'ai dis **presque** hein D:`);
  }
})

// Log your bot in
// Crypter / décrypter le token ( déprécié, à changer...)
//https://gist.github.com/chris-rock/993d8a22c7138d1f0d2e#file-crypto-ctr-js
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = process.env.PSSWD;

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
const token = decrypt(process.env.CRYPTED_TOKEN);
client.login(token);
