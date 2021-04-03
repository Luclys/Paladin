module.exports = {
    hidden: false,
    name: 'avatar',
    aliases: ['pdp', 'image', 'picture', 'photo'],
    description: "Afficher l'avatar de la personne mentionnée.",
    cooldown: 3,
    guildOnly: false,
    permissions: '',
    args: false,
    usage: '<arguments> <...>',
    execute(message) {
        let users = message.mentions.users;

        let ImageURLOptions = {};
        ImageURLOptions.format = "jpg"
        ImageURLOptions.dynamic = true
        ImageURLOptions.size = 4096

        if (users.size !== 0) {
            users.forEach(user => message.reply(user.displayAvatarURL(ImageURLOptions)));
        } else message.reply(message.author.displayAvatarURL(ImageURLOptions));// Send the author's avatar URL
    },
};
