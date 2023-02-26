/**
 * @file Message d'erreur par défaut sur l'interaction modale d'erreur
 * @author Saez#0001
 * @since 3.2.0
 */

module.exports = {
	/**
	 * @description S'exécute lorsque l'interaction modale n'a pas pu être récupérée.
	 * @author Saez#0001
	 * @param {import('discord.js').ModalSubmitInteraction} interaction L'objet d'interaction de la commande.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "Un problème est survenu lors de la récupération de ce modal !",
			ephemeral: true,
		});
		return;
	},
};