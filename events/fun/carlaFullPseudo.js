const {carlaId, carlaPseudo, carlaFullNameServers} = require('../../config.json');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.author.id === carlaId && carlaFullNameServers.includes(message.guildId)) {
            message.channel.send(`Take care 'cause **SHE** has spoken !!! Here's ${carlaPseudo}'s speech !`);
        }
    },
};
