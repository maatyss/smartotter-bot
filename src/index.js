require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const {configDotenv} = require('dotenv')

const client = new Client({
                            intents: [3276799],
                          });

client.on('ready', (c) => {
  console.log(`${c.user.tag} is online.🌍`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }
  
  if (message.content === '!ping') {
    message.reply('pong');
  }
});

client.login(process.env.TOKEN);