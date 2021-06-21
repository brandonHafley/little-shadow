const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    permissions: 'ADMINISTRATOR',
    description: 'Bot joins voice channel and plays youtube link audio',
    async execute(message, args) {
        try {
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                const dispatcher = await connection.play(ytdl(args[0], { filter: 'audioonly' }), { volume: 1 });

                dispatcher.on('start', () => {
                    console.log('Now playing!');
                });

                dispatcher.on('finish', () => {
                    console.log('Finished playing!');
                    connection.disconnect();
                });

                dispatcher.on('error', console.error);
            } else {
                message.reply('You need to join a voice channel first!');
            }
        } catch (error) {
            console.error(error);
        }
    }
}