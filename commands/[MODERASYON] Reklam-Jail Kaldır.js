const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const db = require("quick.db")

const sicil = new qdb.table("tmute");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format")
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");

  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");

   
  let arr = await  db.get(`reklamcıyt_${message.guild.id}`) || []
  if (!message.member.permissions.has(8) || !message.member.roles.cache.some(e => arr.some(x => x == e))) 
  return;{

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
    let reklamcırole = await db.get(`reklamcı_${message.guild.id}`);
    let Unregrole = await db.get(`unregisterrole_${message.guild.id}`);
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply("Bir kullanıcı belirt ve tekrar dene")
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi.";
    qdb.add(`jailKaldırma.${message.member.id}`, 1)
    qdb.delete(`reklamcıoc.${user.id}`) //KALICI JAİL KOMUTU
    await user.roles.add(Unregrole).catch(e => { });
    await user.roles.remove(reklamcırole)
    message.lineReply(`${user} adlı kullanıcı Reklamcıdan çıkarıldı.`)
    message.react(client.emojis.cache.find(x => x.name === "ravgar_tik"));

  };
  client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.unreklam\` komutunu kullandı. [\`${message.content}\`]`);

}
exports.conf = {
  command: "reklamkaldır", // Asıl komutumuz
  description: "Belirtilen üyenin jailini kaldırır.", // Komut açıklamamız
  aliases: ["un-reklam","unreklam"] // Komutumuzun yardımcıları
}
