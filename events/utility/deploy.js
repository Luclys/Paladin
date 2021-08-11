const {prefix} = require('../../config.json');

module.exports = {
    name: 'messageCreate',
    once: true,
    async execute(message, client) {
        if (!client.application?.owner) await client.application?.fetch();

        if (message.content.toLowerCase() === prefix + 'deploy' && message.author.id === client.application?.owner.id) {

            const commands = await client.application?.commands.set(client.commandsList);
            console.log(commands);
        }
    },
};
