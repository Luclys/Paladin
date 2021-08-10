const os = require('os');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        if (!client.application?.owner) await client.application?.fetch();

        client.application?.owner.send(`${client.user.tag} a été initialisé sur la machine : **${os.hostname()}**, sous l'os : ${os.platform}.`)
        console.log(client.user.tag + ': Bot Initialisé avec succès.');
    },
};