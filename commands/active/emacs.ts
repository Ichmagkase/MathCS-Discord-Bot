import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js"

export default {
  data: new SlashCommandBuilder().setName("emacs").setDescription("Start a holy war"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("vim").catch(console.error);
  },
};

