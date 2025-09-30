// Include necessary discord.js classes
import * as fs from 'fs';
import * as path from 'path';
import config from "./config.json" with { type: "json" };
import {
  Role,
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
  type ApplicationCommandDataResolvable,
  MessageFlags,
  StringSelectMenuInteraction,
  CommandInteraction,
  ChatInputCommandInteraction,
} from "discord.js";
import type { argv0 } from 'process';

// Get running directory name
const __dirname = import.meta.dirname

// Create a new client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
    // GatewayIntentBits.GuildMessages,          // Create, update, delete messages
    // GatewayIntentBits.GuildMessageReactions,  // Add/remove reactions
    // GatewayIntentBits.MessageContent,         // Message Contents
    // GatewayIntentBits.GuildMessagePolls       // Add/delete Polls
  ]
});

// Add One-time event listener for client on-ready
client.once(Events.ClientReady, readyClient => {
  console.log(`Ready as ${readyClient.user.username}`);
});

async function registerSlashCommands(commandsArray: ApplicationCommandDataResolvable[], commandStatus: "active" | "testing" | "utility" | "inactive") {
  if (commandStatus === "inactive") {
    console.log('Ignoring commands labeled "Inactive"');
    return;
  }

  try {
    let data: any;
    console.log(`Started refreshing ${commandsArray.length} commands with status ${commandStatus}`);
    const discordRestApi = new REST().setToken(config.token);
    if (commandStatus === "active") {
      data = await discordRestApi.put(
        Routes.applicationGuildCommands(config.clientId, config.mathCsGuildId),
        { body: commandsArray },
      );
    }
    else {
      data = await discordRestApi.put(
        Routes.applicationGuildCommands(config.clientId, config.devGuildId),
        { body: commandsArray }
      );
    }
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);

  } catch (error) {
    console.error(error);
  }
};

// Load slash commands
async function loadSlashCommands() {
  let commandRegistrationQueue: ApplicationCommandDataResolvable[];
  client.commands = new Collection();
  const commandFolderPath = path.join(__dirname, "commands");
  const commandFolderContents = fs.readdirSync(commandFolderPath);

  for (const commandFolder of commandFolderContents) {
    commandRegistrationQueue = [];
    const commandSubdirPath = path.join(commandFolderPath, commandFolder);
    const commandSubdirContents = fs.readdirSync(commandSubdirPath);

    for (const commandPath of commandSubdirContents) {
      const commandBody = await import(path.join(commandSubdirPath, commandPath));
      if ('data' in commandBody.default && 'execute' in commandBody.default) {
        client.commands.set(commandBody.default.data.name, commandBody.default);
        commandRegistrationQueue.push(commandBody.default.data);
      } else {
        console.log(`[WARNING] The command at ${commandPath} is missing a required "data" or "execute" property`);
      }
    }
    console.log(commandFolder);
    registerSlashCommands(commandRegistrationQueue, commandFolder as "active" | "testing" | "utility" | "inactive");
  }
};

// Listen for interactions
client.on(Events.InteractionCreate, async interaction => {
  console.log(interaction);
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No matching ${interaction.commandName} found`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command ', flags: MessageFlags.Ephemeral });
      } else {
        await interaction.followUp({ content: 'There was an error while executing this command ', flags: MessageFlags.Ephemeral });
      }
    }
  } else if (interaction.isStringSelectMenu()) {
    const rolevalue = interaction.values[0];
    if (rolevalue == undefined) return;
    const role = interaction.guild?.roles.cache.get(rolevalue);
    await interaction.guild?.members.fetch(interaction.member?.user.id);


    console.log("Role selection sent");
  }
});

// Start bot with token
loadSlashCommands();
client.login(config.token);
