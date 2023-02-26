/**
 * @file Exemple de commande de déclenchement.
 * @author Saez#0001
 * @since 2.0.0
 * @version 1.0.0
 */

// Pour l'instant, la seule propriété disponible est le tableau de noms. Ne pas créer le tableau de noms entraînera une erreur.

/**
 * @type {import('../../typings').TriggerCommand}
 */
module.exports = {
	name: ["your", "trigger", "words", "in", "array"],

	execute(message, args) {
		// Mettez tout votre code de déclenchement ici. Ce code sera exécuté lorsque l'un des éléments du tableau "name" sera trouvé dans le contenu du message.

		message.channel.send({
			content: " `Définissez cette réponse de déclenchement à partir de ./triggers/reactions/hello.js`",
		});
	},
};