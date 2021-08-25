const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "ban",
  aliases: [],
  description: "Bannir un utilisateur",
  usage: "Ban <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        `❌ Tu n'as pas la permissions pour effectuer cette commande`
      );

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `🔎 Veuillez mentionner l'utilisateur que vous souhaitez bannir`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`🔎 Veuillez mentionner un utilisateur valide`);

    if (Member.id === message.author.id)
      return message.channel.send(`❕ Vous ne pouvez pas vous bannir vous même`);

    if (Member.id === client.user.id)
      return message.channel.send(`Nooon, me ban pas ;-;`);

    if (Member.id === message.guild.owner.user.id)
      return message.channel.send(`❕ Vous ne pouvez pas bannir le propriétaire du serveur`);

    let Reason = args.slice(1).join(" ");

    let User = message.guild.member(Member);

    if (!User.bannable) return message.channel.send(`❌ Je ne peux pas bannir cette personne`);

    try {
      console.log(`✅ L'utilisateur mentionné à été banni !`);
      setTimeout(function() {
        User.ban({ reason: `${Reason || "Aucune raison mentionné"}` });
      }, 2000);
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`BAN`)
        .addField(`Moderateur`, `<@${message.author.id}>`)
        .addField(`Membre banni`, `<@${Member.id}>`)
        .addField(`Raison`, `${Reason || "Aucune raison mentionné"}`)
        .setFooter(`Effectué par ${message.author.username}`)
        .setTimestamp();
      if (User && Member.bot === false)
        Member.send(
          `Vous avez été banni du serveur **${message.guild.name}** pour ${Reason ||
            "Aucune raison mentionné"}`
        );
      message.channel.send(embed);
      console.log(
        `User: ${Member.tag} (${Member.id}) à été ban ${
          message.guild.name
        } pour ${Reason || "Aucune raison mentionné"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `Je ne peux pas bannir ce membre, peux être que celui ci à un rôle plus élevé que le miens`
        )
        .then(() => console.log(error));
    }

    //End
  }
};
