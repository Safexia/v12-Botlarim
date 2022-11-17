const { MessageEmbed } = require("discord.js");
const {MessageAttachment} = require("discord.js");
const db = require("quick.db");

const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");



exports.execute = async(client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");

  let arr = await  db.get(`botkomutrole_${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {


  let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
  let user = message.guild.member(kullanici);
    let ihlal = qdb.get(`info.${user.id}.ihlal`) || [];
    ihlal = ihlal.reverse();

    let uyeDurum;
    if (ihlal.length < 5) uyeDurum = 'Çok güvenli!';
    if (ihlal.length >= 5 && ihlal.length < 10) uyeDurum = 'Güvenli!';
    if (ihlal.length >= 10 && ihlal.length < 15) uyeDurum = 'Şüpheli!';
    if (ihlal.length >= 15 && ihlal.length < 20) uyeDurum = 'Tehlikeli!';
    if (ihlal.length >= 20) uyeDurum = 'Çok tehlikeli!';
    let ihlaller2 = ihlal.length > 0 ? ihlal.map((value,) => `
\`\`\`
ID => ${value.kod}
Tür => ${value.cezatip}
Puan => ${value.cpuan}
Sebeb => ${value.sebep}
Bitiş Tarihi => ${value.ssure}
\`\`\`
`).slice(0,1) : "";

    let ihlaller = ihlal.length > 0 ? ihlal.map((value,) => `\`#${value.kod}\` [**${value.cezatip}**]  ${value.bsure} tarihinde **${value.sebep}** sebebiyle <@${value.yetkili}> tarafından cezalandırıldınız`).join("\n\n") : "Bu kullanıcının Sicili temiz!";
    message.channel.send(embed2.setDescription(`:no_entry_sign:${user} kullanıcının ceza-i işlem bilgileri aşığıda belirtilmiştir.\nKişinin..\`(Toplam (${ihlal.length}) ceza. ${uyeDurum})\`\nSon 10 ceza-i işlemi aşağıda belirtilmiştir. ${ihlaller2}\nTekli bir cezaya bakmak için \`.ceza ID\` komutunu uygulayınız.\n ${ihlaller}`))
};
}
exports.conf = {
  command: "ceza-info",
  description: "BU KOD VORTEX TARAFINDAN KODLANDI",
  aliases: ["üyegeçmiş", "testcezali", "üye-geçmiş", "uyegecmis", "uye-gecmis"]  
};
