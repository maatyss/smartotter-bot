require('dotenv').config()

module.exports = (client, message) => {
  
  try {
    const channel = client.channels.cache.get('1174800695610855445')
    if (!channel) return
    
    channel.send({
                   content: message,
                 })
  } catch (error) {
    console.log(error)
  }
}
