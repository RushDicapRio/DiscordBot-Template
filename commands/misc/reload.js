/**
 * @file Rechargeur de commandes en direct
 * @author Saez#0001
 * @since 1.0.0
 * @version 1.0.0
 */

// "fs" déclaré est utilisé pour recharger le cache de commandes de la commande spécifiée.
const fs = require("fs");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "reload",
	description: "Recharge une commande",
	args: true,
	ownerOnly: true,

	execute(message, args) {
		/**
		 * @type {String}
		 * @description Nom de la commande spécifiée en toLowerCase.
		 */

		const commandName = args[0].toLowerCase();

		const command =
			message.client.commands.get(commandName) ||
			message.client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		// La commande est renvoyée s'il n'existe aucune commande de ce type avec le nom ou l'alias de la commande spécifique.
		if (!command) {
			return message.channel.send({
				content: `Il n'y a pas de commande avec un nom ou un alias \`${commandName}\`, ${message.author}!`,
			});
		}

		/**
		 * @type {String[]}
		 * @description Tableau de toutes les catégories de commandes alias dossiers.
		 */

		const commandFolders = fs.readdirSync("./commands");

		/**
		 * @type {String}
		 * @description Nom de la catégorie de commande/dossier de la commande spécifiée.
		 */

		const folderName = commandFolders.find((folder) =>
			fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`)
		);

		// Supprime le cache actuel de cette commande spécifiée.

		delete require.cache[
			require.resolve(`../${folderName}/${command.name}.js`)
		];

		// Essaie d'enregistrer à nouveau la commande avec un nouveau code.

		try {
			/**
			 * @type {import('../../typings').LegacyCommand}
			 * @description La nouvelle commande (extraction de code)
			 */

			const newCommand = require(`../${folderName}/${command.name}.js`);

			// Enregistre maintenant la commande dans la collection de commandes. En cas d'échec, le bloc catch sera exécuté.
			message.client.commands.set(newCommand.name, newCommand);

			// 🎉 Confirmation envoyée si le rechargement a réussi !
			message.channel.send({
				content: `Commande(s) \`${newCommand.name}\` a été rechargée(s) !`,
			});
		} catch (error) {
			// Le bloc catch s'exécute s'il y a une erreur dans votre code. Il enregistre l'erreur dans la console et la renvoie également dans l'interface graphique Discord.

			console.error(error);
			message.channel.send({
				content: `Une erreur s'est produite lors du rechargement d'une commande \`${command.name}\`:\n\`${error.message}\``,
			});
		}
	},
};