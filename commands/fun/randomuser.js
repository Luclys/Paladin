module.exports = {
    hidden: false,
    name: '@random',
    aliases: ['@r', '@rand'],
    description: 'Renvoi un membre aléatoire de la guilde.',
    cooldown: 0,
    guildOnly: true,
    permissions: '',
    args: false,
    usage: '',
    execute(message, args) {
        /*
              let guild_members_id = message.guild.members.keyArray();
              let alea_int = ((Math.floor(Math.random() * (message.guild.memberCount+1)))%(message.guild.memberCount));
              let alea_member = `<@${guild_members_id[alea_int]}>`;
              message.channel.send(alea_member);
        */
        let guild_members_id = message.guild.members.fetch().then(gmbrs => {
                guild_members_id = gmbrs.keyArray()
                let alea_int = ((Math.floor(Math.random() * (message.guild.memberCount + 1))) % (message.guild.memberCount))
                let alea_member = `<@${guild_members_id[alea_int]}>`
                message.channel.send(alea_member)
            }
        );
    },
};
