import { Client, CommandInteraction } from "discord.js";
import { Command } from "./Command";


export const Hello: Command ={
    name: 'hello',
    description: 'Returns a Greeting',
    type: 1,
    run: async (client: Client, interaction: CommandInteraction)  => {
        const content = 'Testing Commands'

        return await interaction.followUp({
            ephemeral: true,
            content
        })
    }
}