const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "ping",
  aliases: [],
  description: "Pong!",
  usage: "Ping",
  run: async (client, message, args) => {
    //Start
    message.delete();

    const embed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`Mon ping est de - ${client.ws.ping}`)
      .setFooter(`Effectué par ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
