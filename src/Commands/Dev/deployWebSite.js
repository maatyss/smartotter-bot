require('dotenv').config()
const {PermissionFlagsBits, ApplicationCommandOptionType} = require('discord.js')
const axios = require('axios')
const sendMessage = require('../../Log/sendMessage')


module.exports = {
  name: 'deploy', description: 'Lancer le déploiement d\'un site web', devOnly: true, // testOnly, Boolean,
  options: [{
    name: 'site',
    description: 'Domaine du site à déployer (doit être racordé à Cloud Boxydev)',
    required: true,
    type: ApplicationCommandOptionType.String,
  }, {
    name: 'id',
    description: 'A précisez pour ne pas surchager l\'api',
    required: false,
    type: ApplicationCommandOptionType.Integer,
  }],
  permissionsRequired: [PermissionFlagsBits.Administrator], botPermissions: [PermissionFlagsBits.Administrator],
  
  
  callback: async (client, interaction) => {
    const siteToDeploy = interaction.options.getString('site')
    const DeployementDelay = interaction.options.getString('delay') ?? 0
    await interaction.deferReply({ephemeral: true})
    await interaction.editReply(`🚀 Déploiement sur ${siteToDeploy} en cours...`)
    // await interaction.editReply(`Déploiement du siteWeb : ${siteToDeploy} ${DeployementDelay? 'dans ' + DeployementDelay + 'ms !' : '!'}`)
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.BOXYDEV_TOKEN}`
    
    const url = 'https://cloud.boxydev.com/api/server'
    
    if (interaction.options.get('id')) {
      const siteID = interaction.options.get('id').value
      await axios.post(`https://cloud.boxydev.com/api/site/${siteID}/deployment`, {
        headers: {
          Authorization: `Bearer ${process.env.BOXYDEV_TOKEN}`,
        },
      }).then(interaction.editReply(`🛰 **${siteToDeploy}** déployé ! \n🆔 : *${siteID}* \n🌍 : https://${siteToDeploy}`)).catch(error => {
        console.log(error)
        sendMessage(client, error)
      })
      return
    }
    
    await axios.get(`${url}s`, {
      headers: {
        Authorization: `Bearer ${process.env.BOXYDEV_TOKEN}`,
      },
    }).then(response => {
      for (const server of response.data.data) {
        axios.get(`${url}/${server.id}/sites`, {
          headers: {
            Authorization: `Bearer ${process.env.BOXYDEV_TOKEN}`,
          },
        }).then(response => {
          const sites = response.data.data
          sites.map((site) => {
            if (site.domain === siteToDeploy) {
              axios.post(`https://cloud.boxydev.com/api/site/${site.id}/deployment`, {
                headers: {
                  Authorization: `Bearer ${process.env.BOXYDEV_TOKEN}`,
                },
              }).then(response => {
                interaction.editReply(`🛰 **${siteToDeploy}** déployé ! \n🆔 : *${site.id}* \n🌍 : https://${siteToDeploy}`)
              })
            } else if (sites.includes(siteToDeploy)) {
              interaction.editReply(`🪂 **${siteToDeploy}** n'a pas de match`)
            }
          })
          
        }).catch(error => {
          console.log(error)
          sendMessage(client, error)
        })
      }
    }).catch(error => {
      console.log(error)
      sendMessage(client, error)
    })
    
    
  },
}