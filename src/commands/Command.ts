import { ChatInputApplicationCommandData, Client, CommandInteraction, Message } from "discord.js";
import { Hello } from "./hello";

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => Promise<Message<boolean>>
}

export const Commands: Command[] = [Hello]