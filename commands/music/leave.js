module.exports = {
    name: 'leave',
    permissions: 'ADMINISTRATOR',
    description: 'Bot leaves voice channel',
    execute(message) {
        if (message.member.voice.channel) {
            message.member.voice.channel.leave();
        }
    }
}