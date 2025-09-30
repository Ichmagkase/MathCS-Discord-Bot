import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js"

export default {
  data: new SlashCommandBuilder().setName("vim").setDescription("Start a holy war"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("emacs").catch(console.error);
  },
};

