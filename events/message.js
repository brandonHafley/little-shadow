const { prefix, ytkey } = require('../config.json');
const { MusicBot } = require('discord-music-system');

module.exports = {
    name: 'message',
    async execute(message, client) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);

        client.musicBot = new MusicBot(client, {
            ytApiKey: ytkey,
            prefix: prefix,
            language: 'en'
        });
        client.musicBot.onMessage(message);

        console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content} - ${message.createdAt}`);

        if (!message.content.startsWith(prefix) || !client.commands.has(commandName) || message.author.bot) return;

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply('You can not do this!');
            }
        }

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
        }

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command!');
        }
    }
}