import {
	ActionRowBuilder,
	Client,
	CommandInteraction,
	StringSelectMenuBuilder,
} from 'discord.js'
import { Command } from './Command'

export const BotSetup: Command = {
	name: 'bot-setup',
	description: 'Performs setup needed for bot to work correctly',
	type: 1,
	run: async (client: Client, interaction: CommandInteraction) => {
		const content = 'Bot setup'

		// @ts-expect-error
		const textChannels = await interaction.guild.channels.cache.filter(
			c => c.type === 0
		)

		const availableOptions = textChannels.map(c => ({
			label: c.name,
			value: c.id,
		}))

		const channelsSelection =
			new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('channels-selection')
					.setPlaceholder('Select Source and Destination Channel')
					.setMinValues(2)
					.setMaxValues(2)
					.addOptions(availableOptions)
			)

		await interaction.reply({
			ephemeral: true,
			content,
			components: [channelsSelection],
		})
	},
}
