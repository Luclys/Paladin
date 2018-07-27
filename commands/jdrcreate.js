module.exports = {
	hidden:false,
  name: 'jdrcreate',
  aliases: ['jdrnew', 'jdrc'],
	description: 'Dans le channel actuel: créer un nouveau message d\'info JDR s\'il n\'a pas déjà été créé, ou une nouvelle campagne de JDR',
  //cooldown: 3,
  guildOnly: true,
  args: false,
  usage: '',
  execute(message, args) {
    message.channel.send('Commande non codée, à plus tard ;)');
  },
};
