const getLocalCommands = require('./Utils/getLocalCommands')
const getApplicationCommands = require('./Utils/getApplicationCommands')
const sendMessage = require('./Log/sendMessage')
const areCommandsDifferent = require('./Utils/areCommandsDifferent')

try {
  const localCommands = getLocalCommands()
  const applicationCommands = await getApplicationCommands(client, testServer)
  
  for (const localCommand of localCommands) {
    const {name, description, options} = localCommand
    
    const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name)
    
    if (existingCommand) {
      if (localCommand.deleted) {
        await applicationCommands.delete(existingCommand.id)
        console.log(`🗑 "/${name}" -> Deleted`)
        sendMessage(client, `🗑 "/${name}" -> Deleted`)
        
        continue
      }
      
      if (areCommandsDifferent(existingCommand, localCommand)) {
        await applicationCommands.edit(existingCommand.id, {description, options})
        
        console.log(`🔁 "/${name}" -> Edited`)
        sendMessage(client, `🔁 "/${name}" -> Edited`)
      }
    } else {
      if (localCommand.deleted) {
        console.log(`⏩ "/${name}" Skipped for deletion`)
        sendMessage(client, `⏩ "/${name}" Skipped for deletion`)
        continue
      }
      
      await applicationCommands.create({name, description, options})
      
      console.log(`👍 "/${name}" Registered`)
      sendMessage(client, `👍 "/${name}" Registered`)
    }
  }
} catch (error) {
  console.log(error)
  sendMessage(client, error)
}
console.log('All Commands registered !')