# Discord Spotify Bot

A simple Discord bot that plays songs and playlists (including Spotify) in a voice channel, utilizing `discord.js` and `discord-player`.

## Prerequisites

- Node.js 16.9.0 or higher
- A Discord Bot Token (Create an application at [Discord Developer Portal](https://discord.com/developers/applications) and get the bot token).

## Inviting the Bot to Your Server (Fixing Permissions)

If you are getting a "cannot recognize a voice server" error or the bot isn't responding, it is likely missing permissions on your server.

**To invite the bot correctly:**
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and select your application.
2. In the sidebar, go to **OAuth2 -> URL Generator**.
3. Under **SCOPES**, check `bot` AND `applications.commands`.
4. Under **BOT PERMISSIONS**, check:
   - Send Messages
   - View Channels
   - Connect
   - Speak
5. Copy the generated URL at the bottom and paste it into your browser to invite the bot.
*(Alternatively, simply use this URL replacing `YOUR_CLIENT_ID` with your Application ID: `https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=3148800&scope=bot%20applications.commands`)*

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
- `/join`: Make the bot join your voice channel.
- `/leave`: Make the bot leave your voice channel.
- `/play <query>`: Play a song or playlist (accepts Spotify URLs, YouTube URLs, or search terms).
- `/shuffle`: Shuffles the current queue.
- `/stop`: Stops the player and clears the queue.
- `/pause`: Pauses or resumes the currently playing track.

## Deployment Guide (Docker / Server)

The easiest way to deploy this bot to a server (like an Ubuntu VPS) is using Docker and Docker Compose.

### Server Requirements
1. A Linux server (e.g., Ubuntu, Debian)
2. [Git installed](https://git-scm.com/download/linux)
3. [Docker installed](https://docs.docker.com/engine/install/)
4. [Docker Compose installed](https://docs.docker.com/compose/install/)

### Deployment Steps
1. **Clone the repository to your server**:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd <YOUR_REPO_NAME>/discord-spotify-bot
   ```

2. **Set your environment variables**:
   Create a `.env` file in the same directory as `docker-compose.yml` to securely store your token.
   ```bash
   echo "DISCORD_TOKEN=your_token_here" > .env
   ```

3. **Start the bot**:
   Run the following command to build the Docker image and start the container in the background (`-d`).
   ```bash
   docker-compose up -d --build
   ```

4. **View logs (optional)**:
   If you want to ensure the bot started successfully, you can view the logs:
   ```bash
   docker-compose logs -f
   ```

5. **Stop the bot**:
   If you ever need to stop the bot:
   ```bash
   docker-compose down
   ```
