require('dotenv').config()
const {Client} = require('discord.js')
const client = new Client({
                            intents: [3276799],
                          })
const eventHandler = require('./Handlers/eventHandler')
const sendMessage = require('./Log/sendMessage')

eventHandler(client)
client.on('ready', (c) => {
  const activity = 'Self-Coding'
  client.user.setActivity(activity)
  sendMessage(client,`Changed Activity for : ${activity}`)
})

client.login(process.env.TOKEN)