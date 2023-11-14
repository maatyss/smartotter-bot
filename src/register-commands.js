require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: 'Renvoie Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


//DELETING ALL PREVIOUS COMMAND
// for guild-based commands
rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: [] })
  .then(() => console.log('Successfully deleted all guild commands.'))
  .catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
  .then(() => console.log('Successfully deleted all application commands.'))
  .catch(console.error);


(async () => {
  try {
    console.log('Registering slash commands...');
    
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    
    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();