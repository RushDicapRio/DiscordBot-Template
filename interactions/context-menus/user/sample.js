/**
 * @file Exemple d'interaction du menu contextuel d'utilisation
 * @author Saez#0001
 * @since 3.0.0
 * @version 1.0.0
 */

/**
 * @type {import('../../../typings').ContextInteractionCommand}
 */
module.exports = {
	data: {
		name: "sample",
		type: 2, // 2 est pour les menus contextuels de l'utilisateur
	},

	async execute(interaction) {
		await interaction.reply({
			content: "Je suis un exemple de menu contextuel utilisateur.",
		});
		return;
	},
};