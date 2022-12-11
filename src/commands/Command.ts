import {
	ChatInputApplicationCommandData,
	Client,
	CommandInteraction,
} from 'discord.js'
import { Hello } from './hello'
import { BotSetup } from './bot-setup'

export interface Command extends ChatInputApplicationCommandData {
	run: (client: Client, interaction: CommandInteraction) => any
}

export const Commands: Command[] = [Hello, BotSetup]
