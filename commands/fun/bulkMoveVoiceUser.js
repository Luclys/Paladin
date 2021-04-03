function resetCD(client, message, name) {
    // Delete Cooldown
    const timestamps = client.cooldowns.get(name);
    timestamps.delete(message.author.id)
}

module.exports = {
    hidden: false,
    name: 'voicemove',
    aliases: ['vm', 'moveall', 'vocalmove'],
    description: "Déplace tous les utilisateurs du salon vocal où est l'auteur de la commande vers le salon donné en argument.",
    cooldown: 15,
    guildOnly: true,
    permissions: "MOVE_MEMBERS",
    args: true,
    usage: '<channelId>',
    execute(message, args, client) {
        // Check if the user is connected to a Voice channel
        let fromVoiceChannel = message.member.voice.channel;
        if (!fromVoiceChannel) {
            resetCD(client, message, this.name);
            return message.reply('Vous devez être dans un salon vocal pour pouvoir utiliser cette commande.');
        }
        // Check if the channelId given in args is existant
        let toVoiceChannel = message.guild.channels.cache.get(args[0]);
        if (!toVoiceChannel) {
            resetCD(client, message, this.name);
            return message.reply(`Le channel ${args[0]} n'a pas été trouvé.`);
        }
        // Check if the given channel is a Voice channel
        if (toVoiceChannel.type !== 'voice') {
            resetCD(client, message, this.name);
            return message.reply(`Le channel ${args[0]} n'est pas un channel Audio.`);
        }
        // Check if the author has the permissions to connect to the given channel
        if (!(toVoiceChannel.permissionsFor(message.member).has("CONNECT"))) {
            resetCD(client, message, this.name);
            return message.reply("Vous n'avez pas les droits pour vous connecter dans ce salon vocal !");
        }

        // Bulk move user from fromVoiceChannel to toVoiceChannel
        fromVoiceChannel.members.forEach(member => member.voice.setChannel(toVoiceChannel))
    },
};
