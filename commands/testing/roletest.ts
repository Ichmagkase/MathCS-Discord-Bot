import { SlashCommandBuilder, ChatInputCommandInteraction, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, MessageFlags, type ActionRowData } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("roletest").setDescription("Test role Selection"),
  async execute(interaction: ChatInputCommandInteraction) {
    console.log("Command executed")
    const selection = new StringSelectMenuBuilder()
      .setCustomId("role-selection")
      .setPlaceholder("Select your roles")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("DEFCON")
          .setDescription("Meetings and events hosted by our local DEFCON group")
          .setValue("defcon-role")
          .setEmoji({
            id: "1421527223466463364",
            name: "dcg570",
            animated: false,
          }),
        new StringSelectMenuOptionBuilder()
          .setLabel("Crown of the Nerds")
          .setDescription("Organization details for Crown of the Nerds")
          .setValue("cotn-role")
          .setEmoji("👑"),
        new StringSelectMenuOptionBuilder()
          .setLabel("ICPC")
          .setDescription("Notifications for ICPC participants")
          .setValue("icpc-role")
          .setEmoji({
            id: "1421528295031308409",
            name: "icpc",
            animated: false
          }),
        new StringSelectMenuOptionBuilder()
          .setLabel("Hackathons")
          .setDescription("Notifications for hackathons")
          .setValue("hackathon-role")
          .setEmoji({
            id: "1421528850688512030",
            name: "cmatrix",
            animated: true
          }),
        new StringSelectMenuOptionBuilder()
          .setLabel("Integration Bee")
          .setDescription("Notifications and event details for the integration bee")
          .setValue("ibee-role")
          .setEmoji("➕"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Game Jams")
          .setDescription("Notifications for potential game jams being organized")
          .setValue("games-role")
          .setEmoji("🎮"),
      );
    const actions = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selection);

    await interaction.reply({
      content: 'Select an Option',
      components: [actions],
    });
  }
}
