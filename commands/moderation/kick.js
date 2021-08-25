const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "kick",
  aliases: [],
  description: "Kick des utilisateurs",
  usage: "Kick <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(
        `❌ Tu n'as pas les permissions pour effectuer cette commande`
      );

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `🔎 Veuillez mentionner l'utilisateur que vous souhaitez kick`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`🔎 Veuillez mentionner un utilisateur valide`);

    if (Member.id === message.author.id)
      return message.channel.send(`❕ Tu ne peux pas te kick toi même`);

    if (Member.id === client.user.id)
      return message.channel.send(`STP me kick paaaas ;-;`);

    if (Member.id === message.guild.owner.user.id)
      return message.channel.send(`❕ Tu ne peux pas kick le prorpiétaire du serveur`);

    let Reason = args.slice(1).join(" ");

    let User = message.guild.member(Member);

    if (!User.kickable)
      return message.channel.send(`❌ Je ne peux pas kick ce membre`);

    try {
      console.log(`✅ L'utilisateur mentionné à été kick !`);

      setTimeout(function() {
        User.kick({ reason: `${Reason || "Aucune raison mentionné"}` });
      }, 2000);
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`KICK`)
        .addField(`Moderateur`, `<@${message.author.id}>`)
        .addField(`Kicked Member`, `<@${Member.id}>`)
        .addField(`Reason`, `${Reason || "Aucune raison mentionné"}`)
        .setFooter(`Effectué par ${message.author.username}`)
        .setTimestamp();
      if (User && Member.bot === false)
        Member.send(
          `Vous avez été kick du serveur **${message.guild.name}** pour ${Reason ||
            "Aucune raison mentionné"}`
        );
      message.channel.send(embed);
      console.log(
        `User: ${Member.tag} (${Member.id}) Just Got Kicked From ${
          message.guild.name
        } For ${Reason || "No Reason Provided!"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `Je ne peux pas kick ce membre, peux être que celui-ci a un rôle plus élevé que le miens`
        )
        .then(() => console.log(error));
    }

    //End
  }
};
