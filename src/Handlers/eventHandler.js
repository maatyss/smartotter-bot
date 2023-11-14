const path = require('path')
const getAllFiles = require('../Utils/getAllfiles')

module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'Events'), true)
  
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder)
    eventFiles.sort((a, b) => a > b)
    
    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop()
    
    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile)
        await eventFunction(client, arg)
      }
    })
  }
}