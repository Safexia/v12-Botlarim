
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require('ms');
const moment = require("moment");

exports.execute = async (client, message, args) => {
let hembed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RED')
let embed = new MessageEmbed().setColor('#2F3136')

let arr = await  db.get(`botkomutrole_${message.guild.id}`) || []
if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {


let mesaj = db.get(`snipe.${message.guild.id}.${message.channel.id}`);
if (!mesaj) {
message.delete({timeout: 5000})
return message.lineReply(hembed.setDescription(`Bu kanalda silinmiş bir mesaj bulunmamakta.`)).then(msg => msg.delete({timeout: 5000}))}


let mesajYazari = await message.guild.members.cache.get(mesaj.yazar);
if (mesaj.icerik) {
return message.lineReply(embed.setDescription(`
${mesajYazari ? mesajYazari : mesajYazari.tag} - Mesaj: \`${mesaj.dosya ? "Atılan mesaj bir dosya içeriyor." : mesaj.icerik}\`
`))
}

}
}


exports.conf = {
  command: "snipe", // Asıl komutumuz
  description: "Yazılan kanalı everyone rolüne kanala yazı kapatır", // Komut açıklamamız
  aliases: ["silinenmesaj"] // Komutumuzun yardımcıları
}