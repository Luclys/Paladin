const fs = require("fs");
const crypto = require('crypto');
const {Client, Collection, Intents} = require("discord.js");

// Create an instance of a Discord client
const client = new Client({intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES , Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS]});

// Official community-driven guide : https://discordjs.guide/
client.commands = new Collection();
client.cooldowns = new Collection();

// CommandsHandlers : Loads commands into cache.
const path = './commands';
const commandFolders = fs.readdirSync(path);

client.commandsList = [];
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        let command = require(`${path}/${folder}/${file}`);
        client.commands.set(command.name, command);
        client.commandsList.push({
            name: command.name,
            description: command.description,
            options: command.options ?? undefined
        })
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
