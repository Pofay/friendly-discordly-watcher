import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
	.setName('user')
	.setDescription('Provides info about User')

export const execute = async (interaction: CommandInteraction) =>
	await interaction.reply(`Command was run by ${interaction.user.username}`)
