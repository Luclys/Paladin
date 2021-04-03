module.exports = {
  name: 'jdrstart',
  aliases: ['jdrdebut', 'jdrdébut'],
  description: 'Initialise le début de la session de JDR',
  //cooldown: 3,
  guildOnly: true,
  permissions: '',
  args: false,
  usage: '',
  execute(message, args) {
    message.channel.send('Commande pour initialiser le début d\'une session de jdr non codée, à plus tard ;)');
  },
};
