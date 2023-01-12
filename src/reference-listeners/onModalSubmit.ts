import { Client, Events, Interaction } from 'discord.js'

export default (client: Client): void => {
	client.on(Events.InteractionCreate, async (interaction: Interaction) => {
		if (!interaction.isModalSubmit()) return await Promise.resolve()

		if (interaction.customId === 'bot-setup') {
			const sourceChannel =
				interaction.fields.getTextInputValue('sourceChannelInput')
			const destinationChannel = interaction.fields.getTextInputValue(
				'destinationChannelInput'
			)

			console.log({ sourceChannel, destinationChannel })
			await interaction.reply({
				content: 'Your submission was received successfully!',
			})
		}
	})
}
