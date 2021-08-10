const {ApplicationCommandOptionType} = require("discord-api-types/v9");
const {MessageActionRow, MessageButton} = require("discord.js");

module.exports = {
    hidden: false,
    name: 'voicemove',
    aliases: ['vm', 'moveall', 'vocalmove'],
    description: "Déplace les utilisateurs de votre salon vocal vers le salon donné en argument.",
    options: [{
        name: 'destination',
        type: ApplicationCommandOptionType.Channel,
        description: 'Le salon vocal dans lequel déplacer les utilisateurs.',
        required: true,
    }],
    cooldown: 15,
    guildOnly: true,
    permissions: "MOVE_MEMBERS",
    execute(interaction) {
        // Check if the user is connected to a Voice channel
        let fromVoiceChannel = interaction.member.voice.channel;
        if (!fromVoiceChannel) {
            return interaction.reply({
                content: 'Vous devez être dans un salon vocal pour pouvoir utiliser cette commande.',
                ephemeral: true
            });
        }
        // Check if the channelId given in args is existant
        const toVoiceChannel = interaction.options.getChannel('destination');

        // Check if the given channel is a Voice channel
        if (toVoiceChannel.type !== 'GUILD_VOICE') {
            return interaction.reply({
                content: `Le channel ${toVoiceChannel.name} n'est pas un channel Audio.`,
                ephemeral: true
            });
        }
        // Check if the author has the permissions to connect to the given channel
        if (!(toVoiceChannel.permissionsFor(interaction.member).has("CONNECT"))) {
            return interaction.reply({
                content: "Vous n'avez pas les droits pour vous connecter dans ce salon vocal !",
                ephemeral: true
            });
        }

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
                    content: "Commande effectuée avec succès.",
                    components: [successButton]
                });
            }
        }

        // Bulk move user from fromVoiceChannel to toVoiceChannel
        fromVoiceChannel.members.forEach(member => member.voice.setChannel(toVoiceChannel))
        return replySuccess();
    },
};
