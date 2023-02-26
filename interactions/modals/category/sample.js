/**
 * @file Exemple d'interaction modale
 * @author Saez#0001
 * @since 3.2.0
 * @version 1.0.0
 */

/**
 * @type {import('../../../typings').ModalInteractionCommand}
 */
module.exports = {
	id: "sample",

	async execute(interaction) {
		await interaction.reply({
			content: "Ceci était une réponse du gestionnaire modal !",
		});
		return;
	},
};