const {prefix} = require('../../config.json');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {
        if (!client.application?.owner) await client.application?.fetch();

        if (message.content.toLowerCase() === prefix + 'deploy' && message.author.id === client.application?.owner.id) {

            const commands = await client.guilds.cache.get('428279062667067422')?.commands.set(client.commandsList);
            console.log(commands);
        }
    },
};
