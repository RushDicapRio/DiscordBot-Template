/**
 * @file Exemple d'interaction avec un bouton
 * @author Naman Vrati
 * @since 3.0.0
 * @version 1.0.0
 */

/**
 * @type {import('../../../typings').ButtonInteractionCommand}
 */
module.exports = {
	id: "sample",

	async execute(interaction) {
		await interaction.reply({
			content: "Ceci était une réponse du gestionnaire de boutons !",
		});
		return;
	},
};