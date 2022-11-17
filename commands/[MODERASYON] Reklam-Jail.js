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

  let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");

   
  let arr = await  db.get(`reklamcıyt_${message.guild.id}`) || []
  if (!message.member.permissions.has(8) || !message.member.roles.cache.some(e => arr.some(x => x == e)))
  return; {

    let reklambilgi = await db.get(`reklambilgi_ravgar`);
    if (!reklambilgi) return message.lineReply("Reklam Bilgi Kanalı Kurulmamış. \`.islemsetup\`")

    let cpuanbilgi = await db.get(`cpuanbilgi_ravgar`);
    let reklamcırole = await db.get(`reklamcı_${message.guild.id}`);
    let Unregrole = await db.get(`unregisterrole_${message.guild.id}`);

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply("Bir kullanıcı belirt ve tekrar dene.")
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.lineReply("Belirttiğin kullanıcı senle aynı veya üst bir rolde oldugu için ceza-i işlem uygulayamadım.")
    if(user.id === message.author.id) return message.lineReply("Kendine ceza-i işlem uygulayamazsın.") 



    qdb.add(`reklamyeme.${user.id}`, 1) //User kaç mute yemiş onu sayar
    qdb.add(`reklaatma.${message.member.id}`, 1) //Yetkili kaçtane mute atmış onu sayar

    qdb.add(`cpuan${user.id}`, 20) //Ceza puan sayma
    qdb.add(`Cezaİd_`, +1); //Ceza ID sayma

    let Cezaİd = qdb.fetch(`Cezaİd_`) + 1; //Ceza ID veri çekme 
    let cpuan = qdb.fetch(`cpuan${user.id}`) //Ceza puan veri çekme

    let tarih = moment(Date.now()).format('DD/MM/YYYY H:mm')
    qdb.set(`reklamcıoc.${user.id}`, `reklams`) //KALICI JAİL KOMUTU
    let aylar = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"};
    await user.roles.set(reklamcırole);

    //Ceza ID veri kayıt
    qdb.set(`cezaBilgi_${Cezaİd}`, {
        sebep: "Reklam",
        kod: Cezaİd,
        yetkili: message.author.id, 
        yetkili2: message.author.displayName,
        uyes: user.id,
        bsure: tarih,
        ssure: "Kalıcı",
        cezatip: "Reklam"
    });

    qdb.set(`user.${user.id}.sicil`, {
      sebep: "Reklam",
      kod: Cezaİd,
      yetkili: message.author.id, 
      uyes: user.id,
      bsure: tarih,
      ssure: "---",
      yetkili2: message.author.displayName,
      cezatip: "Reklam"
  });

  qdb.push(`info.${user.id}.ihlal`, {
    sebep: "Reklam",
    kod: Cezaİd,
    yetkili: message.author.id, 
    uyes: user.id,
    bsure: tarih,
    yetkili2: message.author.displayName,
    ssure: "Bilinmiyor",
    cezatip: "Reklam"
});

qdb.push(`info.${user.id}.kullanıcıcezalı`, {
  sebep: "Reklam",
  kod: Cezaİd,
  yetkili: message.author.id, 
  yetkili2: message.author.displayName,
  uyes: user.id,
  bsure: tarih,
  ssure: "Bilinmiyor.",
  cezatip: "Reklam"
});

    client.channels.cache.get(reklambilgi).send(embed.setDescription(`
    ${user}- (\`${user.id}\`) adlı kullanıcı Cezalıya atıldı.
    • Cezalıya Atan Yetkili: ${message.author} \`${message.author.id}\`
    • Cezalı Süresi: \`SINIRSIZ\`
    • Cezalı Atılma Tarihi: \`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now()).format("YYYY HH:mm:ss")}\`
    • Cezalı Bitiş Tarihi: \`Sınırsız Ceza\`
    • Cezalı Sebebi: [\`Reklam\`]
    `)).catch(e => { })
    message.lineReply(`${user} Üyesi **${"Reklam"}** sebebiyle ${message.author} tarafından reklamcıya atıldı. **Ceza numarası:** (\`#${Cezaİd}\`)`)

}
client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.reklam\` komutunu kullandı. [\`${message.content}\`]`);
  
};
exports.conf = {
  command: "reklam", // Asıl komutumuz
  description: "Süreli Jaile Atar.", // Komut açıklamamız
  aliases: ["reklamcı"] // Komutumuzun yardımcıları
}
