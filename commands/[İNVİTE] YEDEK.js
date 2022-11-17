const { MessageEmbed, Role, Discord } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
const kdb = new qdb.table("Kayıt");
require("../ravgarcık.js");
const Database = require('../models/inviter.js');

exports.execute = async (client, message, args) => {
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  let embed = new MessageEmbed().setAuthor(uye.displayName, uye.user.displayAvatarURL({dynamic: true})).setColor(uye.displayHexColor).setFooter(client.config.SetFooter).setTimestamp();
  Database.findOne({guildID: message.guild.id, userID: uye.id}, (err, inviterData) => {
    if (!inviterData) {
      embed.setDescription(`Davet bilgileri bulunmamaktadır!`);
      message.channel.send(embed);
    } else {
      Database.find({guildID: message.guild.id, inviterID: uye.id}).sort().exec((err, inviterMembers) => {
        let dailyInvites = 0;
        if (inviterMembers.length) {
          dailyInvites = inviterMembers.filter(x => message.guild.members.cache.has(x.userID) && (Date.now() - message.guild.members.cache.get(x.userID).joinedTimestamp) < 1000*60*60*24).length;
        };
        message.channel.send(`Toplam **${inviterData.regular+inviterData.bonus}** davete sahipsin bunların, **${inviterData.regular}** gerçek, **${inviterData.bonus}** bonus, **${inviterData.fake}** fake`);
      });
    };
  })
}
exports.conf = {
    command: "ravgarxx45fd1ew516ewf651wf", // Asıl komutumuz
    description: "Belirtilen kişiyi erkek olarak kayıt eder", // Komut açıklamamız
    aliases: [] // Komutumuzun yardımcıları
  }
 