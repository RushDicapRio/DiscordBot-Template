/**
 * @file Exemple de commande ping
 * @author Saez#0001
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "ping",

	execute(message, args) {
		message.channel.send({ content: "Pong." });
	},
};