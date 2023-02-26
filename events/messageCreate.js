/**
 * @file Gestionnaire de commandes basées sur les messages
 * @author Saez#0001
 * @since 1.0.0
 * @version 1.0.0
 */

// Déclare les constantes (déstructurées) à utiliser dans ce fichier.

const { Collection, ChannelType } = require("discord.js");
const { prefix, owner } = require("../config.json");

// Préfixe regex, nous utiliserons pour faire correspondre le préfixe de mention.

const escapeRegex = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

module.exports = {
	name: "messageCreate",

	/**
	 * @description S'exécute lorsqu'un message est créé et le gère.
	 * @author Saez#0001
	 * @param {import('discord.js').Message & { client: import('../typings').Client }} message Le message qui a été créé.
	 */

	async execute(message) {
		// Déclare const à utiliser.

		const { client, guild, channel, content, author } = message;

		// Vérifie si le bot est mentionné tout seul dans le message et déclenche le déclencheur onMention.
		// Vous pouvez modifier le comportement selon votre goût à ./messages/onMention.js

		if (
			message.content == `<@${client.user.id}>` ||
			message.content == `<@!${client.user.id}>`
		) {
			require("../messages/onMention").execute(message);
			return;
		}

		/**
		 * @description Convertit le préfixe en toLowerCase.
		 * @type {String}
		 */

		const checkPrefix = prefix.toLowerCase();

		/**
		 * @description Expression régulière pour le préfixe de mention
		 */

		const prefixRegex = new RegExp(
			`^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`
		);

		// Vérifie si le contenu du message en toLowerCase commence par la mention du bot.

		if (!prefixRegex.test(content.toLowerCase())) return;

		/**
		 * @description Vérifie et renvoie le préfixe correspondant, mention ou préfixe dans le config.
		 */

		const [matchedPrefix] = content.toLowerCase().match(prefixRegex);

		/**
		 * @type {String[]}
		 * @description Le contenu du message du message reçu séparé par des espaces (' ') dans un tableau, cela exclut le préfixe et la commande/l'alias lui-même.
		 */

		const args = content.slice(matchedPrefix.length).trim().split(/ +/);

		/**
		 * @type {String}
		 * @description Nom de la commande reçue du premier argument du tableau args.
		 */

		const commandName = args.shift().toLowerCase();

		// Vérifiez si le message ne commence pas par un préfixe ou si l'auteur du message est un bot. Si oui, reviens.

		if (!message.content.startsWith(matchedPrefix) || message.author.bot)
			return;

		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		// Ce n'est pas une commande, retour :)

		if (!command) return;

		// Owner Only Property, ajoutez les propriétés de votre commande si true.

		if (command.ownerOnly && message.author.id !== owner) {
			return message.reply({ content: "Ceci est une commande réservée au propriétaire !" });
		}

		// Propriétaire de serveur uniquement, ajoutez les propriétés de votre commande si vrai.

		if (command.guildOnly && message.channel.type === ChannelType.DM) {
			return message.reply({
				content: "Je ne peux pas exécuter cette commande dans les DM !",
			});
		}

		// Propriété des permissions de l'auteur
		// Ignorera la vérification des autorisations si le salon de commande est un DM. Utilisez guildOnly pour d'éventuelles commandes sujettes aux erreurs !

		if (command.permissions && message.channel.type !== ChannelType.DM) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply({ content: "Tu ne peux pas faire ça !" });
			}
		}

		// Argument manquant

		if (command.args && !args.length) {
			let reply = `Vous n'avez fourni aucun argument, ${message.author}!`;

			if (command.usage) {
				reply += `\nLe bon usage serait : \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send({ content: reply });
		}

		// Cooldowns

		const { cooldowns } = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply({
					content: `S'il vous plaît, attendez ${timeLeft.toFixed(
						1
					)} seconde(s) de plus avant de réutiliser la \`${command.name}\` commande.`,
				});
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		// Reste votre créativité est ci-dessous.

		// exécuter la commande finale. Mettez tout au-dessus.
		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply({
				content: "Une erreur s'est produite lors de la tentative d'exécution de cette commande !",
			});
		}
	},
};