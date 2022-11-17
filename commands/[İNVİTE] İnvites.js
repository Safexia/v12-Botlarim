const { MessageEmbed, Role, Discord } = require("discord.js");
const qdb = require("quick.db");
const inviteMemberSchema = require("../schemas/inviteMember");
const { MessageButton } = require('discord-buttons');
const inviterSchema = require("../schemas/inviter");
const db = require("../schemas/inviter");

const moment = require("moment");
const kdb = new qdb.table("Kayıt");
require("../ravgarcık.js");
const Database = require('../models/inviter.js');
let embed = new MessageEmbed().setFooter(client.config.SetFooter).setColor("RANDOM")

exports.execute = async (client, message, args) => {


  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
  const total = inviterData ? inviterData.total : 0;
  const regular = inviterData ? inviterData.regular : 0;
  const bonus = inviterData ? inviterData.bonus : 0;
  const leave = inviterData ? inviterData.leave : 0;
  const fake = inviterData ? inviterData.fake : 0;
  const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
  const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
  const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;


      let embed = new MessageEmbed().setFooter(client.config.SetFooter).setColor("RANDOM");
  
      message.channel.send(embed.setDescription(`Toplam: **${total}** - Gerçek **${regular}** - Leave **${leave}** - Fake **${fake}** | Bonus: **${bonus}**`))
  
 

      
  
  
  client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.davetlerim\` komutunu kullandı. [\`${message.content}\`]`);

}
exports.conf = {
    command: "davetlerim", // Asıl komutumuz
    description: "Belirtilen kişiyi erkek olarak kayıt eder", // Komut açıklamamız
    aliases: ["ravgarcikdavett"] // Komutumuzun yardımcıları
  }
 