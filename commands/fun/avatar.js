const {ApplicationCommandOptionType} = require("discord-api-types/v9");

module.exports = {
    hidden: false,
    name: 'avatar',
    aliases: ['pdp', 'image', 'picture', 'photo'],
    description: "Afficher l'avatar de la personne mentionnée.",
    options: [{
        name: 'utilisateur',
        type: ApplicationCommandOptionType.User,
        description: 'Utilisateur ciblé.',
        required: true,
    }],
    cooldown: 3,
    guildOnly: false,
    permissions: '',
    execute(interaction) {
        const user = interaction.options.getUser('utilisateur');

        let ImageURLOptions = {};
        ImageURLOptions.format = "jpg"
        ImageURLOptions.dynamic = true
        ImageURLOptions.size = 4096

        return interaction.reply(user.displayAvatarURL(ImageURLOptions));
    },
};
