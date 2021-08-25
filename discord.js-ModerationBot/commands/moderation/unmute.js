const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "unmute",
  aliases: [],
  description: "Demute un utilisateur",
  usage: "Unmute <Mention User>",
  run: async (client, message, args) => {
    //Start
    message.delete();

        if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        `❌ Tu n'as pas les permissions pour effectuer cette commande`
      );
    
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`🔎 Veuillez mentionner l'utilisateur que vous souhaitez demute`);

    let Role = message.guild.roles.cache.find(role => role.name === "Muted").id;

    if (!Role)
      return message.channel.send(
        `🔎 Il n'y a pas de rôle muet, donc le membre n'est plus muet !`
      );

    if (!Member.roles.cache.has(Role)) {
      return message.channel.send(`✅ L'utilisateur mentionné à bien été demute`);
    }

    let Embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`UNMUTE`)
      .addField(`Moderateur`, `<@${message.author.id}>`)
      .addField(`Utilisateur demute`, `<@${Member.id}>`)
      .setFooter(`Effecté par ${message.author.username}`)
      .setTimestamp();

    if (Role && Member.roles.cache.has(Role)) {
      Member.roles.remove([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`Quelque chose s'est mal passé, réessayez plus tard !`);
    }

    //End
  }
};
