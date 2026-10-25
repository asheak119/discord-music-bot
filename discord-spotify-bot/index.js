const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');
const fs = require('fs');

// Initialize Discord Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Initialize Player
const player = new Player(client);

async function initBot() {
    try {
        await player.extractors.loadMulti(DefaultExtractors);
        console.log('Extractors loaded successfully.');
    } catch (e) {
        console.error('Failed to load extractors:', e);
    }
}

initBot();

client.on('error', console.error);

process.on('unhandledRejection', error => console.error('Unhandled promise rejection:', error));
player.events.on('error', (queue, error) => {
    console.log(`Error emitted from the queue: ${error.message}`);
});
player.events.on('playerError', (queue, error) => {
    console.log(`Error emitted from the player: ${error.message}`);
});

const commands = [
    {
        name: 'join',
        description: 'Join the voice channel',
    },
    {
        name: 'leave',
        description: 'Leave the voice channel',
    },
    {
        name: 'play',
        description: 'Play a song or playlist from Spotify, YouTube, etc.',
        options: [
            {
                name: 'query',
                type: 3, // STRING
                description: 'The song link or search query',
                required: true,
            },
        ],
    },
    {
        name: 'shuffle',
        description: 'Shuffle the current queue',
    },
    {
        name: 'stop',
        description: 'Stop the player and clear the queue',
    },
    {
        name: 'pause',
        description: 'Pause or resume the current song',
    },
];

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'join') {
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply({ content: 'You are not connected to a voice channel!', ephemeral: true });

        await interaction.deferReply();
        try {
            await player.voiceUtils.join(channel);
            return interaction.followUp('Joined the voice channel!');
        } catch (e) {
            return interaction.followUp('Failed to join voice channel.');
        }
    }

    if (commandName === 'leave') {
        await interaction.deferReply();
        const queue = player.nodes.get(interaction.guildId);
        if (queue) {
            queue.delete();
        } else {
            try {
                player.voiceUtils.disconnect(interaction.guildId);
            } catch (e) {}
        }
        return interaction.followUp('Left the voice channel!');
    }

    if (commandName === 'play') {
        const query = interaction.options.getString('query');
        const channel = interaction.member.voice.channel;

        if (!channel) {
            return interaction.reply({ content: 'You are not connected to a voice channel!', ephemeral: true });
        }

        await interaction.deferReply();

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    metadata: interaction,
                    leaveOnEmpty: false,
                    leaveOnEnd: false,
                    leaveOnStop: true
                }
            });

            return interaction.followUp(`**${track.title}** enqueued!`);
        } catch (e) {
            console.error(e);
            return interaction.followUp(`Something went wrong: ${e.message}`);
        }
    }

    if (commandName === 'shuffle') {
        await interaction.deferReply();
        const queue = player.nodes.get(interaction.guildId);
        if (!queue || !queue.isPlaying()) return interaction.followUp('No music is currently playing.');
        queue.tracks.shuffle();
        return interaction.followUp('Queue shuffled!');
    }

    if (commandName === 'stop') {
        await interaction.deferReply();
        const queue = player.nodes.get(interaction.guildId);
        if (!queue || !queue.isPlaying()) return interaction.followUp('No music is currently playing.');
        queue.delete();
        return interaction.followUp('Stopped the player and cleared the queue.');
    }

    if (commandName === 'pause') {
        await interaction.deferReply();
        const queue = player.nodes.get(interaction.guildId);
        if (!queue || !queue.isPlaying()) return interaction.followUp('No music is currently playing.');
        const paused = queue.node.setPaused(!queue.node.isPaused());
        return interaction.followUp(paused ? 'Paused the music.' : 'Resumed the music.');
    }
});

client.login(process.env.DISCORD_TOKEN);
