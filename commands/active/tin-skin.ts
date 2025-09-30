import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js"

export default {
  data: new SlashCommandBuilder().setName("tin-skin").setDescription("Insult the bot"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("[Member added to list]").catch(console.error);
  },
};

