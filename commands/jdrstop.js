module.exports = {
  name: 'jdrstop',
  aliases: ['jdrfin', 'jdrend'],
  description: 'Termine la session de JDR actuellement en cours.',
  //cooldown: 3,
  guildOnly: true,
  args: false,
  usage: '',
  execute(message, args) {
    message.channel.send('Commande pour terminer une session de jdr non codée, à plus tard ;)');
  },
};
