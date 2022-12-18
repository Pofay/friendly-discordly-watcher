export interface DiscordBotState {
	sourceChannel: string
	destinationChannel: string
}

export const AppState = new Map<string, DiscordBotState>()
