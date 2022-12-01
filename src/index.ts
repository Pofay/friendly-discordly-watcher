import { Client, GatewayIntentBits } from 'discord.js'
import * as dotenv from 'dotenv'
import ready from 'listeners/ready'

dotenv.config()

const TOKEN = process.env.DISCORD_TOKEN ?? ''

console.log('Bot is starting')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
ready(client)

client.login(TOKEN).catch(error => console.error(error))
