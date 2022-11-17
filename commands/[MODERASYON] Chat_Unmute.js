const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const db = require("quick.db")

const sicil = new qdb.table("tmute");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format");
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
 
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");
    let embed2 = new MessageEmbed().setColor("RANDOM");

    let arr = await  db.get(`muteyetkilirole_${message.guild.id}`) || []
    if (!message.member.permissions.has(8) || !message.member.roles.cache.some(e => arr.some(x => x == e))) return;
      {
  
    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply("Bir kullanıcı belirt ve tekrar dene.")

    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Sebep Belirtilmedi.";

    message.lineReply(`${user} adlı kullanıcının metin kanallarındaki susturulması kaldırıldı.`)
    await user.roles.remove(client.config.MutedRole).catch(e => { })

    }
    client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.unmute\` komutunu kullandı. [\`${message.content}\`]`);

  };
exports.conf = {
  command: "unmute", // Asıl komutumuz
  description: "Sohbet kanallarındaki mutesini kaldırır", // Komut açıklamamız
  aliases: ["chatunmute","un-chatmute","un-mute"] // Komutumuzun yardımcıları
}
