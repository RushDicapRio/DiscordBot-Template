/**
 * @file Sélectionner le gestionnaire d'interaction de menu
 * @author Saez#0001
 * @since 3.0.0
 * @version 1.0.0
 */

module.exports = {
	name: "interactionCreate",

	/**
	 * @description S'exécute lorsqu'une interaction est crée et la gère.
	 * @author Saez#0001
	 * @param {import('discord.js').SelectMenuInteraction & { client: import('../typings').Client }} interaction L'interaction crée
	 */

	async execute(interaction) {
		// Client déconstruit de l'objet d'interaction.
		const { client } = interaction;

		// Vérifie si l'interaction est une interaction de menu de sélection (pour éviter les bug étranges)

		if (!interaction.isAnySelectMenu()) return;

		const command = client.selectCommands.get(interaction.customId);

		// Si l'interaction n'est pas une commande dans le cache, renvoie un message d'erreur.
		// Vous pouvez modifier le message d'erreur dans le fichier ./messages/defaultSelectError.js !

		if (!command) {
			await require("../messages/defaultSelectError").execute(interaction);
			return;
		}

		// Une tentative d'exécution de l'interaction.

		try {
			await command.execute(interaction);
			return;
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "Un problème est survenu lors de l'exécution de cette option de menu de sélection !",
				ephemeral: true,
			});
			return;
		}
	},
};
