const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "serverinfo",
  aliases: ["serverinformation"],
  description: "Show Server Information!",
  usage: "Serverinfo",
  run: async (client, message, args) => {
    //Start
    message.delete();
    const guild = message.guild;
    const Emojis = guild.emojis.cache.size || "No Emoji!";
    const Roles = guild.roles.cache.size || "No Roles!";
    const Members = guild.memberCount;
    const Humans = guild.members.cache.filter(member => !member.user.bot).size;
    const Bots = guild.members.cache.filter(member => member.user.bot).size;

    const embed = new MessageEmbed()
      .setTitle(guild.name + " Information!")
      .setColor(Color)
      .setThumbnail(guild.iconURL())
      .addField(`Nom`, guild.name, true)
      .addField(`ID`, `${guild.id}`, true)
      .addField(`Propriétaire`, `<@${guild.owner.user.id}>`, true)
      .addField(`Rôles`, Roles, true)
      .addField(`Emojis`, Emojis, true)
      .addField(`Membres`, Members, true)
      .addField(`Serveur créé le`, guild.createdAt.toDateString())
      .setFooter(`Effectué par ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};