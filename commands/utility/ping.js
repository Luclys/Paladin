module.exports = {
    hidden: false,
    name: 'ping',
    aliases: [],
    description: 'Commande ping.',
    cooldown: 2,
    guildOnly: false,
    permissions: '',
    execute(interaction) {
        return interaction.reply('Pong !');
    },
};
