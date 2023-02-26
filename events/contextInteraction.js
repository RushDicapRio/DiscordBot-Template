/**
 * @file Gestionnaire d'interaction contextuelle
 * @author Saez#0001
 * @since 3.0.0
 * @version 1.0.0
 */

module.exports = {
	name: "interactionCreate",

	/**
	 * @description S'exécute lorsqu'une interaction est crée et la gère.
	 * @author Saez#0001
	 * @param {import('discord.js').ContextMenuCommandInteraction & { client: import('../typings').Client }} interaction L'interaction crée
	 */

	execute: async (interaction) => {
		// Client déconstruit de l'objet d'interaction.
		const { client } = interaction;

		// Vérifie si l'interaction est une interaction contextuelle (pour éviter les bugs étranges)

		if (!interaction.isContextMenuCommand()) return;

		/**********************************************************************/

		// Vérifie si la cible de l'interaction était un utilisateur

		if (interaction.isUserContextMenuCommand()) {
			const command = client.contextCommands.get(
				"USER " + interaction.commandName
			);

			// Une tentative d'exécution de l'interaction.

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "Il y a eu un problème lors de l'exécution de cette commande de contexte !",
					ephemeral: true,
				});
				return;
			}
		}
		// Vérifie si la cible de l'interaction était un utilisateur
		else if (interaction.isMessageContextMenuCommand()) {
			const command = client.contextCommands.get(
				"MESSAGE " + interaction.commandName
			);

			// Une tentative d'exécution de l'interaction.

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "Un problème est survenu lors de l'exécution de cette commande de contexte !",
					ephemeral: true,
				});
				return;
			}
		}

		// Pratiquement pas possible, mais nous mettons toujours le bug en cache.
		// Le correctif possible est un redémarrage !
		else {
			return console.log(
				"Quelque chose de bizarre se passe dans le menu contextuel. Reçu un menu contextuel de type inconnu."
			);
		}
	},
};