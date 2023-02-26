/**
 * @file Exemple d'interaction de saisie semi-automatique
 * @author Saez#0001
 * @since 3.3.0
 * @version 1.0.0
 */

/**
 * @type {import("../../../typings").AutocompleteInteraction}
 */
module.exports = {
	name: "sample",

	async execute(interaction) {
		// Préparation de la demande de saisie semi-automatique.

		const focusedValue = interaction.options.getFocused();

		// Extrayez automatiquement les choix de votre tableau de choix (peut également être dynamique) !

		const choices = ["your", "choices"];

		// Filtrer les choix en fonction de l'entrée de l'utilisateur.

		const filtered = choices.filter((choice) =>
			choice.startsWith(focusedValue)
		);

		// Répondez à la demande ici.
		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice }))
		);

		return;
	},
};