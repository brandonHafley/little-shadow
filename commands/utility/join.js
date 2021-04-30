module.exports = {
    name: 'join',
    description: 'Bot joins user\'s voice channel',
    permissions: 'ADMINISTRATOR',
    async execute(message) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
        }
    }
}