const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");

const moment = require("moment");


exports.execute = async (client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");

  if(!message.guild) return;
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");

  
  let arr = await  db.get(`banyetkilirole_${message.guild.id}`) || []
  if (!message.member.permissions.has(8) || !message.member.roles.cache.some(e => arr.some(x => x == e))) {

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return;

	  if (!args[0] || isNaN(args[0])) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
    let user = args[0];
    if(!user) return message.lineReply("Bir kullanıcı belirt ve tekrar dene.")

    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi"


    qdb.add(`banAtma.${message.member.id}`, 1)

    message.guild.members.unban(user)
    message.lineReply(`${user.tag} adlı kullanıcının sunucu yasağı başarılı bir şekilde kaldırıldı.`)
    
    client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.unban\` komutunu kullandı. [\`${message.content}\`]`);

  };
}



exports.conf = {
  command: "unban", // Asıl komutumuz
  description: "Ban Atar", // Komut açıklamamız
  aliases: ["unyasakla"] // Komutumuzun yardımcıları
}
