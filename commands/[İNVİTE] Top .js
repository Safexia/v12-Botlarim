const { MessageEmbed, Role, Discord } = require("discord.js");
const qdb = require("quick.db");
const db = require("../schemas/inviter");

const inviteMemberSchema = require("../schemas/inviteMember");

const moment = require("moment");
const kdb = new qdb.table("Kayıt");
require("../ravgarcık.js");
const Database = require('../models/inviter.js');
let embed = new MessageEmbed().setColor("RANDOM")

exports.execute = async (client, message, args) => {
  let data = await db.find({ guildID: message.guild.id }).sort({ total: -1 });
  if (!data.length)return message.channel.send(embed.setDescription("Herhangi bir invite verisi bulunamadı!"));
  let arr = [];
  data.forEach((x) => arr.push({ id: x.userID, total: x.total }));
  let index = arr.findIndex((x) => x.id == message.author.id) + 1;

  let list = data
    .filter((x) => message.guild.members.cache.has(x.userID))
    .splice(0, 10)
    .map((x, index) => `${x.userID === message.author.id ? `**${index + 1}. <@${x.userID}> - Toplam ${x.total} davet (${x.regular} gerçek, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} ayrılmış)**` : `**${index + 1}.** <@${x.userID}> - Toplam **${x.total}** davet \`(${x.regular} gerçek, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} ayrılmış)\``}`)
    .join("\n");

  const veri = await db.findOne({ guildID: message.guild.id, userID: message.author.id });
  if (index < 10) {
    embed.setTitle("Sıralama");
    embed.setDescription(list);
    message.channel.send(embed);
  } else {
    embed.setTitle("Sıralama");
    embed.setDescription( `${list} \n... \n**${index}. ${message.author} Toplam ${veri.total} davet (${veri.regular} gerçek, ${veri.bonus} bonus, ${veri.fake} fake, ${veri.leave} ayrılmış)**`);
    message.channel.send(embed);
  }}
exports.conf = {
    command: "topinvite", // Asıl komutumuz
    description: "Belirtilen kişiyi erkek olarak kayıt eder", // Komut açıklamamız
    aliases: ["davetlerim"] // Komutumuzun yardımcıları
  }
 