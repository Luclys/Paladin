module.exports = {
    hidden: false,
    name: 'random',
    aliases: ['@r', '@rand'],
    description: 'Renvoi un membre aléatoire de la guilde.',
    cooldown: 0,
    guildOnly: true,
    permissions: '',
    execute(interaction) {
        interaction.guild.members.fetch().then(gmbrs => {
                interaction.reply("Le membre aléatoirement choisi est : " + gmbrs.randomKey());
            }
        );
    },
};
