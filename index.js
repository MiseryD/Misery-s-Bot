const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const { Prefix, Token, Color } = require("./config.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.db = require("quick.db");

client.on("ready", async () => {
  console.log(`✔ BOT PRÊT ✔`);
  client.user
    .setActivity(`Eight Gang`, { type: "WATCHING" })
    .catch(error => console.log(error));
});

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {
    return message.channel.send(`Mon prefix est : ${Prefix}`);
  }
});

let modules = ["fun", "info", "moderation"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(err, files) {
    if (err)
      return new Error(
        "Missing Folder Of Commands! Example : Commands/<Folder>/<Command>.js"
      );
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      let command = require(`./commands/${module}/${file}`);
      console.log(`${command.name} a bien été chargé ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
      if (command.aliases.length === 0) command.aliases = null;
    });
  });
});

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (!message.content.startsWith(Prefix)) return;

  const args = message.content
    .slice(Prefix.length)
    .trim()
    .split(" ");
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;

  if (command) {
    if (!message.guild.me.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "I Don't Have Enough Permission To Use This Or Any Of My Commands | Require : Administrator"
      );
    command.run(client, message, args);
  }
  console.log(
    `User : ${message.author.tag} (${message.author.id}) Server : ${message.guild.name} (${message.guild.id}) Command : ${command.name}`
  );
});

client.on('guildMemberAdd', (member) => {
  //Lorsqu'un Utilisateur Rejoint.
  let welcomeChannel = client.channels.cache.get('825362499934617620');
  welcomeChannel.send('**Bienvenue** <@' + member.user.id + '> ! 👋');
  member.send('**Bienvenue** sur le serveur **__Eight Gang__** ! Lis attentivement les règles dans le salon <#825343340663930883> et clique sur la réaction en dessous pour pouvoir avoir accès au serveur. Bon amusement !');
});

client.on('guildMemberRemove', (member) => {
  //Lorsqu'un utilisateur Quitte.
  let leaveChannel = client.channels.cache.get('825362499934617620');
  leaveChannel.send('**Au revoir** <@' + member.user.id + '> ! 🙂');
});

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

client.login(process.env.TOKEN);

//Bot Coded by 365 ɢᴀᴍɪɴɢ ɴ ᴍᴏʀᴇ_2.0#6766 DONOT share WITHOUT credits!!
