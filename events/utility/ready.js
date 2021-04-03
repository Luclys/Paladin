const {prefix, authorUserID} = require('../../config.json');
const os = require('os');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.users.fetch(authorUserID, true).then(user => user.send(`${client.user.tag} a été initialisé sur la machine : **${os.hostname()}**, sous l'os : ${os.platform}.`))
        console.log(client.user.tag + ': Bot Initialisé avec succès.');
    },
};