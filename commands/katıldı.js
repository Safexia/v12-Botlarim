const qdb = require("quick.db")
const Discord = require("discord.js")


const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require("discord.js");

require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
  if (message.author.id !== "728161454288535604") return;
  let toplantiChannel = "916344000707956756"
  let katıldıRolü = "917475302605717515"
  let enaltyt = message.guild.roles.cache.get('916343927836131329')

  let sestekiler = message.guild.members.cache.filter(x => x.roles.highest.position >= enaltyt.position).filter(s => s.voice.channelID === toplantiChannel)
  let sesteolmayanlar = message.guild.members.cache.filter(x => x.roles.highest.position >= enaltyt.position).filter(s => s.voice.channelID !== toplantiChannel).filter(a => a.roles.cache.has(katıldıRolü))

  sestekiler.array().forEach((uye, index) => {
      setTimeout(async() => {
          uye.roles.add(katıldıRolü)
      }, index * 750)
  })
  sesteolmayanlar.array().forEach((uye, index) => {
      setTimeout(async() => {
          uye.roles.remove(katıldıRolü)
      }, index * 750)
  })
  message.channel.send(embed.setDescription(`
  Katıldı rolü verilecek yetkili sayısı: **${sestekiler.size}**
  Katıldı rolü alınacak yetkili sayısı: **${sesteolmayanlar.size}**
  `))
};


exports.conf = {
  command: "katıldıcık", // Asıl komutumuz
  description: "", // Komut açıklamamız
  aliases: ["ravgar_katıldı"],
}