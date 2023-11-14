require('dotenv').config()
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require('discord.js')

const client = new Client({
                            intents: [
                              IntentsBitField.Flags.Guilds,
                              IntentsBitField.Flags.GuildMembers,
                              IntentsBitField.Flags.GuildMessages,
                              IntentsBitField.Flags.MessageContent,
                            ],
                          })

const roles = [
  {
    id: '1105178747365249074',
    label: 'Accepter',
  }
]

client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get('1173964629706293332')
    if (!channel) return
    
    const exampleEmbed = new EmbedBuilder()
      .setColor(10717022)
      .setTitle('Règlement Général')
      .setDescription('- La modération se réserve le droit d\'utiliser sa propre discrétion quelle que soit la règle.' +
                        '\n- Pas d\'exploitation de failles dans les règles (merci de les signaler).' +
                        '\n- Merci de ne pas MP les autres utilisateurs sans leur accord.' +
                        '\n- Les Règles suivantes s\'appliquent tout aussi bien au MP.')
      .setThumbnail('https://maatyss.fr/img/base/otter.png')
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Pseudo et photo de profil',
          value: '- Pas de surnoms inappropriés, sexuellement explicites ou offensants.' +
            '\n- Pas de photo de profil inappropriés, sexuellement explicites ou offensants.' +
            '\n- La modération se réserve le droit de changer les surnoms.', inline: false},
        
        { name: 'Messages',
          value: '- Pas de remise en question de la modération.' +
            '\n- Merci de ne pas demander d\'attribution de rôle.' +
            '\b- Ne pas spammez les @mentions.', inline: false },
        
        { name: 'Contenu',
          value: '- Aucun contenu explicite ne sera toléré.' +
            '\n- Aucune publication d\'informations personnelles (y compris vrais noms, adresses, e-mails, mots de passe, informations de compte bancaire et de carte de crédit, etc.).' +
            '\n- Pas d\'attaques personnelles, de harcèlement, de sexisme,de discours haineux.' +
            '\n- La modération se réserve le droit de supprimez n\'importe quel message qu\'elle juge innaproprié', inline: false },
        {name:'Soumis à autorisation',
          value: '- Publicité quelque soit le produit.' +
            '\n- Partage de liens.', inlne: false}
      
      )
      .setTimestamp()
      .setFooter({ text: 'Règlement général discord \'Maatyss\'' });
    
    channel.send({ embeds: [exampleEmbed] });
    
    const row = new ActionRowBuilder()
    
    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      )
    })
    
    await channel.send({
                         content: 'J\'ai lu et J\'accepte le Règlement',
                         components: [row],
                       })
    process.exit()
  } catch (error) {
    console.log(error)
  }
})

client.login(process.env.TOKEN)
