import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js"

export default {
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong"),
  async execute(interaction: ChatInputCommandInteraction) {
    console.log("pong");
    await interaction.reply("Pong").catch(console.error);
  },
};

