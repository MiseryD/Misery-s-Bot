const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "clear",
  aliases: ["purge", "clearmsgs"],
  description: "Supprimer des messages",
  usage: "Clear <Message Amount>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        `❌ Tu n'as pas la permissions pour effectuer cette commande`
      );

    if (!args[0])
      return message.channel.send(`🔎 Veuillez me donner un nombre de message à supprimer`);

    if (isNaN(args[0]))
      return message.channel.send(`🔎 Veuillez me donner un nombre valide`);

    if (args[0] < 5)
      return message.channel.send(
        `👿 Tu peux supprimer ${args[0]} messages tout seul, ce n'est quand même pas beaucoup :)`
      );

    if (args[0] > 100)
      return message.channel.send(
        `❌ Je ne peux pas supprimer ${args[0]} messages en raison de la limite de Discord`
      );

    let Reason = args.slice(1).join(" ") || "Aucune raison mentionné";

    message.channel.bulkDelete(args[0]).then(Message => {
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`CLEAR`)
        .addField(`Moderateur`, `<@${message.author.id}>`)
        .addField(`Salon`, `<@${Member.id}>`)
        .addField(`Nombre de messages supprimé`, `${Message.size}`)
        .addField(`Raison`, `${Reason}`)
        .setFooter(`Effectué par ${message.author.username}`)
        .setTimestamp();
      return message.channel
        .send(embed)
        .then(msg => msg.delete({ timeout: 10000 }));
    });

    //End
  }
};