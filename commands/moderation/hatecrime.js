const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hatecrime')
		.setDescription('arg = word to oppress')
		.addStringOption(option => option.setName('text').setDescription('word to oppress')),
	async execute(interaction) {
		console.log(interaction.options)
		const text = interaction.options.getString('text');

		let channel = await interaction.client.channels.cache.get(interaction.channelId)
		channel.messages.fetch({ limit: 100 }).then(messages => {
			messages.forEach(message => {
				console.log(message.content)
					if(message.content.includes(text)){
						message.delete()
					}
				})
		  })
		return interaction.reply({ content: `done :rainbow_flag:`, ephemeral: true })
	},
};
