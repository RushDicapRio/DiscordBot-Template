/**
 * @file Exemple de commande d'aide avec la commande barre oblique.
 * @author Saez#0001
 * @since 3.0.0
 * @version 3.3.0
 */

// Déconstruit les constantes dont nous avons besoin dans ce fichier.

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// Les données nécessaires pour enregistrer les commandes slash sur Discord.

	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription(
			"Répertorier toutes les commandes du bot ou des informations sur une commande spécifique."
		)
		.addStringOption((option) =>
			option
				.setName("command")
				.setDescription("La commande spécifique pour voir les informations.")
		),

	async execute(interaction) {
		/**
		 * @type {string}
		 * @description L'argument "commande"
		 */
		let name = interaction.options.getString("command");

		/**
		 * @type {EmbedBuilder}
		 * @description Incorporation de la commande d'aide
		 */
		const helpEmbed = new EmbedBuilder().setColor("Random");

		if (name) {
			name = name.toLowerCase();

			// Si une seule commande a été demandée, n'envoyer que l'aide de cette commande.

			helpEmbed.setTitle(`Help pour \`${name}\` commande`);

			if (interaction.client.slashCommands.has(name)) {
				const command = interaction.client.slashCommands.get(name);

				if (command.data.description)
					helpEmbed.setDescription(
						command.data.description + "\n\n**Paramètres :**"
					);
			} else {
				helpEmbed
					.setDescription(`Aucune commande slash avec le nom \`${name}\` trouvée.`)
					.setColor("Red");
			}
		} else {
			// Donner une liste de toutes les commandes

			helpEmbed
				.setTitle("Liste de toutes mes commandes slash")
				.setDescription(
					"`" +
						interaction.client.slashCommands
							.map((command) => command.data.name)
							.join("`, `") +
						"`"
				);
		}

		// Réponses à l'interaction !

		await interaction.reply({
			embeds: [helpEmbed],
		});
	},
};