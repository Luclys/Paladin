module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member) {
        // Send the message to a designated channel on a server:
        //let channel = member.guild.channels.find('id', `${member.guild.systemChannel.id}`)
        let channel = member.guild.systemChannel
        // Do nothing if the channel wasn't found on this server
        if (!channel) return; // Send the message, mentioning the member
        channel.send(`Bienvenue sur le serveur p\'tite merde, ah, non pardon, ${member}, ouais, bah... c\'est bien ce que je disais.`);
    },
};