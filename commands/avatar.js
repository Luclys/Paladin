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
    let member = message.mentions.members.first();
    // message.delete('2000');
    if (member != null) return (message.reply(member.user.avatarURL))
    else return (message.reply(message.author.avatarURL));  // Send the user's avatar URL
  },
};
