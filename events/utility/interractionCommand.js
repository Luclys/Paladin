const Discord = require("discord.js");
const {MessageActionRow, MessageButton} = require("discord.js");

function resetCD(client, interaction, name) {
    // Delete Cooldown
    const timestamps = client.cooldowns.get(name);
    timestamps.delete(interaction.member.id);
}

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {

        // On cherche si la commande existe //ou si c'est un alias
        let commandName = interaction.commandName;
        const command = client.commands.get(commandName);
        //|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            console.log(`La commande ${commandName} est inconnue.`);
            return;
        }

        if (command.guildOnly && !interaction.inGuild()) {
            return interaction.reply({
                content: "Je ne peux pas faire ça quand on n'est qu'entre nous choux <3",
                ephemeral: true
            });
        }

        if (command.permissions) {
            const authorPerms = interaction.channel.permissionsFor(interaction.member);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return interaction.reply({
                    content: "Vous outrepassez les droits qui vous sont conférés, héhé vous ne m'aurez pas comme ça !",
                    ephemeral: true
                });
            }
        }

        if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        let authorId = interaction.user.id;
        if (!timestamps.has(authorId)) {
            timestamps.set(authorId, now);
            setTimeout(() => timestamps.delete(authorId), cooldownAmount);
        } else {
            const expirationTime = timestamps.get(authorId) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return interaction.reply({
                    content: `Wow wow wow, tu vas trop vite en besogne toi ! Allé, calme toi et attends ${timeLeft.toFixed(1)} seconde(s) de plus avant de réessayer la commande ${command.name}.`,
                    ephemeral: true
                });
            }

            timestamps.set(authorId, now);
            setTimeout(() => timestamps.delete(authorId), cooldownAmount);
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            resetCD(client, interaction, interaction.commandName);

            const errorButton = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('cmdError')
                    .setLabel('Erreur')
                    .setStyle('DANGER')
                    .setDisabled(true)
                    .setEmoji("❌"),
            );

            await interaction.reply({
                content: "Il m'est impossible d'accéder à votre demande, il y a eu une erreur ! :O",
                components: [errorButton],
                ephemeral: true
            });
        }
    }
};