import * as commandModules from 'commands'
import { REST, Routes } from 'discord.js'
import * as dotenv from 'dotenv'

dotenv.config()

const TOKEN = process.env.DISCORD_TOKEN ?? ''
const CLIENT_ID = process.env.CLIENT_ID ?? ''
const GUILD_ID = process.env.GUILD_ID ?? ''

type Command = {
	data: unknown
}

const slashCommands = []

for (const module of Object.values<Command>(commandModules)) {
	slashCommands.push(module.data)
}

const rest = new REST({ version: '10' }).setToken(TOKEN)

rest
	.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
		body: slashCommands,
	})
	.then(() => console.log('Successfully Registered application commands'))
	.catch(console.error)
