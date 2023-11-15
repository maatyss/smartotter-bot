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

client.login(process.env.TOKEN)