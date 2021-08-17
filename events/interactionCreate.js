module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client, time) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} sent: ${interaction.content} - ${time(new Date())}`)
        if (!interaction.isCommand()) return;

        client.commands = new Collection();
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.replay({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    }
};