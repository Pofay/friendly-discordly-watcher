import {
	ChannelType,
	CommandInteraction,
	Message,
	SlashCommandBuilder,
	TextChannel,
} from 'discord.js'
import { isValidHttpUrl } from 'utils/url-verifier'

export const data = new SlashCommandBuilder()
	.setName('forward-links')
	.setDescription(
		'Forwards all succeeding links sent after this command to the specified channel for the next minute.'
	)
	.addChannelOption(option =>
		option
			.setName('channel')
			.setDescription('The channel to forward the links to.')
			.addChannelTypes(ChannelType.GuildText)
			.setRequired(true)
	)

export async function execute(interaction: CommandInteraction) {
	if (!interaction.isChatInputCommand()) return

	const channel = interaction.options.getChannel('channel')

	if (channel === null) {
		return
	}

	await interaction.reply({
		ephemeral: true,
		content: 'Now Forwarding given links to specified channel.',
	})

	const filter = (m: Message) => m.author.id === interaction.user.id
	// @ts-expect-error
	const collector = interaction.channel.createMessageCollector({
		filter,
		time: 60000,
	})

	collector.on('collect', async (msg: Message) => {
		if (!isValidHttpUrl(msg.content)) {
			await interaction.followUp({
				ephemeral: true,
				content: 'Can only forward valid URLs that contain http:// or https://',
			})
		} else {
			await (channel as TextChannel).send(msg.content)
		}
	})

	collector.on('end', async (collected, reason) => {
		await interaction.followUp({
			ephemeral: true,
			content: 'Stopped listening for links at this time.',
		})
	})
}
