const path = require('path')
const getAllfiles = require('./getAllfiles')

module.exports = (exeptions = []) => {
  let localCommands = []
  
  const commandCategories = getAllfiles(path.join(__dirname, '..', 'Commands'), true)
  
  for  (const commandCategory of commandCategories) {
    const commandFiles = getAllfiles(commandCategory)
    
    for (const commandFile of commandFiles) {
      const commandObject = require(commandFile)
      
      if (exeptions.includes(commandObject.name)){
        continue
      }
      
      localCommands.push(commandObject)
    }
  }
  
  return localCommands
}