/**
 * @file Message d'erreur par défaut sur l'interaction du bouton d'erreur
 * @author Saez#0001
 * @since 3.0.0
 */

module.exports = {
	/**
	 * @description S'exécute lorsque l'interaction du bouton n'a pas pu être récupérée.
	 * @author Saez#0001
	 * @param {import('discord.js').ButtonInteraction} interaction L'objet d'interaction de la commande.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "Un problème est survenu lors de la récupération de ce bouton !",
			ephemeral: true,
		});
		return;
	},
};