const { Events, ActivityType } = require('discord.js')

module.exports = {

    name: Events.ClientReady,
    async run(client) {

        await client.application.commands.set(client.commands.map(command => command.data)).then(() => console.log('[Statut] => SlashCommands loaded'))
        await console.log(`[Statut] => ${client.user.username} is online !`)

        setInterval(async function () {
            {
            statuttext = [
            `・💻 ┆ ${client.guilds.cache.size} serveur`,
            `・📨 ┆ https://dsc.gg/reperedesgeeks`,
            `・🏷️ ┆ Version ${process.env.version}`
                        ];
            }
            const randomText = statuttext[Math.floor(Math.random() * statuttext.length)];
            client.user.setPresence({ activities: [{ name: randomText, type: ActivityType.Watching }], status: 'online' });
        }, 5000)
    }
}