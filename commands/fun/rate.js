const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "rate",
  aliases: [],
  description: "Bot Rate Your Given Thing!",
  usage: "Rate <Text>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    let Content = args.join(" ");

    if (!Content)
      return message.channel.send(`S'il vous plaît donnez-moi quelque chose à noter !`);

    let embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle(`Je donne un`)
      .setDescription(`${Math.floor(Math.random() * 11)}/10 pour ${Content}`)
      .setFooter(`Effectuer ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};