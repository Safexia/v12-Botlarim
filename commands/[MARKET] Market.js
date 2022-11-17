const { MessageEmbed, MessageFlags } = require("discord.js");
const qdb = require("quick.db");
const ms = require('ms');
const moment = require('moment');
require("moment-duration-format");
require("../ravgarcık.js");
const db = require("quick.db");

exports.execute = async (client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");
  let arr = await  db.get(`botkomutrole_${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {

   let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM").setTimestamp();

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.lineReply(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));
    if (!args[0]) return message.lineReply("Eksik bilgi girdiniz. \`.market ürünler\`, \`.market ürünlerim\`,\`.market puanım\` şeklinde tekrar yazınız.") 

    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let user = message.guild.member(kullanici);
    let marketpuan = qdb.fetch(`marketpuan${user.id}`) || `0`;
    let erkek = qdb.get(`erkekKayit_${user.id}`) || `0`;
    let toplamkayıt = qdb.get(`toplamKayit_${user.id}`) || `0`;
    let kız = qdb.get(`bayanKayit_${user.id}`) || `0`;
    let tarih = moment(Date.now()).format('DD/MM/YYYY H:mm')

  let ürün1 = "🎇 | Orcharis"
  let ürün2 = "🎆 | Juddy"
  let ürün3 = "🌌 | Fources"
  let ürün4 = "Ürün Role #4"
  let ürün5 = "🌠 | Sanroof"
  let ürünlerim1 = qdb.get(`ürünlerim1.${user.id}`) || `0`;
  let ürünlerim2 = qdb.get(`ürünlerim2.${user.id}`) || `0`;
  let ürünlerim3 = qdb.get(`ürünlerim3.${user.id}`) || `0`;
  let ürünlerim4 = qdb.get(`ürünlerim4.${user.id}`) || `0`;
  let ürünlerim5 = qdb.get(`ürünlerim5.${user.id}`) || `0`;
  let bakiye = qdb.fetch(`marketpuan${user.id}`) || `0`;
    
    if (args[0] === "puanım") {
    message.lineReply(embed.setDescription(`Merhaba ${user} suan umarım iyisindir..\n\nKontrollerimi sağladım ve Veritabanında bulduğum sonuçlar;\nToplam **${toplamkayıt}** tane kayıt işlemin bulunmakta bunların **${erkek}** tanesi "Erkek" **${kız}** tanesi "Kadın" bu verilere karşılık puanın aşağıda belirlenmiş.\n\n**${toplamkayıt}** tane kayıtına karşılık toplam **${marketpuan}** puanın bulunmakta.\n**${marketpuan}** bu puana alabileceklerini \`.market\` yazarak öğrenebilirsin.`)).catch(e => { })
    }

    if (args[0] === "ürünler") {
    message.lineReply(embed.setDescription(`Merhaba ${user} suan umarım iyisindir..\nBakiyen : **${marketpuan}** Puan
    \`\`\`
ID        Ürün İsmi      Ürün Detayı        Fiyatı 
#1        Orcharis       Kalıcı Rol         1000   💰
#2        Juddy          Kalıcı Rol         1000   💰     
#3        Fources        Kalıcı Rol         1000   💰
#4        Sanroof        Kalıcı Rol         1000   💰
#5    Nitro Classic      1 Aylık  Nitro     300000 💰
\`\`\` 
  \`.marketal <ID>\` yazarak satın alma yapabilirsiniz.  `)).catch(e => { })
    }


  if (args[0] === "ürünlerim") {
    message.lineReply(embed.setDescription(`Selam ${user} sunucumuzda kayıt puanı ile satın aldığın ürünler aşağıda belirtilmiştir.

    
    **${ürün1}** : **${ürünlerim1}** adet
    **${ürün2}** : **${ürünlerim2}** adet
    **${ürün3}** : **${ürünlerim3}** adet
    **${ürün4}** : **${ürünlerim4}** adet
    **${ürün5}** : **${ürünlerim5}** adet 
    
    Sunucu içerisindeki bakiyen : **${bakiye}**
    
    Ürünlerinle herhangi bir sorun oldugu takdirde Üst Yetkililerimize bildirerek sorunu çözebilirsin.`))}  
  
    client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.market\` komutunu kullandı. [\`${message.content}\`]`);

  };
}
exports.conf = {
  command: "kayıtmarket", // Asıl komutumuz
  description: "Sunucdaki ceza puanını atar", // Komut açıklamamız
  aliases: ["market","kpuanım","teyitpuan","puan"] // Komutumuzun yardımcıları
}
