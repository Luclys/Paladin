module.exports = {
  hidden: false,
  name: 'avatar',
  aliases: ['pdp','image','picture','photo'],
  description: "Afficher l'avatar de la personne mentionnée.",
  cooldown: 3,
  guildOnly:false,
  args: false,
  usage: '<arguments> <...>',
  execute(message, args) {
    let users = message.mentions.users;

    let ImageURLOptions = {};
    ImageURLOptions.format = "jpg"
    ImageURLOptions.dynamic = true
    ImageURLOptions.size = 4096

    if (users) {
      users.forEach(user => message.reply(user.displayAvatarURL(ImageURLOptions)));
    } else return (message.reply(message.author.displayAvatarURL(ImageURLOptions)));  // Send the user's avatar URL
  },
};
