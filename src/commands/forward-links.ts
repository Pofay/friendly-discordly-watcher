import { AppState } from 'AppState'
import { Client, CommandInteraction, Message } from 'discord.js'
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

				// filter checks if the response is from the author who typed the command
				const filter = (m: Message) => m.author.id === interaction.user.id

				// set up a message collector to check if there are any responses
				// @ts-expect-error
				const collector = interaction.channel.createMessageCollector({
					// set up the max wait time the collector runs (optional)
					filter,
					time: 60000,
				})

				// fires when a response is collected
				collector.on('collect', async (msg: Message) => {
					console.log(msg.content)
				})

				// fires when the collector is finished collecting
				collector.on('end', async (collected, reason) => {
					// only send a message when the "end" event fires because of timeout
					console.log('Passed a minute.')
				})
			}
		}
	},
}
