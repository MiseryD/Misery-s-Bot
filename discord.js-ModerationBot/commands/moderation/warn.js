const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "warn",
  aliases: [],
  description: "Warn un utilisateur",
  usage: "Warn <Mention User> | <Reason>",
  run: async (client, message, args) => {
    //Start
    message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        `❌ Tu n'as pas les permissions pour effectuer cette commande`
      );
    
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`🔎 Veuillez mentionner un utilisateur`);

    let Reason = args.slice(1).join(" ");

    client.db.add(`Warnings_${message.guild.id}_${Member.user.id}`, 1);

    let Warnings = client.db.get(
      `Warnings_${message.guild.id}_${Member.user.id}`
    );

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`WARN`)
      .addField(`Moderateur`, `<@${message.author.id}>`)
      .addField(`Utilisateur warn`, `<@${Member.id}>`)
      .addField(`Nombre de warn`, Warnings)
      .addField(`Raison`, `${Reason || "Aucune raison mentionné"}`)
      .setFooter(`Effectuer par ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
