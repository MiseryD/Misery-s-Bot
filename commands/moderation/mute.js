const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "mute",
  aliases: [],
  description: "Mute un utilisateur",
  usage: "Mute <Mention User> | <Reason>",
  run: async (client, message, args) => {
    //Start
    message.delete();

        if (!message.member.hasPermission("MANAGE_SERVER"))
      return message.channel.send(
        `❌ Tu n'as pas les permisions pour effectuer cette commande`
      );
    
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`🔎 Veuillez mentionner un utilisateur`);

    let Role = message.guild.roles.cache.find(role => role.name === "Muted").id;

    if (!Role)
      return message.channel.send(
        `Please Create Mute Role | Role Name : Muted`
      );

    if (Member.roles.cache.has(Role)) {
      return message.channel.send(`✅ Utilisateur mute !`);
    }

    let Reason = args.slice(1).join(" ");

    let Embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`MUTE`)
      .addField(`Moderateur`, `<@${message.author.id}>`)
      .addField(`Utilisateur mute`, `<@${Member.id}>`)
      .addField(`Raison`, `${Reason || "No Reason Provided!"}`)
      .setFooter(`Effectué par ${message.author.username}`)
      .setTimestamp();

    if (Role && !Member.roles.cache.has(Role)) {
      Member.roles.add([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`Something Went Wrong, Try Again Later!`);
    }

    //End
  }
};
