require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const {configDotenv} = require('dotenv')

const client = new Client({
                            intents: [3276799],
                          });

client.on('ready', (c) => {
  client.user.setActivity(`Self-Coding`)
  console.log(`${c.user.tag} is online.🌍`);
});


client.login(process.env.TOKEN);