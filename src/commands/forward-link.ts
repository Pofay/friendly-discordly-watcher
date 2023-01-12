import {
	ChannelType,
	CommandInteraction,
	SlashCommandBuilder,
	TextChannel,
} from 'discord.js'
import { isValidHttpUrl } from 'utils/url-verifier'

export const data = new SlashCommandBuilder()
	.setName('forward-link')
	.setDescription('Forwards a message to specified channel.')
	.addChannelOption(option =>
		option
			.setName('channel')
			.setDescription('The channel to forward the link to.')
			.addChannelTypes(ChannelType.GuildText)
			.setRequired(true)
	)
	.addStringOption(option =>
		option
			.setName('content')
			.setDescription('The content to forward')
			.setRequired(true)
	)

export async function execute(interaction: CommandInteraction) {
	if (!interaction.isChatInputCommand()) return

	const channel = interaction.options.getChannel('channel')
	const message = interaction.options.getString('content')

	if (channel === null || message === null) {
		return
	}

	if (!isValidHttpUrl(message)) {
		await interaction.reply({
			ephemeral: true,
			content: 'Can only forward valid URLs that contain http:// or https://',
		})
		return
	}

	await (channel as TextChannel).send(message)
	await interaction.reply({
		ephemeral: true,
		content: `Forwarded Link to specified channel ${channel.name}`,
	})
}
