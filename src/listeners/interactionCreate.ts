import { Commands } from 'commands/Command'
import { Client, CommandInteraction, Interaction } from 'discord.js'

export default (client: Client): void => {
	client.on('interactionCreate', async (interaction: Interaction) => {
		if (interaction.isCommand() || interaction.isContextMenuCommand()) {
			await handleSlashCommand(client, interaction)
		}
	})
}

const handleSlashCommand = async (
	client: Client,
	interaction: CommandInteraction
) => {

    const slashCommand = Commands.find(c => c.name === interaction.commandName)
    if(slashCommand == null) {
        await interaction.followUp({ content: 'Cannot run command given'})
    }

    await interaction.deferReply();

    await slashCommand?.run(client, interaction)
}
