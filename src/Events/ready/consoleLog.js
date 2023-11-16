
module.exports = (client) => {
  const sendMessage = require('../../Log/sendMessage')

  // console.log(`${client.user.tag} is online.🌍 | ${new Date()} |`)
  sendMessage(client, `${client.user.tag} is online.🌍 | ${new Date()} |`)
}