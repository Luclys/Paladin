module.exports = {
    hidden: false,
    name: 'ping',
    aliases: [],
    description: 'Commande ping.',
    cooldown: 2,
    guildOnly: false,
    permissions: '',
    args: false,
    usage: '',
    execute(message, args) {
        message.channel.send('Pong !');
    },
};
