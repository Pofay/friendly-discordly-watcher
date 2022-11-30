import { Client, Events, GatewayIntentBits } from 'discord.js'
import * as dotenv from 'dotenv'

dotenv.config()

const TOKEN = process.env.DISCORD_TOKEN || ''

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.login(TOKEN).catch(error => console.error(error))
