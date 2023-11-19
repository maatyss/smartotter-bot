const {ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js')
const sendMessage = require('../../Log/sendMessage')

module.exports = {
  
  name: 'setactivity',
  description: 'Change l\'activité du bot',
  devOnly: true,
  // testOnly, Boolean,
  options: [{
    name: 'activity',
    description: 'Activité à afficher',
    required: true,
    type: ApplicationCommandOptionType.String,
  }],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
  
  callback: async (client, interaction) => {
    const activity = interaction.options.getString('setactivity')
    await interaction.deferReply({ephemeral: true})
    client.user.setActivity(activity)
    await interaction.editReply(`Changed activity to : ${activity}`)
    await sendMessage(client, `Changed activity to : ${activity}`)
  },
  
}