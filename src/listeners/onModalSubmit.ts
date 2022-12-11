import { Client, Events, Interaction } from 'discord.js'

export default (client: Client): void => {
	client.on(Events.InteractionCreate, async (interaction: Interaction) => {
		if (!interaction.isModalSubmit()) return await Promise.resolve()
		console.log('Submitted a modal')
	})
}
