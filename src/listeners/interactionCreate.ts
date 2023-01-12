import { Client, CommandInteraction, Interaction } from 'discord.js'
import * as commandModules from 'commands'

export default (client: Client): void => {
	client.on('interactionCreate', async (interaction: Interaction) => {
		if (interaction.isCommand() || interaction.isContextMenuCommand()) {
			await handleSlashCommand(client, interaction)
		}
	})
}

const commands = Object(commandModules)

const handleSlashCommand = async (
	client: Client,
	interaction: CommandInteraction
) => {
	const { commandName } = interaction
	commands[commandName].execute(interaction)
}
