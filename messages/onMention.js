/**
 * @file Commande de mention de bot par défaut
 * @author Saez#0001
 * @since 3.0.0
 */

const { prefix } = require("../config.json");

module.exports = {
	/**
	 * @description S'exécute lorsque le bot reçoit un ping.
	 * @author Saez#0001
	 * @param {import('discord.js').Message} message L'objet message de la commande.
	 */

	async execute(message) {
		return message.channel.send(
			`Salut ${message.author}! Mon prefix est \`${prefix}\`, faîte la commande \`${prefix}help\` pour voir l'intégralité des commandes disponibles`
		);
	},
};