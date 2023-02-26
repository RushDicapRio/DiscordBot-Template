/**
 * @file Exemple d'interaction avec le menu contextuel du message
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
		type: 3, // 3 est pour les menus contextuels des messages
	},

	async execute(interaction) {
		await interaction.reply({
			content: "Je suis un exemple de menu contextuel de message.",
		});
		return;
	},
};