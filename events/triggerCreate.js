/**
 * @file Fichier de gestionnaire de déclencheur principal. 
 * @author Saez#0001
 * @since 2.0.0
 * @version 1.0.0
 */

module.exports = {
	name: "messageCreate",

	/**
	 * @description S'exécute lorsqu'un message est créé et le gère.
	 * @author Saez#0001
	 * @param {import('discord.js').Message & { client: import('../typings').Client }} message Le message qui a été créé.
	 */

	async execute(message) {
		/**
		 * @description Le contenu du message du message reçu séparé par des espaces (' ') dans un tableau, cela exclut le préfixe et la commande/l'alias lui-même.
		 */

		const args = message.content.split(/ +/);

		// Vérifie si l'auteur du déclencheur est un bot. Commentez cette ligne si vous souhaitez également répondre aux bots.

		if (message.author.bot) return;

		// Vérification de TOUS les déclencheurs à l'aide de chaque fonction et déclenchement si un déclencheur a été trouvé.

		/**
		 * Vérifie si le message a un déclencheur.
		 * @type {Boolean}
		 * */

		let triggered = false;

		message.client.triggers.every((trigger) => {
			if (triggered) return false;

			trigger.name.every(async (name) => {
				if (triggered) return false;

				// S'il est validé, il essaiera d'exécuter le déclencheur.

				if (message.content.includes(name)) {
					try {
						trigger.execute(message, args);
					} catch (error) {
						// Si les déclencheurs échouent, répondez !

						console.error(error);

						message.reply({
							content: "une erreur s'est produite lors de la tentative d'exécution de ce déclencheur !",
						});
					}

					// Définissez le déclencheur sur true & return.

					triggered = true;
					return false;
				}
			});
		});
	},
};