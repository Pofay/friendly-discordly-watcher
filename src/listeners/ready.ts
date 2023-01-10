// import { Commands } from "commands/Command";
import { Client } from "discord.js"


export default (client: Client): void => {
    client.on('ready', async () => {
        if((client.user == null) || (client.application == null)) {
            return;
        }

        // await client.application.commands.set(Commands)

        console.log(`${client.user.username} is now online`);
    })
}