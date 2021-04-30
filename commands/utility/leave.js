const { connection } = require('./join.js');

module.exports = {
    name: 'leave',
    description: 'Bot leaves voice channel',
    execute(message) {
        if (message.member.voice.channel) {
            message.member.voice.channel.leave();
        }
    }
}