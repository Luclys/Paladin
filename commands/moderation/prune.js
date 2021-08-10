const {ApplicationCommandOptionType} = require("discord-api-types/v9");

module.exports = {
    hidden: false,
    name: 'prune',
    aliases: [],
    description: 'Supprime jusqu\'à 99 messages.',
    options: [{
        name: 'quantité',
        type: ApplicationCommandOptionType.Integer,
        description: 'La quantité de message à supprimer (entre 1 et 99).',
        required: true,
    }],
    cooldown: 0,
    guildOnly: true,
    permissions: "MANAGE_MESSAGES",
    execute(interaction) {
        if (interaction.user.id === '206746457678544898') {
            return interaction.reply("❌ Banned User from this command.");
        }

        const amount = interaction.options.getInteger('quantité') + 1;

        if (amount <= 1 || amount > 100) {
            return interaction.reply({content: 'You need to input a number between 1 and 99.', ephemeral: true});
        }

        interaction.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            return interaction.reply({
                content: 'There was an error trying to prune messages in this channel!',
                ephemeral: true
            });
        });
    },
};
