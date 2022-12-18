import { Client, Events, Message } from 'discord.js'

export default (client: Client): void => {
	client.on(Events.MessageCreate, async (message: Message) => {
		if (message.author.bot) return

		if (message.content.toLowerCase().startsWith('hey google')) {
			const questions = [
				'what do you look like',
				'how old are you',
				'do you ever get tired',
				'thanks',
			]
			const answers = [
				'Imagine the feeling of a friendly hug combined with the sound of laughter. Add a librarian’s love of books, mix in a sunny disposition and a dash of unicorn sparkles, and voila!',
				'I was launched in 2021, so I am still fairly young. But I’ve learned so much!',
				'It would be impossible to tire of our conversation.',
				'You are welcome!',
			]
			console.log('Executing some confirmation')

			// send the message and wait for it to be sent
			const confirmation = await message.channel.send(
				`I'm listening, ${message.author.username}`
			)
			// filter checks if the response is from the author who typed the command
			const filter = (m: Message) => m.author.id === message.author.id
			// set up a message collector to check if there are any responses
			const collector = confirmation.channel.createMessageCollector({
				// set up the max wait time the collector runs (optional)
				filter,
				time: 60000,
			})

			// fires when a response is collected
			collector.on('collect', async (msg: Message) => {
				if (msg.content.toLowerCase().startsWith('what time is it')) {
					await message.channel.send(
						`The current time is ${new Date().toLocaleTimeString()}.`
					)
				}

				const index = questions.findIndex(q =>
					msg.content.toLowerCase().startsWith(q)
				)

				if (index >= 0) {
					await message.channel.send(answers[index])
				} else {
					await message.channel.send(`I don't have the answer for that...`)
				}
			})

			// fires when the collector is finished collecting
			collector.on('end', async (collected, reason) => {
				// only send a message when the "end" event fires because of timeout
				if (reason === 'time') {
					await message.channel.send(
						`${message.author.username}, it's been a minute without any question, so I'm no longer interested... 🙄`
					)
				}
			})
		}
	})
}
