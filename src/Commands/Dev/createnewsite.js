const {ApplicationCommandOptionType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder} = require('discord.js')
const sendMessage = require('../../Log/sendMessage')
const axios = require('axios')

module.exports = {
  
  name: 'createnewsite',
  description: 'Crée un nouveau site depuis une branche d\'un repo github (non case-sensitive)',
  devOnly: true,
  // testOnly, Boolean,
  options: [{
    name: 'owner',
    description: 'Propriétaire du repo github (non case-sensitive)',
    required: true,
    type: ApplicationCommandOptionType.String,
  },
    {
      name: 'repo',
      description: 'nom du répo github',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
  
  callback: async (client, interaction) => {
    const owner = interaction.options.getString('owner')
    const repo = interaction.options.getString('repo')
    const row = new ActionRowBuilder()
    const buttonRow = new ActionRowBuilder()
    let branches = []
    let groupedBranches = []
    
    
    await interaction.deferReply({ephemeral: true})
    
    axios.get(`https://api.github.com/repos/${owner}/${repo}/branches`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }).then(response => {
      branches = response.data
    }).then(() => {
      for (let i = 0; i < branches.length; i += 5) {
        let group = branches.slice(i, i + 5)
        groupedBranches.push(group)
      }
    }).then(() => {
      row.components.push(() => {
        groupedBranches.forEach((chunk) => {
          return buttonRow.components.push((branche) => {
            new ButtonBuilder()
              .setLabel(branche.name)
              .setCustomId(branche.commit.sha)
              .setStyle('Primary')
          })
        })
      })
      
      console.log(groupedBranches)
    }).finally(() => {
      interaction.editReply({
                              content: 'Choisissez la branche à deployer',
                              components: [row],
                            })
    })
  },
  
}