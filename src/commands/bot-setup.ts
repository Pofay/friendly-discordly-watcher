import {
	ActionRowBuilder,
	Client,
	CommandInteraction,
	ModalActionRowComponentBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from 'discord.js'
import { Command } from './Command'

export const BotSetup: Command = {
	name: 'bot-setup',
	description: 'Performs setup needed for bot to work correctly',
	type: 1,
	run: async (client: Client, interaction: CommandInteraction) => {
		const content = 'Bot setup'
		const modal = new ModalBuilder().setCustomId('bot-setup').setTitle(content)

		const sourceChannelInput = new TextInputBuilder()
			.setCustomId('sourceChannelInput')
			.setLabel('Set the Source Channel')
			.setStyle(TextInputStyle.Short)

		const destinationChannelInput = new TextInputBuilder()
			.setCustomId('destinationChannelInput')
			.setLabel('Set the Destination Channel')
			.setStyle(TextInputStyle.Short)

		const firstActionRow =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				sourceChannelInput
			)
		const secondActionRow =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				destinationChannelInput
			)

		modal.addComponents(firstActionRow, secondActionRow)

		await interaction.showModal(modal)
	},
}
