import { Client, CommandInteraction, Interaction } from 'discord.js'
import * as commandModules from 'commands'

export default (client: Client): void => {
	client.on('interactionCreate', async (interaction: Interaction) => {
		if (interaction.isCommand() || interaction.isContextMenuCommand()) {
			await handleSlashCommand(client, interaction)
		}
	})
}

// const commands = Object(commandModules)

const handleSlashCommand = async (
	client: Client,
	interaction: CommandInteraction
) => {
	const { commandName } = interaction
	if (commandName === 'forward-link') {
		await commandModules.forwardLink.execute(interaction)
	} else if (commandName === 'forward-links') {
		await commandModules.forwardLinks.execute(interaction)
	} else {
		await interaction.reply({
			ephemeral: true,
			content: 'Cannot execute command given.',
		})
	}
}
