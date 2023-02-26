/**
 * @file Exemple d'interaction Sélectionner-Menu
 * @author Saez#0001
 * @since 3.0.0
 * @version 1.0.0
 */

/**
 * @type {import('../../../typings').SelectInteractionCommand}
 */
module.exports = {
	id: "sample",

	async execute(interaction) {
		await interaction.reply({
			content: "Ceci était une réponse du gestionnaire de menu sélectionné !",
		});
		return;
	},
};