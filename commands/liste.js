const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "liste",
  aliases: [],
  description: "liste des commandes",
  usage: "liste",
  run: async (client, message, args) => {
    //Start
    message.delete();

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle("__**Liste de mes commandes**__")
      .setDescription("Utilisez =help <nom de la commande> pour plus d'info sur les commandes")
      .addField("**- Fun**", "``Avatar, Coinflip, Howgay, Meme, Rate, 8ball, Ascii, Choose, Hack, Randomnumber``")
      .addField("**Moderation**", "``Clear, Mute, Unmute, Tempmute, Kick, Ban, Unban, Tempban, Warn, Warnings, ResetWarns``")
      .addField("**Informations**", "``Help, Covid, Weather, Userinfo, Serverinfo, Ping``")

    message.channel.send(embed);

    //End
  }
};
