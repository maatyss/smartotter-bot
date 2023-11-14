const {PermissionFlagsBits} = require('discord.js')

module.exports = {
  name: 'ping',
  description: 'Pong !',
  // devOnly: Boolean,
  // testOnly, Boolean,
  // options: [],
  permissionsRequired: [PermissionFlagsBits.SendMessages],
  
  
  callback: async (client, interaction) => {
    await interaction.deferReply({ephemeral: true})
    
    const reply = await interaction.fetchReply()
    
    const ping = reply.createdTimestamp - interaction.createdTimestamp
    
    await interaction.editReply(`Pong ! Client: ${ping}ms | Websocket ${client.ws.ping}ms`)
  }
}