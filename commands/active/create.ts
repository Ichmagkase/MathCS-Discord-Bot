import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js"

export default {
  data: new SlashCommandBuilder().setName("create").setDescription("Build a groundbreaking next-gen application"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("Your app is hosted here: http://localhost:80").catch(console.error);
  },
};

