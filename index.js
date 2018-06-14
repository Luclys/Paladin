Discord = require('discord.js');// Import the discord.js module
const client = new Discord.Client();// Create an instance of a Discord client
const config = require("./config.json");
const fs = require("fs");
const prefixe = config.prefixe;// Préfixe : défini sur "//"
// The ready event is vital, it means that your bot will only start reacting to information
client.on('ready', () => {
  console.log('Paladin Bot Initialisé avec succès.');
});

function shouldlisten(message) {
  if (!message.content.startsWith(prefixe) || message.author.bot) return false;
}

//Pings & Pongs
// Create an event listener for messages
client.on('message', message => {
  if (!message.content.startsWith(prefixe) || message.author.bot) return;
  // If the message is "ping"
  if (message.content.toUpperCase() === prefixe+'ping'.toUpperCase()) {
    // Send "pong" to the same channel
    message.channel.send('pong !');
  }
});
client.on('message', message => {
  if (!message.content.startsWith(prefixe) || message.author.bot) return;
  if (message.content.toUpperCase() === prefixe+'pong'.toUpperCase()) {
    message.channel.send('ping !');
  }
});
//Liste des commandes
client.on('message', message => {
  if (!message.content.startsWith(prefixe) || message.author.bot) return;
  // If the message is "ping"
  if (message.content.toUpperCase() === prefixe+'help'.toUpperCase()) {
    // Send "pong" to the same channel
    message.channel.send('pong !');
  }
});

//Testeur du message sur l'heure.
client.on('message', message => {
  //On prend le pattern "hh:mm", on utilise le regex: /\d{2}:\d{2}/
  let pattern_match_nojoin = message.content.match(/\d{2}:\d{2}/);
  //On vérifie la présence d'une occurence du pattern
  if (pattern_match_nojoin != null ) {
    let pattern_match = message.content.match(/\d{2}:\d{2}/).join();
    let hh = (pattern_match[0]+pattern_match[1]);
    let mm = (pattern_match[3]+pattern_match[4]);
    if (((pattern_match == (hh+":"+mm)) && ((hh == mm) || (hh == 23 && mm == 59)) ) && (hh%24 == hh)) {
      if ((message.createdAt.getHours() == hh ) && (message.createdAt.getMinutes() == mm )) {
        // If the message is "hh:mm" at "hh:mm:ss" where ss=mm=hh ex: "01:01" at "01:01:01"
        if (message.createdAt.getSeconds() == hh) {
          message.reply('Un perfect pour toi !');
        }
        // If the message is "01:01" at "01:01:00" or "01:01:59"
        else if ((message.createdAt.getSeconds() == '00') || (message.createdAt.getSeconds() == '59')) {
          message.reply('Waw, excellent !');
        }
        // If the message is "01:01" at "01:01:ss avec ss != 59, 00, 01"
        else  message.reply('Gg ! \:smiley:');
        }
          // If the message is "01:01" at "01:00"
        else if ((message.createdAt.getHours() == hh) && (message.createdAt.getMinutes() == ((mm)-1)) || (hh == 23 && mm == 59)  ) {
          let rep0 = 'Hahaha, dommage t\'as loupé de peu :p. Mais t\'en fais pas, on t\'en veut pas, on s\'en souviendra c\'est tout ! :p '+
                       '\n ...'+
                       '\n Ca veut dire t\'es qu\'une merde hein \:smiley:';
          let rep1 = 'it\'s too soon, U little piece of sh*t';
          let rep2 = 'Hahaha, noob.';
          let rep = [rep0,rep1,rep2]
          message.reply(rep[((Math.floor(Math.random() * (rep.length+1)))%(rep.length))]);
        }
        // If the message is "01:01" at "01:02"
      else if ((message.createdAt.getHours() == hh ) && (message.createdAt.getMinutes() == (((mm)-(-1))%24))) {
          let rep0 = 'Hahaha, dommage t\'as loupé de peu :p. Mais t\'en fais pas, on t\'en veut pas, on s\'en souviendra c\'est tout ! :p'+
          '\n ...'+
          '\n Ca veut dire t\'es qu\'une merde hein \:smiley:';
          let rep1 = 'it\'s too late, U little piece of sh*t';
          let rep2 = 'Hahaha, noob.';
          let rep3 = 'U suck noobie'
          let rep4 = 'TOO LATEEEE MOTHERFUCKEEER'
          let rep = [rep0,rep1,rep2,rep3,rep4]
          message.reply(rep[((Math.floor(Math.random() * (rep.length+1)))%(rep.length))]);
        }
      // If the message is "01:01" at ("XX:XX" != "01:01")
    else {
      message.reply('Nope.');
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

client.on('message', message => {
  if (!message.content.startsWith(prefixe) || message.author.bot) return;
  if (message.content.toUpperCase() === prefixe+'@random'.toUpperCase()){
    let guild_members_id = message.guild.members.keyArray();
    let alea_int = ((Math.floor(Math.random() * (message.guild.memberCount+1)))%(message.guild.memberCount));
    let alea_member = `<@${guild_members_id[alea_int]}>`;
    message.channel.send(alea_member);
  }
})

//afficher l'avatar de celui qui est @mentionné
client.on('message', message => {
  if (!message.content.startsWith(prefixe) || message.author.bot) return;
  if ((message.content.slice(2,8)).toUpperCase() == "AVATAR") {
    let member = message.mentions.members.first();
    message.delete('2000');
    if (member != null) return (message.reply(member.user.avatarURL))
    else return (message.reply(message.author.avatarURL));  // Send the user's avatar URL
    }
});


// ?????????????
client.on('message', message => {
  if (!message.content.startsWith(prefixe) || message.author.bot) return;
  // If the message is "ping"
  if (message.content.startsWith(prefixe+'t')) {
    // Send "pong" to the same channel
    // console.log(message.mentions.members);
    // console.log(message.mentions.members.values());
    console.log(message.mentions.members.first());
    message.channel.send(message.mentions.members.first());
  }
});

//Conneries pour le fun:

client.on('message', message => {
  if (message.author.id == '212672410367819776') {
    let random = (Math.floor(Math.random() * 101))
    if (random <= 2) return message.reply('Tg Jo, tu pues...');
  }
})
// Log your bot in
client.login(config.token);
