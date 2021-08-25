const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "unban",
  aliases: [],
  description: "Unban un utilisateur",
  usage: "Unban <Member ID>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        `❌ Tu n'as pas les permissions pour effecter cette commande`
      );

    if (!args[0])
      return message.channel.send(
        `🔎 Veuillez me donner l'id de l'utilisateur que vous souhaitez debannir`
      );

    if (isNaN(args[0])) return message.channel.send(`🔎 Veuillez me donner un id valide`);

    if (args[0] === message.author.id)
      return message.channel.send(`❕ Vous êtes déjà deban`);

    if (args[0] === message.guild.owner.user.id)
      return message.channel.send(`❕ Le propriétaire du serveur est déjà deban`);

    if (args[0] === client.user.id)
      return message.channel.send(`❕ Je suis déjà deban`);

    let FetchBan = await message.guild.fetchBans();

    let Member;
    Member =
      FetchBan.find(
        b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      FetchBan.get(args[0]) ||
      FetchBan.find(
        bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase()
      );

    if (!Member)
      return message.channel.send(
        "❌ Veuillez me donner un id valide, ou c'est que cette utilisateur est déjà debanni"
      );

    let Reason = args.slice(1).join(" ") || "Aucune raison mentionné";

    try {
      message.guild.members.unban(Member.user.id, Reason);
    } catch (error) {
      return message.channel.send(
        `❌ Je ne peux pas debannir ce membre, peut-être que le membre n'est pas banni ou qu'il y a une erreur !`
      );
    }

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`UNBAN`)
      .addField(`Moderateur`, `<@${message.author.id}>`)
      .addField(`Utilisateur debanni`, `<@${Member.id}>`)
      .addField(`Raison`, `${Reason || "Aucune raison mentionné"}`)
      .setFooter(`Effecté par ${message.author.username}`)
      .setTimestamp();

    return message.channel.send(embed);

    //End
  }
};