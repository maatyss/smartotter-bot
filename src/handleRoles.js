module.exports = async (interaction) => {
  await interaction.deferReply({ephemeral: true})
  
  const role = interaction.guild.roles.cache.get(interaction.customId)
  
  if (!role) {
    await interaction.editReply({
                                  content: 'Rôle introuvable',
                                })
    return
  }
  
  const hasRole = interaction.member.roles.cache.has(role.id)
  
  if (hasRole) {
    await interaction.editReply(`Vous avez déjà le rôle`)
    return
  }
  
  await interaction.member.roles.add(role)
  await interaction.editReply(`Vous pouvez maintenant accèder au discord`)
}