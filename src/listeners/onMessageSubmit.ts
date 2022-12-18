import { Client, Message } from 'discord.js'

export default (client: Client): void => {
	client.on('message', async (message: Message) => {
		console.log(message)
	})
}
