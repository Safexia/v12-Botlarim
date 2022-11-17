const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const db = require("quick.db")
const limitu = new Map();
const sicil = new qdb.table("tmute");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format")
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");

  let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");

   
  let arr = await  db.get(`jailyetkilirole_${message.guild.id}`) || []
  if (!message.member.permissions.has(8) || !message.member.roles.cache.some(e => arr.some(x => x == e))) {

    let jailbilgi = await db.get(`jailbilgi_ravgar`);
    if (!jailbilgi) return message.lineReply("Jail Bilgi Kanalı Kurulmamış. \`.islemsetup\`")
    let cpuanbilgi = await db.get(`cpuanbilgi_ravgar`);
    let cezalırol = await db.get(`cezalırole_${message.guild.id}`);

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
    if (client.config.JailLimit > 0 && limitu.has(message.author.id) && limitu.get(message.author.id) == client.config.JailLimit) return message.channel.send(`1 Saat İçerisinde **${client.config.JailLimit}** kişiye Jail/Cezalı atabilirsin.`);
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply("Bir kullanıcı belirt ve tekrar denee.")
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.lineReply("Belirttiğin kullanıcı senle aynı veya üst bir rolde oldugu için ceza-i işlem uygulayamadım.")
    if(user.id === message.author.id) return message.lineReply("Kendine ceza-i işlem uygulayamazsın.") 
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Sebep Belirtilmedi.";


    qdb.add(`jailAlma.${user.id}`, 1) //User kaç mute yemiş onu sayar
    qdb.add(`jailAtma.${message.member.id}`, 1) //Yetkili kaçtane mute atmış onu sayar

    qdb.add(`cpuan${user.id}`, 20) //Ceza puan sayma
    qdb.add(`Cezaİd_`, +1); //Ceza ID sayma

    let Cezaİd = qdb.fetch(`Cezaİd_`) + 1; //Ceza ID veri çekme 
    let cpuan = qdb.fetch(`cpuan${user.id}`) //Ceza puan veri çekme

    let tarih = moment(Date.now()).format('DD/MM/YYYY H:mm')
    qdb.set(`jailRoles.${user.id}`, user.roles.cache.map(x => x.id)) //Jail rol kayıt etme
    qdb.set(`jaill.${user.id}`, `jails`) //KALICI JAİL KOMUTU
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
    await user.roles.set(cezalırol);

    
qdb.set(`cezaBilgi_${Cezaİd}`, {sebep: reason, kod: Cezaİd, yetkili: message.author.id,  yetkili2: message.author.displayName, uyes: user.id, bsure: tarih, ssure: "Kalıcı", cezatip: "Prem Jail"});
qdb.set(`user.${user.id}.sicil`, { sebep: reason, kod: Cezaİd, yetkili: message.author.id, uyes: user.id, bsure: tarih, ssure: "---", yetkili2: message.author.displayName, cezatip: "Cezalı          "});
qdb.push(`info.${user.id}.ihlal`, { sebep: reason, kod: Cezaİd, yetkili: message.author.id, uyes: user.id, bsure: tarih, yetkili2: message.author.displayName, ssure: "Bilinmiyor", cezatip: "Cezalı     "});
qdb.push(`info.${user.id}.kullanıcıcezalı`, {sebep: reason, kod: Cezaİd, yetkili: message.author.id, yetkili2: message.author.displayName, uyes: user.id, bsure: tarih, ssure: "Bilinmiyor.", cezatip: "Cezalı"});

    client.channels.cache.get(jailbilgi).send(embed.setDescription(`
    ${user}- (\`${user.id}\`) adlı kullanıcı Cezalıya atıldı.
    • Cezalıya Atan Yetkili: ${message.author} \`${message.author.id}\`
    • Cezalı Süresi: \`SINIRSIZ\`
    • Cezalı Atılma Tarihi: \`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now()).format("YYYY HH:mm:ss")}\`
    • Cezalı Bitiş Tarihi: \`Sınırsız Ceza\`
    • Cezalı Sebebi: [\`${reason}\`]
    `)).catch(e => { })
      message.lineReply(`${user} Üyesi **${reason}** sebebiyle ${message.author} tarafından cezalıya atıldı.`)

}    if (client.config.JailLimit > 0) {
  if (!limitu.has(message.author.id)) limitu.set(message.author.id, 1);
  else limitu.set(message.author.id, limitu.get(message.author.id) + 1);
  setTimeout(() => {
    if (limitu.has(message.author.id)) limitu.delete(message.author.id);
  }, 1000 * 60 * 60)
};
client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.jail\` komutunu kullandı. [\`${message.content}\`]`);

};
exports.conf = {
  command: "jail", // Asıl komutumuz
  description: "Süreli Jaile Atar.", // Komut açıklamamız
  aliases: ["cezalı", "kalıcı-jail"] // Komutumuzun yardımcıları
}
