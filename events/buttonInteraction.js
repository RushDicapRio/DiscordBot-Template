/**
 * @file Gestionnaire d'interaction de bouton
 * @author Saez#0001
 * @since 3.0.0
 * @version 1.0.0
 */

const { InteractionType, ComponentType } = require("discord-api-types/v10");

module.exports = {
	name: "interactionCreate",

	/**
	 * @description S'exécute lorsqu'une interaction est crée et la gère.
	 * @author Saez#0001
	 * @param {import('discord.js').ButtonInteraction & { client: import('../typings').Client }} interaction L'interaction crée
	 */

	async execute(interaction) {
		// Client déconstruit de l'objet d'interaction.
		const { client } = interaction;

		// Vérifie si l'interaction est une interaction de bouton (pour éviter les bugs étranges)
		
		if (!interaction.isButton()) return;

		const command = client.buttonCommands.get(interaction.customId);

		// Si l'interaction n'est pas une commande dans le cache, renvoie un message d'erreur.
		// Vous pouvez modifier le message d'erreur dans le fichier ./messages/defaultButtonError.js !

		if (!command) {
			await require("../messages/defaultButtonError").execute(interaction);
			return;
		}

		// Une tentative d'exécution de l'interaction.

		try {
			await command.execute(interaction);
			return;
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "Un problème est survenu lors de l'exécution de ce bouton !",
				ephemeral: true,
			});
			return;
		}
	},
};