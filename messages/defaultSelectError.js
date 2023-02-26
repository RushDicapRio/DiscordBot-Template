/**
 * @file Message d'erreur par défaut en cas d'erreur Sélectionner l'interaction du menu
 * @author Saez#0001
 * @since 3.0.0
 */

module.exports = {
	/**
	 * @description S'exécute lorsque l'interaction du menu de sélection n'a pas pu être récupérée.
	 * @author Saez#0001
	 * @param {import('discord.js').SelectMenuInteraction} interaction L'objet d'interaction de la commande.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "Un problème est survenu lors de la récupération de cette option de menu de sélection !",
			ephemeral: true,
		});
		return;
	},
};