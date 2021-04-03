module.exports = {
    name: 'message',
    once: true,
    execute(message) {
        // Conneries pour le fun:
        // Quel Savant ce Tristan !
        if (message.author.id === '254957788583821313') {
            let random = (Math.floor(Math.random() * 101));
            let random2 = (Math.floor(Math.random() * 101));
            if (random <= 1 && random2 <= 5) return message.reply(`Oh, waw, quel humain, il rivaliserait presque avec mon processeur !\n ... Calme toi, j\'ai dis **presque** hein D:`);
        }
    },
};