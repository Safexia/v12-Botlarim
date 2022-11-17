const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");
const limit = new Map();

const moment = require("moment");


exports.execute = async (client, message, args) => {
  let vmutebilgi = await db.get(`vmutebilgi_ravgar`);
  let cpuanbilgi = await db.get(`cpuanbilgi_ravgar`);
  let vmutedperm = await db.get(`vmuted_${message.guild.id}`);

  
  let embed2 = new MessageEmbed().setColor("RANDOM");
  let arr = await  db.get(`banyetkilirole_${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
  if(!message.guild) return;
  let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");
  if (client.config.BanLimit > 0 && limit.has(message.author.id) && limit.get(message.author.id) == client.config.BanLimit) return message.channel.send(`1 Saat İçerisinde **${client.config.BanLimit}** kişiye ban atabilirsin.`);
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply("Bir kullanıcı belirt ve tekrar dene.")
    if(user.id === message.author.id) return message.lineReply("Kendine ceza-i işlem uygulayamazsın.")  
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.lineReply("Belirttiğin kullanıcı senle aynı veya üst bir rolde olduğu için işlemi uygulayamadım.")  
    qdb.add(`Cezaİd_`, +1); //Ceza ID'yi sayar
    let banbilgi = await db.get(`banbilgi_ravgar`);
    let tarih = moment(Date.now()).format('DD/MM/YYYY H:mm')
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
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi"
    let Cezaİd = qdb.fetch(`Cezaİd_`) + 1; //
qdb.set(`cezaBilgi_${Cezaİd}`, {sebep: reason, kod: Cezaİd, yetkili2: message.author.displayName, yetkili: message.author.id, uyes: user.id, bsure: tarih, ssure: "Sınırsız.", cezatip: "BAN"});
qdb.set(`user.${user.id}.sicil`, {sebep: reason, kod: Cezaİd, yetkili: message.author.id, uyes: user.id, yetkili2: message.author.userName, bsure: tarih, ssure: "Sınırsız", cezatip: "Ban", cpuan : "10"});
qdb.push(`info.${user.id}.ihlal`, {sebep: reason, kod: Cezaİd, yetkili: message.author.id, uyes: user.id, yetkili2: message.author.displayName, bsure: tarih, ssure: "Sınırsız", cpuan : "10", cezatip: "Ban "});
qdb.push(`info.${user.id}.kullanıcıvoice`, {sebep: reason, kod: Cezaİd, yetkili: message.author.id, uyes: user.id, bsure: tarih, ssure: "Sınırsız", cpuan : "10", cezatip: "Ban "});
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send(`Senden Üstün Veye Aynı Rolde Olan Bir Yetkiliye Ban Atamazsın!`).then(x => x.delete({timeout: 5000})).catch(e => { });
    message.channel.send(`**${user.user.tag}** adlı kullanıcı ${message.author} tarafından sunucudan banlandı. **Ceza Numarası:**(\`${Cezaİd}\`) `)
    qdb.add(`banAtma.${message.member.id}`, 1)
    client.channels.cache.get(banbilgi).send(embed.setDescription(`
    ${user}- (\`${user.id}\`) adlı kullanıcı sunucudan yasaklandı.
    • Yasaklayan Yetkili: ${message.author} \`${message.author.id}\`
    • Yasaklanma Süresi: \`SINIRSIZ\`
    • Yasaklanma Tarihi: \`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now()).format("YYYY HH:mm:ss")}\`
    • Yasaklanma Bitiş Tarihi: \`Sınırsız Ceza\`
    • Yasaklanma Sebebi: [\`${reason}\`]
    `)).catch(e => { });
   user.ban({reason: `${reason} | ${message.author.tag}`}).catch(err => console.error(error));
    user.ban().catch(e => { });
    if (client.config.BanLimit > 0) {
      if (!limit.has(message.author.id)) limit.set(message.author.id, 1);
      else limit.set(message.author.id, limit.get(message.author.id) + 1);
      setTimeout(() => {
        if (limit.has(message.author.id)) limit.delete(message.author.id);
      }, 1000 * 60 * 60)
    };

  }
  client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.ban\` komutunu kullandı. [\`${message.content}\`]`);
};

exports.conf = {
  command: "ban", // Asıl komutumuz
  description: "Ban Atar", // Komut açıklamamız
  aliases: ["yasakla", "ravgarinlaneti", "gavur"] // Komutumuzun yardımcıları
}