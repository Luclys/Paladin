module.exports = {
  hidden: true,
  name: 'exemple',
  aliases: ['expl','ex','try'],
  description: "Une commande d'exemple.",
  cooldown: 5,
  guildOnly:false,
  args: true,
  usage: '<arguments> <...>',
  execute(message, args) {
      message.reply(`Arguments: ${args}`);
  },
};
