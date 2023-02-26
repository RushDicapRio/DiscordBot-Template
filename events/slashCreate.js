/**
 * @file Gestionnaire d'interaction de commande Slash
 * @author Saez#0001
 * @since 3.0.0
 * @version 1.0.0
 */

module.exports = {
	name: "interactionCreate",

	/**
	 * @description S'exécute lorsqu'une interaction est crée et la gère.
	 * @author Saez#0001
	 * @param {import('discord.js').CommandInteraction & { client: import('../typings').Client }} interaction L'interaction crée
	 */

	async execute(interaction) {
		// Client déconstruit de l'objet d'interaction.
		const { client } = interaction;

		// Vérifie si l'interaction est une commande (pour éviter les bug étranges)

		if (!interaction.isChatInputCommand()) return;

		const command = client.slashCommands.get(interaction.commandName);

		// Si l'interaction n'est pas une commande dans le cache.

		if (!command) return;

		// Une tentative d'exécution de l'interaction.

		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "Il y a eu un problème lors de l'exécution de cette commande !",
				ephemeral: true,
			});
		}
	},
};