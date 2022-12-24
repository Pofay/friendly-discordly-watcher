import { AppState } from 'AppState'
import {
	Client,
	CommandInteraction,
	Message,
	TextChannel,
	ThreadChannel,
} from 'discord.js'
import { Command } from './Command'

export const ForwardLinks: Command = {
	name: 'forward-links',
	description:
		'Starts forwarding links for the next minute from source channel to destination channel',
	type: 1,
	run: async (client: Client, interaction: CommandInteraction) => {
		const serverSettings = AppState.get(interaction.guildId ?? '')
		if (serverSettings === null || serverSettings === undefined) {
			await interaction.reply({
				ephemeral: true,
				content: 'Please run /bot-setup command to setup the bot properly',
			})
		} else {
			if (interaction.channelId !== serverSettings.sourceChannel) {
				await interaction.reply({
					ephemeral: true,
					content:
						'This is not a source channel. In case you forgot the bot settings please execute /settings',
				})
			} else {
				await interaction.reply({
					ephemeral: true,
					content: `Now forwarding links from this channel to destination channel.`,
				})

				// Create a Thread in Destination Channel with title of `${currentDate.ISOString()}`
				// @ts-expect-error
				const destinationChannel: TextChannel =
					// @ts-expect-error
					await interaction.guild.channels.cache
						.filter(
							c => c.type === 0 && c.id === serverSettings.destinationChannel
						)
						.first()

				const thread: ThreadChannel = await destinationChannel.threads.create({
					name: new Date().toISOString(),
					autoArchiveDuration: 60,
					reason: `User ${interaction.user.username} has requested to forward links to a separate thread`,
				})

				// Should check if webhook is null
				// Webhook setup can be done inside bot-setup
				const channelWebhooks = await destinationChannel.fetchWebhooks()
				const botWebhook = channelWebhooks.first()
				if (botWebhook === undefined) {
					await interaction.followUp({
						ephemeral: true,
						content: `Please set a webhook on the destination channel: ${destinationChannel.name}`,
					})
					return
				}

				const filter = (m: Message) => m.author.id === interaction.user.id
				// @ts-expect-error
				const collector = interaction.channel.createMessageCollector({
					filter,
					time: 60000,
				})

				collector.on('collect', async (msg: Message) => {
					console.log('Collecting Messages')
					if (msg.content.includes('https://')) {
						await botWebhook.send({
							threadId: thread.id,
							content: msg.content,
						})
					}
				})

				collector.on('end', async (collected, reason) => {
					console.log('Stop Collecting Messages')
					await thread.setArchived(true)
					await interaction.followUp({
						ephemeral: true,
						content: 'Stopped listening for links at this time.',
					})
				})
			}
		}
	},
}
