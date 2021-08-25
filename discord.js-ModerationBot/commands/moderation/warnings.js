const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "warnings",
  aliases: ["warning"],
  description: "Nombre de warn qu'à une personne",
  usage: "Warnings <Mention User>",
  run: async (client, message, args) => {
    //Start
    message.delete();

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`🔎 Veuillez mentionner un utilisateur!`);

    let Warnings = client.db.get(
      `Warn_${message.guild.id}_${Member.user.id}`
    );

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`NOMBRE DE WARN`)
      .setDescription(`<@${Member.id}> a ${Warnings || "0"} Warn !`)
      .setFooter(`Effectué par ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};