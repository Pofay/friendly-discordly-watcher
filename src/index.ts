import { Client, GatewayIntentBits } from 'discord.js'
import * as dotenv from 'dotenv'
import interactionCreate from 'listeners/interactionCreate'
import ready from 'listeners/ready'

dotenv.config()

const TOKEN = process.env.DISCORD_TOKEN ?? ''

console.log('Bot is starting')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.MessageContent,
	],
})

ready(client)
interactionCreate(client)

client.login(TOKEN).catch(error => console.error(error))
