const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const Database2 = require('../models/inviter.js');

const qdb = require("quick.db");
const kdb = new qdb.table("Kayıt");

require("moment-duration-format");
const conf = require("../configs/config.json");
const messageUserChannel = require("../schemas/messageUserChannel");
const voiceUserChannel = require("../schemas/voiceUserChannel");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const voiceUserParent = require("../schemas/voiceUserParent");

exports.execute = async (client, message, args) => {
  
  if(!message.member.roles.cache.has(client.config.RegisterYetkili))
  if(!message.member.roles.cache.has(client.config.OwnerRole))
  if(!message.member.roles.cache.has(client.config.BotCommands))
  if(!message.member.roles.cache.has(client.config.AltYetki))
  if(!message.member.roles.cache.has(client.config.OrtaYetki))
  if(!message.member.roles.cache.has(client.config.ÜstYetki))
  if (!message.member.hasPermission("ADMINISTRATOR"))
  if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

  let embed = new MessageEmbed().setColor("RANDOM");

  const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role) return message.channel.send(embed.setDescription("Bir rol belirtmelisin!"));
    else if (role.members.size === 0) return message.channel.send(embed.setDescription("Bu rol kimsede bulunmuyor!"));

    const messageData = async (type) => {
      let data = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
      data = data.filter(x => message.guild.members.cache.has(x.userID) && message.guild.members.cache.get(x.userID).roles.cache.has(role.id));
      return data.length > 0 ? data.splice(0, 5).map((x, index) => `\`${index + 1}.\` <@${x.userID}> : \`${Number(x[type]).toLocaleString()} mesaj\``).join(`\n`) : "Veri bulunmuyor!";
    };

    const voiceData = async (type) => {
      let data = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
      data = data.filter(x => message.guild.members.cache.has(x.userID) && message.guild.members.cache.get(x.userID).roles.cache.has(role.id));
      return data.length > 0 ? data.splice(0, 5).map((x, index) => `\`${index + 1}.\` <@${x.userID}> : \`${moment.duration(x[type]).format("H [saat], m [dakika]")}\``).join(`\n`) : "Veri bulunmuyor!";
    };

    embed.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
    embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
    message.channel.send(embed.setDescription(`    
    ${role} Rolüne sahip kullanıcıların Toplam verileri.
    ${await voiceData("topStat")}
    ${role} Rolüne sahip kullanıcıların Haftalık verileri.
    ${await voiceData("weeklyStat")}
    
    **───────────────**
    
    ${role} Rolüne sahip kullanıcıların Toplam verileri.
    ${await messageData("topStat")}
    ${role} Rolüne sahip kullanıcıların Haftalık verileri.
    ${await messageData("weeklyStat")}

    `));
    client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.rolestop\` komutunu kullandı. [\`${message.content}\`]`);

  }
  
  

exports.conf = {
  command: "rolstat", // Asıl komutumuz
  description: "ID li ceza bildiyi gösterir", // Komut açıklamamız
  aliases: ["roletop"] // Komutumuzun yardımcıları
}
