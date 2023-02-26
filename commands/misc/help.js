/**
 * @file Commande d'aide dynamique
 * @author Saez#0001
 * @since 1.0.0
 * @version 1.0.0
 */

// Déconstruction du préfixe du fichier de configuration à utiliser dans la commande d'aide
const { prefix } = require("./../../config.json");

// Déconstruire EmbedBuilder pour créer des intégrations dans cette commande
const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "help",
	description: "Répertorier toutes les commandes du bot ou des informations sur une commande spécifique.",
	aliases: ["commands"],
	usage: "[command name]",
	cooldown: 5,

	execute(message, args) {
		const { commands } = message.client;

		// S'il n'y a pas d'arguments, cela signifie qu'il a besoin de toute la commande d'aide.

		if (!args.length) {
			/**
			 * @type {EmbedBuilder}
			 * @description Commande d'aide incorporer l'objet
			 */

			let helpEmbed = new EmbedBuilder()
				.setColor("Random")
				.setTitle("Liste de toutes mes commandes")
				.setDescription(
					"`" + commands.map((command) => command.name).join("`, `") + "`"
				)

				.addFields([
					{
						name: "Usage",
						value: `\nVous pouvez envoyer \`${prefix}help [nom de la commande]\` pour obtenir des informations sur une commande spécifique !`,
					},
				]);

			// Tentatives d'envoi d'intégration dans les DM.

			return message.author
				.send({ embeds: [helpEmbed] })

				.then(() => {
					if (message.channel.type === ChannelType.DM) return;

					// Après validation, répondez.

					message.reply({
						content: "Je t'ai envoyé un DM avec toutes mes commandes !",
					});
				})
				.catch((error) => {
					// En cas d'échec, lancer une erreur.

					console.error(
						`Impossible d'envoyer le DM d'aide à ${message.author.tag}.\n`,
						error
					);

					message.reply({ content: "Il semble que je ne peux pas vous DM !" });
				});
		}

		// Si l'argument est fourni, vérifiez s'il s'agit d'une commande.

		/**
		 * @type {String}
		 * @description Premier argument en toLowerCase
		 */

		const name = args[0].toLowerCase();

		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));

		// Si c'est une commande invalide.

		if (!command) {
			return message.reply({ content: "Ce n'est pas une commande valide !" });
		}

		/**
		 * @type {EmbedBuilder}
		 * @description Incorporation de la commande d'aide pour une commande spécifique.
		 */

		let commandEmbed = new EmbedBuilder()
			.setColor("Random")
			.setTitle("Commande Help");

		if (command.description)
			commandEmbed.setDescription(`${command.description}`);

		if (command.aliases)
			commandEmbed.addFields([
				{
					name: "Aliases",
					value: `\`${command.aliases.join(", ")}\``,
					inline: true,
				},
				{
					name: "Cooldown",
					value: `${command.cooldown || 3} second(s)`,
					inline: true,
				},
			]);
		if (command.usage)
			commandEmbed.addFields([
				{
					name: "Usage",
					value: `\`${prefix}${command.name} ${command.usage}\``,
					inline: true,
				},
			]);

		// Enfin, envoyez l'intégration.

		message.channel.send({ embeds: [commandEmbed] });
	},
};