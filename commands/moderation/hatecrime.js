const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hatecrime')
		.setDescription('arg = word to oppress')
		.addStringOption(option => option.setName('text').setDescription('word to oppress')),
	async execute(interaction) {
		const text = interaction.options.getString('text');

		let channel = await interaction.client.channels.cache.get(interaction.channelId)
		fetchAllMessages(channel,text)
		return interaction.reply({ content: `working on it  :rainbow_flag:`, ephemeral: true })
	},
};
async function fetchAllMessages(channel,textToDelete) {
	let message = await channel.messages
	  .fetch({ limit: 1 })
	  .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));
	let i = 0
	while (message) {
		if(i>=500){
			message = false;
			break;
		  }
		else{
			await channel.messages
			.fetch({ limit: 100, before: message.id })
			.then(messagePage => {
			  messagePage.forEach(msg => {
				i++;
				if(msg.content.includes(textToDelete)){
					msg.delete();
				}
			 });
	  
			  // Update our message pointer to be the last message on the page of messages
			  message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
			});
		}
	}
  }