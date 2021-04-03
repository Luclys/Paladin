module.exports = {
    hidden: true,
    name: 'args-info',
    aliases: [],
    description: 'Information about the arguments provided.',
    cooldown: 0,
    guildOnly: false,
    permissions: '',
    args: true,
    usage: '<foo> OR <arg1> <arg2> <arg3> ...',
    execute(message, args) {
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    },
};
