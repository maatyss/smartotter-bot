const {ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js')
const sendMessage = require('../../Log/sendMessage')

module.exports = {
  
  name: 'purge',
  description: 'Supprime les 10 derniers messages par défaut',
  // devOnly: true,
  // testOnly, Boolean,
  options: [{
    name: 'nombre',
    description: 'Change le nombre de message à supprimer (100 max)',
    required: false,
    type: ApplicationCommandOptionType.Integer,
  }],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
  
  callback: async (client, interaction) => {
    const messageNbrToDelete = interaction.options.getInteger('nombre')?? 10
    await interaction.deferReply({ephemeral: true})
    await interaction.editReply(`🗑 Suppression de ${messageNbrToDelete} message en cours...`)
    
    if (messageNbrToDelete > 100){
      return await interaction.editReply(`Hop Hop Hop, pas plus de 100 messages à la fois !`)
    }
    
    let newestMessageToDelete = {}
    let oldestMessageToDelete = {}
    
    interaction.channel.messages.fetch({limit: messageNbrToDelete}).then(async (message) => {
      oldestMessageToDelete = message.last()
      await interaction.channel.messages.fetch({limit: 1}).then(message => {newestMessageToDelete = message.first()})
      
      if ((Date.now() - newestMessageToDelete.createdTimestamp) > 1209600 || (Date.now() - oldestMessageToDelete.createdTimestamp) > 1209600 ){
        await interaction.channel.messages.fetch({limit: messageNbrToDelete}).then((response) => {
          response.map ((message) => {
            interaction.channel.messages.delete(message.id)
          })
        })
        await interaction.editReply(`🗑 ${messageNbrToDelete} messages supprimés`)
        await sendMessage(client, `${messageNbrToDelete} message(s) supprimé(s) \n #️⃣ : <#${interaction.channelId}> \n🤖 By : <@${interaction.user.id}>`)
        
      } else {
        await interaction.channel.bulkDelete(messageNbrToDelete)
        await interaction.editReply(`🗑 ${messageNbrToDelete} messages supprimés`)
        await sendMessage(client, `${messageNbrToDelete} message(s) supprimé(s) \n #️⃣ : <#${interaction.channelId}> \n🤖 By : <@${interaction.user.id}>`)
      }
      
    })
    
  },
  
}