import SlashCommandBuilder from "discord.js"

ping = {
  data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with pong'),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};

export ping;
