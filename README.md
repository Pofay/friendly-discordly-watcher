[![Banner](https://codecrafters.io/landing/images/byox-banner.gif?v=1)](https://codecrafters.io/github-banner)

## Building my own Discord Bot

This is part of my [build-your-own-x](https://github.com/codecrafters-io/build-your-own-x) weekly warmup and I've chosen to build a Discord bot based of this guide [**Node.js**: _Create a Discord bot_](https://discordjs.guide/)

## Progress

I've gotten a walking skeleton now XD.

I've also found a lot of my weaknesses from starting this project

Namely:

- Using a different environment than what was written in the [discord.js guide](https://discordjs.guide/creating-your-bot/) since I used Typescript instead of plain JavaScript for this project.
- Lack of Typescript familiarity (I assumed that I could wing it with my JS experience.)
- Lack of ESLint, Prettier and Husky Integration (I scoured through multiple sources just to get an environment that feels good enough to make this project which are listed below in the articles)
- Also encountered an issue with NodeJS imports resolution due to configuring my `tsconfig` to use a `baseUrl` to ditch relative imports. Ideally during build I expected those imports to return back to relative imports. Turns out you need a path remapper for that XD.

## Articles I've read to fix the environment issues

- [MODULE_NOT_FOUND when ts-node uses absolute imports](https://stackoverflow.com/questions/72600316/ts-node-module-not-found-when-using-absolute-imports-in-typescript)
- [How to use Typescript for Discord bots](https://sabe.io/tutorials/how-to-build-discord-bot-typescript)
- [Use Absolute imports in Typescript](https://khalilstemmler.com/blogs/typescript/absolute-file-path/)

## Gotchas that I've came across:

Missing Permissions and Intents are what caused friction when making this bot. I've encountered the following:

- Listening on `messageCreate` events. In order to enable this the client bot needs to have `GatewayIntentBits.GuildMessages` as part of its intents as well as permission to read messages from the Oauth 2 URL generator. [Source](https://stackoverflow.com/questions/66276582/discord-js-on-message-command-not-working)
- Replying on `messageCreate` events. To make this work `GatewayIntentBits` for `GuildMessageTyping` and `MessageContent` need to be passed in intents. You also have to enable `Rich Presence for Message Content` to prevent `message.content` from being null. [Source](https://stackoverflow.com/questions/73036854/message-content-doesnt-have-any-value-in-discord-js)
- As of what I've tried you can't send messages to threads directly. You have to use a Webhook as described in this [setup](https://discordjs.guide/popular-topics/webhooks.html#editing-webhooks) and giving the bot permission to `Manage Webhooks` in the Discord Developer Portal.

## Additional Learning

- Just found out that there is a `collector` object that listens for messages for a specified time. [Source](https://stackoverflow.com/questions/67760538/how-to-make-your-bot-to-listen-to-your-messages-after-you-entered-a-command)
