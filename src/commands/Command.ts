import {
	ChatInputApplicationCommandData,
	Client,
	CommandInteraction,
} from 'discord.js'
import { Hello } from './hello'
import { BotSetup } from './bot-setup'
import { ForwardLinks } from './forward-links'

export interface Command extends ChatInputApplicationCommandData {
	run: (client: Client, interaction: CommandInteraction) => any
}

export const Commands: Command[] = [Hello, BotSetup, ForwardLinks]
