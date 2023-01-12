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

	if (channel.type !== ChannelType.GuildText) {
		await interaction.reply({
			ephemeral: true,
			content: 'The channel selected should be a Text Channel.',
		})
	}

	if (!isValidHttpUrl(message)) {
		await interaction.reply({
			ephemeral: true,
			content:
				'Can only forward valid URLs e.g http://google.com or https://yahoo.com.',
		})
	}

	await (channel as TextChannel).send(message)
}
