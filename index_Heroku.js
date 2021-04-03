const fs = require("fs");
const crypto = require('crypto');
const Discord = require('discord.js');

const client = new Discord.Client();// Create an instance of a Discord client

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// CommandsHandlers : Loads commands into cache.
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

// EventsHandlers : Loads events into cache.
let eventPath = './events'
const eventFolders = fs.readdirSync(eventPath);

for (const folder of eventFolders) {
    let folderPath = eventPath + '/' + folder
    const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(folderPath + "/" + file);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

// Log our bot in using the token from https://discord.com/developers/applications
// Crypter / décrypter le token ( déprécié, à changer...)
//https://gist.github.com/chris-rock/993d8a22c7138d1f0d2e#file-crypto-ctr-js
function decrypt(algo, password, text) {
    const decipher = crypto.createDecipher(algo, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

const cipher_alg = 'aes-256-ctr',
    key = process.env.PSSWD,
    encrypted_token = process.env.CRYPTED_TOKEN;

const token = decrypt(cipher_alg, key, encrypted_token);
client.login(token);
