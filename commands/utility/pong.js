module.exports = {
    hidden: false,
    name: 'pong',
    aliases: [],
    description: 'Pong!',
    cooldown: 2,
    guildOnly: false,
    permissions: '',
    args: false,
    usage: '',
    execute(message, args) {
        message.channel.send('Ping.');
    },
};
