require('dotenv').config()
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js')

const client = new Client({
                            intents: [
                              IntentsBitField.Flags.Guilds,
                              IntentsBitField.Flags.GuildMembers,
                              IntentsBitField.Flags.GuildMessages,
                              IntentsBitField.Flags.MessageContent,
                            ],
                          })

const roles = [
  {
    id: '1105178747365249074',
    label: 'Accepter',
  }
]

client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get('1173964629706293332')
    if (!channel) return
    
    const row = new ActionRowBuilder()
    
    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      )
    })
    
    await channel.send({
                         content: 'J\'ai lu et J\'accepte le Règlement',
                         components: [row],
                       })
    process.exit()
  } catch (error) {
    console.log(error)
  }
})

client.login(process.env.TOKEN)
