require('dotenv').config()
const {Client} = require('discord.js')
const client = new Client({
                            intents: [3276799],
                          })
const eventHandler = require('./Handlers/eventHandler')
const sendMessage = require('./Log/sendMessage')
const registerCommands = require('Events/ready/01registerCommands')

eventHandler(client)
client.on('ready', (c) => {
  const activity = 'Self-Coding'
  client.user.setActivity(activity)
  sendMessage(client,`Changed Activity for : ${activity}`)
  registerCommands(client)
})

client.login(process.env.TOKEN)