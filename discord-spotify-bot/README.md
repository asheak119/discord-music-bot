# Discord Spotify Bot

A simple Discord bot that plays songs and playlists (including Spotify) in a voice channel, utilizing `discord.js` and `discord-player`.

## Prerequisites

- Node.js 16.9.0 or higher
- A Discord Bot Token (Create an application at [Discord Developer Portal](https://discord.com/developers/applications) and get the bot token).

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the bot:
   Before running the bot, make sure to set the `DISCORD_TOKEN` environment variable.

   **Linux/macOS:**
   ```bash
   DISCORD_TOKEN=your_token_here node index.js
   ```

   **Windows (Command Prompt):**
   ```cmd
   set DISCORD_TOKEN=your_token_here
   node index.js
   ```

   **Windows (PowerShell):**
   ```powershell
   $env:DISCORD_TOKEN="your_token_here"
   node index.js
   ```

## Commands
- `/play <query>`: Play a song or playlist (accepts Spotify URLs, YouTube URLs, or search terms).
- `/shuffle`: Shuffles the current queue.
- `/stop`: Stops the player and clears the queue.
- `/pause`: Pauses or resumes the currently playing track.
