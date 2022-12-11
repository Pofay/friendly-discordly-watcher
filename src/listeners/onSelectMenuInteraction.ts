import { Client, Events, Interaction } from 'discord.js'

export default (client: Client): void => {
	client.on(Events.InteractionCreate, async (interaction: Interaction) => {
		if (!interaction.isStringSelectMenu()) return await Promise.resolve()

		if (interaction.customId === 'sourceChannelSelection') {
			const sourceChannel = interaction.values[0]
			await interaction.reply({
				content: `Selected source Channel ${sourceChannel}`,
			})
		} else if (interaction.customId === 'destinationChannelSelection') {
			const destinationChannel = interaction.values[0]
			await interaction.reply({
				content: `Selected destination Channel ${destinationChannel}`,
			})
		}
	})
}
