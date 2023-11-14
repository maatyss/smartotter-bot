require('dotenv').config()
const {Client, IntentsBitField} = require('discord.js')
const client = new Client({
                            intents: [3276799],
                          })
const eventHandler = require('./Handlers/eventHandler')

eventHandler(client)
client.on('ready', (c) => {
  client.user.setActivity(`Self-Coding`)
})

// client.on('interactionCreate', async (interaction) => {
//
//   if (interaction.commandName === 'ping') {
//     await interaction.deferReply({ephemeral: true})
//     await interaction.editReply(`Pong ! Client: ${(await interaction.fetchReply()).createdTimestamp-interaction.createdTimestamp}ms | Websocket ${client.ws.ping}`)
//   }
//
//   if (interaction.isButton()) {
//     await handleRole(interaction)
//   }
// })


client.login(process.env.TOKEN)