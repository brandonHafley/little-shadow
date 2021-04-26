module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
        if (!channel) return;
        channel.send(`Welcome to the server, ${member}`);
    }
}