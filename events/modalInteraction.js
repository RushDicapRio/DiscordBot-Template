/**
 * @file Gestionnaire d'interaction modale
 * @author Saez#0001
 * @since 3.2.0
 * @version 1.0.0
 */

const { InteractionType } = require("discord-api-types/v10");

module.exports = {
	name: "interactionCreate",

	/**
	 * @description S'exécute lorsqu'une interaction est crée et la gère.
	 * @author Saez#0001
	 * @param {import('discord.js').Interaction & { client: import('../typings').Client }} interaction L'interaction crée
	 */

	async execute(interaction) {
		// Client déconstruit de l'objet d'interaction.
		const { client } = interaction;

		// Vérifie si l'interaction est une interaction modale (pour éviter les bugs étranges)

		if (!interaction.isModalSubmit()) return;

		const command = client.modalCommands.get(interaction.customId);

		// Si l'interaction n'est pas une commande dans le cache, renvoie un message d'erreur.
		// Vous pouvez modifier le message d'erreur dans le fichier ./messages/defaultModalError.js !

		if (!command) {
			await require("../messages/defaultModalError").execute(interaction);
			return;
		}

		// Une tentative d'exécution de l'interaction.

		try {
			await command.execute(interaction);
			return;
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "Un problème est survenu lors de la compréhension de ce mode !",
				ephemeral: true,
			});
			return;
		}
	},
};