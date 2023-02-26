/**
 * @file Gestionnaire d'interaction de saisie semi-automatique
 * @author Saez#0001
 * @since 3.3.0
 * @version 1.0.0
 */
module.exports = {
	name: "interactionCreate",

	/**
	 * @description S'exécute lorsqu'une interaction est crée et la gère.
	 * @author Saez#0001
	 * @param {import('discord.js').AutocompleteInteraction & { client: import('../typings').Client }} interaction L'interaction crée
	 */

	async execute(interaction) {
		// Client déconstruit de l'objet d'interaction.
		const { client } = interaction;

		// Vérifie si l'interaction est une interaction de saisie semi-automatique (pour éviter les bugs étranges)

		if (!interaction.isAutocomplete()) return;

		// Vérifie si la requête est disponible dans notre code.

		const request = client.autocompleteInteractions.get(
			interaction.commandName
		);

		// Si l'interaction n'est pas une demande dans le cache, retournez.

		if (!request) return;

		// Une tentative d'exécution de l'interaction.

		try {
			await request.execute(interaction);
		} catch (err) {
			console.error(err);
		}

		return;
	},
};