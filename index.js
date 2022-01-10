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
    .setActivity(`NFT By Misery`, { type: "WATCHING" })
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
  let welcomeChannelFr = client.channels.cache.get('929698265971183637');
  welcomeChannelFr.send('**Bienvenue** <@' + member.user.id + '> ! 👋');
  member.send('🇫🇷 : Bienvenue sur le serveur **__NFT By Misery__**  🇬🇧 : Welcome to the server **__NFT By Misery__**');
});
client.on('guildMemberAdd', (member) => {
  //Lorsqu'un Utilisateur Rejoint.
  let welcomeChannelAg = client.channels.cache.get('929704666424565790');
  welcomeChannelAg.send('**Welcome** <@' + member.user.id + '> ! 👋');
  });
client.on('guildMemberRemove', (member) => {
  //Lorsqu'un utilisateur Quitte.
  let leaveChannelFr = client.channels.cache.get('929698265971183637');
  leaveChannelFr.send('**Au revoir** <@' + member.user.id + '> ! 🙂');
});
client.on('guildMemberRemove', (member) => {
  //Lorsqu'un utilisateur Quitte.
  let leaveChannelAg = client.channels.cache.get('929704666424565790');
  leaveChannelAg.send('**Good Bye** <@' + member.user.id + '> ! 🙂');
});

var time = msg.createdAt - old_msg[old_msg.length-1].createdAt // DURÉE ENTRE LES DEUX DERNIERS MESSAGES

                if (time < 5000) {//SPAM 5 sec
                    msg.member.roles.add('ID ROLE SPAM') //AJOUTE LE ROLE SPAM
                    
                    client.channels.cache.get('ID DE VOTRE CHANNEL DEBUG/ADMIN').send(`${msg.member} a été mute`) // MSG ADMINISTRATIOn
                    msg.channel.send(`Calme toi ${msg.member} !! `) // MSG DE PREVENTION
                    timer(msg,client)//DESACTIVÉ AU BOUT D'UN X LE SPAM
                    msg.delete() // SUPPRIME LE MESSAGE
                    
                }

            }else if(old_msg.length > 3){
                old_msg = []
            }

        }catch(e){ // SI UNE ERREUR SURVIENT
            console.error(e);
        }

        old_msg.push(msg)
    })

client.login(process.env.TOKEN);

//Bot Coded by 365 ɢᴀᴍɪɴɢ ɴ ᴍᴏʀᴇ_2.0#6766 DONOT share WITHOUT credits!!
