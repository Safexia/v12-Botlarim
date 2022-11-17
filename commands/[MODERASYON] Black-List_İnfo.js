const { MessageEmbed, Role } = require("discord.js");
const qdb = require("quick.db");
require("../ravgarcık.js");
const ms = require('ms');
const moment = require("moment");


exports.execute = async (client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");


  if(!message.member.roles.cache.has(client.config.OwnerRole))
  if (!message.member.hasPermission("ADMINISTRATOR"))
  if(!message.member.roles.cache.has(client.config.KaraListeYetkili))
  if(message.author.id !== client.config.BotOwner) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`)); 


    let embed = new MessageEmbed().setAuthor("Kara Liste Üyeleri").setFooter(client.config.SetFooter).setColor("RANDOM");
    let data = qdb.get(`karaL`) || {};
    let arr = Object.keys(data);

    let bilgi = arr.map((value) => `\`${data[value].users}\` Atılma Zamanı: ${data[value].zaman}`).join("\n");

    message.channel.send(embed.setDescription(`\n${bilgi}`));

};
exports.conf = {
  command: "karaliste-bilgi", // Asıl komutumuz
  description: "Kara liste bilgiyi atar", // Komut açıklamamız
  aliases: ["kara-liste-bilgi","klb"],
};