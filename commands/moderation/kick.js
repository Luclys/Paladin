module.exports = {
	hidden: true,
	name: 'kick',
	aliases: [],
	description: 'Tag a member and kick them (but not really).',
	cooldown: 0,
	guildOnly: true,
	permissions: "KICK_MEMBERS",
	args: true,
	usage: '<user>',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}
		const taggedUser = message.mentions.users.first();
		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
};
