/**
 * @file Fichier principal du bot, responsable de l'enregistrement des événements, des commandes, des interactions, etc.
 * @author Saez#0001
 * @since 1.0.0
 * @version 1.0.0
 */

// Déclarez les constantes qui seront utilisées tout au long du bot.

const fs = require("fs");
const {
	Client,
	Collection,
	GatewayIntentBits,
	Partials,
} = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, client_id, test_guild_id } = require("./config.json");

/**
 * A partir de la v13, la spécification des intents est obligatoire.
 * @type {import('./typings').Client}
 * @description Main Application Client */

// @ts-ignore
const client = new Client({
	// Veuillez ajouter toutes les intentions dont vous avez besoin, des informations plus détaillées @ https://ziad87.net/intents/

	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.Channel],
});

/**********************************************************************/
// Ci-dessous, nous allons créer un gestionnaire d'événements !

/**
 * @description Tous les fichiers d'événements du gestionnaire d'événements.
 * @type {String[]}
 */

const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

// Parcourez tous les fichiers et exécutez l'événement lorsqu'il est réellement émis.
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(
			event.name,
			async (...args) => await event.execute(...args, client)
		);
	}
}

/**********************************************************************/
// Définir la collection de commandes, les commandes Slash et les temps de recharge

client.commands = new Collection();
client.slashCommands = new Collection();
client.buttonCommands = new Collection();
client.selectCommands = new Collection();
client.contextCommands = new Collection();
client.modalCommands = new Collection();
client.cooldowns = new Collection();
client.autocompleteInteractions = new Collection();
client.triggers = new Collection();

/**********************************************************************/
// Enregistrement des commandes héritées basées sur les messages.

/**
 * @type {String[]}
 * @description Toutes les catégories de commandes alias dossiers.
 */

const commandFolders = fs.readdirSync("./commands");

// Parcourez tous les fichiers et stockez les commandes dans la collection de commandes.

for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

/**********************************************************************/
// Enregistrement des interactions Slash-Command.

/**
 * @type {String[]}
 * @description Toutes les commandes slash.
 */

const slashCommands = fs.readdirSync("./interactions/slash");

// Parcourez tous les fichiers et stockez les commandes slash dans la collection slashCommands.

for (const module of slashCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/slash/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/slash/${module}/${commandFile}`);
		client.slashCommands.set(command.data.name, command);
	}
}

/**********************************************************************/
// Enregistrement des interactions de saisie semi-automatique.

/**
 * @type {String[]}
 * @description Toutes les interactions de saisie semi-automatique.
 */

const autocompleteInteractions = fs.readdirSync("./interactions/autocomplete");

// Parcourez tous les fichiers et stockez les interactions de saisie semi-automatique dans la collection autocompleteInteractions.

for (const module of autocompleteInteractions) {
	const files = fs
		.readdirSync(`./interactions/autocomplete/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const interactionFile of files) {
		const interaction = require(`./interactions/autocomplete/${module}/${interactionFile}`);
		client.autocompleteInteractions.set(interaction.name, interaction);
	}
}

/**********************************************************************/
// Enregistrement des interactions du menu contextuel

/**
 * @type {String[]}
 * @description Toutes les commandes du menu contextuel.
 */

const contextMenus = fs.readdirSync("./interactions/context-menus");

// Parcourez tous les fichiers et stockez les menus contextuels dans la collection contextMenus.

for (const folder of contextMenus) {
	const files = fs
		.readdirSync(`./interactions/context-menus/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of files) {
		const menu = require(`./interactions/context-menus/${folder}/${file}`);
		const keyName = `${folder.toUpperCase()} ${menu.data.name}`;
		client.contextCommands.set(keyName, menu);
	}
}

/**********************************************************************/
// Enregistrement des interactions bouton-commande.

/**
 * @type {String[]}
 * @description Toutes les commandes de bouton.
 */

const buttonCommands = fs.readdirSync("./interactions/buttons");

// Parcourez tous les fichiers et stockez les commandes de bouton dans la collection buttonCommands.

for (const module of buttonCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/buttons/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/buttons/${module}/${commandFile}`);
		client.buttonCommands.set(command.id, command);
	}
}

/**********************************************************************/
// Enregistrement des interactions modales-commandes.

/**
 * @type {String[]}
 * @description Toutes les commandes modales.
 */

const modalCommands = fs.readdirSync("./interactions/modals");

// Parcourez tous les fichiers et stockez les commandes modales dans la collection modalCommands.

for (const module of modalCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/modals/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/modals/${module}/${commandFile}`);
		client.modalCommands.set(command.id, command);
	}
}

/**********************************************************************/
// Enregistrement des interactions de menus sélectionnés

/**
 * @type {String[]}
 * @description Toutes les commandes du menu Sélectionner.
 */

const selectMenus = fs.readdirSync("./interactions/select-menus");

// Parcourez tous les fichiers et stockez les menus de sélection dans la collection selectMenus.

for (const module of selectMenus) {
	const commandFiles = fs
		.readdirSync(`./interactions/select-menus/${module}`)
		.filter((file) => file.endsWith(".js"));
	for (const commandFile of commandFiles) {
		const command = require(`./interactions/select-menus/${module}/${commandFile}`);
		client.selectCommands.set(command.id, command);
	}
}

/**********************************************************************/
// Enregistrement des commandes Slash dans l'API Discord

const rest = new REST({ version: "9" }).setToken(token);

const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
	...Array.from(client.contextCommands.values()).map((c) => c.data),
];

(async () => {
	try {
		console.log("Démarrage de l'actualisation des commandes d'application (/).");

		await rest.put(
			/**
			 * Par défaut, vous utiliserez les commandes de serveur pendant le développement.
			 * Une fois que vous avez terminé et que vous êtes prêt à utiliser les commandes globales (qui ont 1 heure de temps de cache),
			 * 1. Veuillez décommenter la ligne ci-dessous (commentée) pour déployer les commandes globales.
			 * 2. Veuillez commenter la ligne ci-dessous (non commentée) (pour les commandes de serveur).
			 */

			Routes.applicationGuildCommands(client_id, test_guild_id),

			/**
			 * Bon conseil pour les commandes globales, vous n'avez besoin de les exécuter qu'une seule fois pour mettre à jour
			 * Vos commandes à l'API Discord. Veuillez le commenter à nouveau après avoir exécuté le bot une fois
			 * Pour s'assurer qu'ils ne seront pas redéployés au prochain redémarrage.
			 */

			// Routes.applicationCommands(client_id)

			{ body: commandJsonData }
		);

		console.log("Commandes d'application (/) rechargées avec succès.");
	} catch (error) {
		console.error(error);
	}
})();

/**********************************************************************/
// Enregistrement des déclencheurs de chat basés sur les messages

/**
 * @type {String[]}
 * @description Toutes les catégories de déclencheurs ou dossiers.
 */

const triggerFolders = fs.readdirSync("./triggers");

// Parcourez tous les fichiers et stockez les déclencheurs dans la collection de déclencheurs.

for (const folder of triggerFolders) {
	const triggerFiles = fs
		.readdirSync(`./triggers/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of triggerFiles) {
		const trigger = require(`./triggers/${folder}/${file}`);
		client.triggers.set(trigger.name, trigger);
	}
}

// Connectez-vous à votre application client avec le jeton du bot.

client.login(token);