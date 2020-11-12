module.exports = {
	hidden: false,
	name: 'prune',
	aliases: [],
	description: 'Prune up to 99 messages.',
	cooldown: 0,
	guildOnly: true,
	args: true,
	usage: '<nombre>',
	execute(message, args) {
		if (message.author.id === '206746457678544898') {
			message.reply("Banned User from this command.");
		}
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	},
};
