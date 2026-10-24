const { Client, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
const player = new Player(client);

async function test() {
  await player.extractors.loadMulti(DefaultExtractors);
  console.log('Extractors loaded:', player.extractors.store.size);
  process.exit(0);
}

test();
