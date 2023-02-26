/**
 * @file Fichier d'événement prêt.
 * @author Saez#0001
 * @since 1.0.0
 * @version 1.0.0
 */

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description S'exécute lorsque le client est prêt (initialisation du bot).
	 * @param {import('../typings').Client} client Client d'application principal.
	 */
	execute(client) {
		console.log(`Prêt ! Connecté en tant que ${client.user.tag}`);
	},
};
