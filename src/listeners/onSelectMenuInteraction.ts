import { AppState } from 'AppState'
import { Client, Events, Interaction } from 'discord.js'

export default (client: Client): void => {
	client.on(Events.InteractionCreate, async (interaction: Interaction) => {
		if (!interaction.isStringSelectMenu()) return await Promise.resolve()

		if (interaction.customId === 'channels-selection') {
			const channelsSelection = interaction.values
			const serverId = interaction.guildId

			// @ts-expect-error
			AppState.set(serverId, {
				sourceChannel: channelsSelection[0],
				destinationChannel: channelsSelection[1],
			})

			console.table(AppState)

			await interaction.reply({
				ephemeral: true,
				content: `Selected channels: \nSource: ${channelsSelection[0]} Destination: ${channelsSelection[1]}`,
			})
		}
	})
}
