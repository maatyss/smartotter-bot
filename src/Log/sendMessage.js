require('dotenv').config()

module.exports = (client, message) => {
  
  try {
    const channel = client.channels.cache.get('CHANNEL_ID')
    if (!channel) return
    
    channel.send({
                   content: message,
                 })
  } catch (error) {
    console.log(error)
  }
}
