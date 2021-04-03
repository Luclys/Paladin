module.exports = {
    name: 'jdrupdate',
    aliases: ['jdrupdt'],
    description: "Met à jour les infos concernant le JDR.\n" +
        "[name] récupère le nom du salon et update le message d\'infos. " +
        "[intrigue] Récupère le sujet du salon et update le message d'infos. " +
        "[status] Permet de modifier le status du JDR: completé, en cours, en pause (alternativement). " +
        "[user] Permet de mettre à jour la liste d'utilisateur participant au JDR (users ayant accès au salon)" +
        "[GameMaster] Permet de mettre à jour l'identité du Maître du Jeu",
    //cooldown: 3,
    guildOnly: true,
    permissions: '',
    args: true,
    usage: '[Name] OU [Info] OU [Status] OU [User] OU [GameMaster]',
    execute(message, args) {
        args = args[0].toUpperCase();
        message.channel.send('Commande pour terminer mettre à jour le message d\'infos non codée, à plus tard ;)');
        if (args === "NAME") {
            message.channel.send(`Le nom du JDR associé à ce channel est: ${message.channel.name}.`)


        } else if (args === "STATUS") {
            // if (status == 'Complété') {
            //   status = 'En cours'
            // }
            // else if (status == 'En cours') {
            //   status = "En pause"
            // }
            // else {
            //   status = "Complété"
            //
            // }

        } else if (args === "INFO") {
            if (message.channel.topic == "") {
                message.channel.send(`Définissez le sujet du salon ${message.channel} afin d\'utiliser cette commande.`)
            } else {
                message.channel.send(`Le plot de ${message.channel.name} est:\n${message.channel.topic}`)
            }
        } else if (args === "USER") {

        } else {

        }
    },
};

//sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
//sql.run(`UPDATE `${message.guild.id}_JDR` SET jdr_name = ${message.channel.name}, lastUpdate = ${} WHERE channelId = ${message.channel.id}`);
