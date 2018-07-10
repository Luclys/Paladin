module.exports = {
	hidden:false,
  name: '@random',
  aliases: ['@r'],
  description: 'Renvoie un membre aléatoire de la guilde.',
  cooldown: 0,
  guildOnly: false,
  args: false,
  usage: '',
  execute(message, args) {
    let guild_members_id = message.guild.members.keyArray();
    let alea_int = ((Math.floor(Math.random() * (message.guild.memberCount+1)))%(message.guild.memberCount));
    let alea_member = `<@${guild_members_id[alea_int]}>`;
    message.channel.send(alea_member);
  },
};
