const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const ms = require('ms');
require("moment-duration-format");
require("../ravgarcık.js");
const moment = require("moment");

exports.execute = async (client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");

  let arr = await  db.get(`botkomutrole_${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {


    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
  
    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let user = message.guild.member(kullanici);

    let cpuan = qdb.fetch(`cpuan${user.id}`) || `0`;
    message.lineReply(embed2.setDescription(`${user} üyesinin ceza pauanı : __**${cpuan}**__`))

};
client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.cezapuan\` komutunu kullandı. [\`${message.content}\`]`);

}
exports.conf = {
  command: "ceza-puan", // Asıl komutumuz
  description: "Sunucdaki ceza puanını atar", // Komut açıklamamız
  aliases: ["cezapuan","cezap","uyarıpuan","uyarı-puan","cp"] // Komutumuzun yardımcıları
}
