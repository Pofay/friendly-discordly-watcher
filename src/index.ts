import { Client, GatewayIntentBits } from 'discord.js'
import * as dotenv from 'dotenv'
import interactionCreate from 'listeners/interactionCreate'
import onMessageSubmit from 'listeners/onMessageSubmit'
import onModalSubmit from 'listeners/onModalSubmit'
import onSelectMenuInteraction from 'listeners/onSelectMenuInteraction'
import ready from 'listeners/ready'

dotenv.config()

const TOKEN = process.env.DISCORD_TOKEN ?? ''

console.log('Bot is starting')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

ready(client)
interactionCreate(client)
onModalSubmit(client)
onSelectMenuInteraction(client)
onMessageSubmit(client)

client.login(TOKEN).catch(error => console.error(error))
