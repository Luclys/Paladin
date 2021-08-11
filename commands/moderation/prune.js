const {ApplicationCommandOptionType} = require("discord-api-types/v9");
const {MessageActionRow, MessageButton} = require("discord.js");

module.exports = {
    hidden: false,
    name: 'prune',
    aliases: [],
    description: 'Supprime jusqu\'à 100 messages.',
    options: [{
        name: 'quantité',
        type: ApplicationCommandOptionType.Integer,
        description: 'La quantité de message à supprimer (entre 1 et 100).',
        required: true,
    }],
    cooldown: 0,
    guildOnly: true,
    permissions: "MANAGE_MESSAGES",
    execute(interaction) {
        if (interaction.user.id === '206746457678544898') {
            return interaction.reply("❌ Banned User from this command. (Sorry not sorry :p)");
        }

        const amount = interaction.options.getInteger(this.options[0].name);

        if (amount > 100) {
            return interaction.reply({content: 'Hé ho, vous voulez pas tout effacer non plus, un peu de sérieux... Vous devez entrer un nombre entre 1 et 100.'});
        }
        if (amount <= 0) {
            return interaction.reply({
                content: "Bah toi alors t'es clairement pas éclairé à tous les étages... tu veux supprimer " +
                    amount + " messages qu'est-ce que tu viens m'réveiller pour ça là ?!"
            });
        }

        interaction.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            return interaction.reply({content: "Arf, Discord c'est tout cassé :/ Il y a eu une erreur pour supprimer les messages :c."});
        });

        return replySuccess();

        function replySuccess() {
            const successButton = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('cmdSuccess')
                        .setLabel('succès')
                        .setStyle('SUCCESS')
                        .setDisabled(true)
                        .setEmoji("✅")
                );

            if (!interaction.replied) {
                return interaction.reply({
                    content: "Spécialement pour toi mon choix, j'ai demandé à Discord d'effacer les " + amount + " derniers messages !",
                    components: [successButton]
                });
            }
        }
    },
};
