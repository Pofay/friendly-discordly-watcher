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

		const sourceChannelSelectionRow =
			new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('sourceChannelSelection')
					.setPlaceholder('Select Source Channel')
					.addOptions(availableOptions)
			)

		const destinationChannelSelectionRow =
			new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('destinationChannelSelection')
					.setPlaceholder('Select Destination Channel')
					.addOptions(availableOptions)
			)

		await interaction.reply({
			content,
			components: [sourceChannelSelectionRow, destinationChannelSelectionRow],
		})
	},
}
