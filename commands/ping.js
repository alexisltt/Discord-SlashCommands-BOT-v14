const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Obtenir la latence du bot')
    .setDMPermission(true)
    .setDefaultMemberPermissions(null),

    async run(client, interaction) {

        interaction.reply({
            embeds: [
            new EmbedBuilder()
            .setTitle('Latence du bot')
            .setDescription(`> Latence : \`${client.ws.ping}\`ms`)
        ],
            ephemeral: true,
        });
    }
};