const qdb = require("quick.db")
const db = require("quick.db")

const { MessageEmbed } = require("discord.js");

const sicil = new qdb.table("tmute");
const kdb = new qdb.table("kullanici");
const jdb = new qdb.table("cezalar");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format");
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  let vmutebilgi = await db.get(`vmutebilgi_ravgar`);
  if (!vmutebilgi) return message.lineReply("V-Mute Bilgi Kanalı Kurulmamış. \`.islemsetup\`")
  let cpuanbilgi = await db.get(`cpuanbilgi_ravgar`);
  let vmutedperm = await db.get(`vmuted_${message.guild.id}`);

  
  let embed2 = new MessageEmbed().setColor("RANDOM");
  let arr = await  db.get(`vmuteyetkilirole_${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {


    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply("Bir kullanıcı belirt ve tekrar dene.")
    if(user.id === message.author.id) return message.lineReply("Kendine ceza-i işlem uygulayamazsın.")  
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.lineReply("Belirttiğin kullanıcı senle aynı veya üst bir rolde olduğu için işlemi uygulayamadım.")  

    let muteler = jdb.get(`tempsmute`) || [];
    let time = args[1];
    if(!time || !ms(time)) return message.lineReply("Bir zaman belirtmelisin.")

    let reason = args.splice(2).join(" ");
    if(!reason) reason = "Sebep belirtilmedi.";

    qdb.add(`smuteAlma.${user.id}`, 1) //User kaç mute yemiş onu saya
    qdb.add(`smuteAtma.${message.member.id}`, 1) //User kaç tane mute atmış onu sayar
    qdb.add(`cpuan${user.id}`, 10) //Userin ceza puanını sayar
    qdb.add(`Cezaİd_`, +1); //Ceza ID'yi sayar
let aylar = {"01": "Ocak","02": "Şubat","03": "Mart","04": "Nisan","05": "Mayıs","06": "Haziran","07": "Temmuz","08": "Ağustos","09": "Eylül","10": "Ekim","11": "Kasım","12": "Aralık"};  
let Cezaİd = qdb.fetch(`Cezaİd_`) + 1; //
let durum = await kdb.get(`durum.${user.id}.vmute`)
let cpuan = qdb.fetch(`cpuan${user.id}`)
let tarih = moment(Date.now()).format('DD/MM/YYYY H:mm')
let bitis =  moment(Date.now() + ms(time)).format('DD/MM/YYYY H:mm')
qdb.set(`user.${user.id}.sicil`, {sebep: reason, kod: Cezaİd, yetkili: message.author.id, uyes: user.id, yetkili2: message.author.userName, bsure: tarih, ssure: bitis,cezatip: "Voice Mute", cpuan : "10"});
qdb.push(`info.${user.id}.ihlal`, {sebep: reason, kod: Cezaİd, yetkili: message.author.id,  uyes: user.id, yetkili2: message.author.displayName, bsure: tarih, ssure: "---", cpuan : "10",cezatip: "Voice Mute "});
qdb.push(`info.${user.id}.kullanıcıvoice`, {sebep: reason,kod: Cezaİd,yetkili: message.author.id, uyes: user.id,bsure: tarih,ssure: bitis,cpuan : "10",cezatip: "Voice Mute "});
qdb.set(`cezaBilgi_${Cezaİd}`, {sebep: reason,kod: Cezaİd,yetkili2: message.author.displayName,yetkili: message.author.id, uyes: user.id,bsure: tarih,   cpuan : "10",ssure: bitis,cezatip: "Voice Mute"});
qdb.set(`voiceCehck_${user.id}`, reason); //Mute geri açma
await user.roles.add(vmutedperm).catch(e => { })
if(user.voice.channel) user.voice.setMute(true);
setTimeout(async () => {
await user.roles.remove(vmutedperm).catch(e => { })
qdb.delete(`voiceCehck_${user.id}`)
if(user.voice.channel) user.voice.setMute(false);
jdb.push(`sessusturulma`, {id: user.id, kalkmaZamani: Date.now()+ms(time)})}, ms(time));
let ravgardmembed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(`Ceza Numaran: #${Cezaİd} & CezaPuanın: ${cpuan}`).setColor("RANDOM");
let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(`Ceza Numarası: #${Cezaİd}`).setColor("RANDOM");
let guild = "ravgar"
  client.channels.cache.get(vmutebilgi).send(embed.setDescription(`
  ${user} - (\`${user.id}\`) adlı kullanıcı Ses kanallarında susturuldu.
  • Voice Muteleyen Yetkili: ${message.author} (\`${message.author.id}\`)
  • Voice Mute Süresi: \`${time.replace(`s`, ` Saniye`).replace(`m`, ` Dakika`).replace(`h`, ` Saat`).replace(`d`, ` Gün`)}\`\n• Voice Mute Tarihi: \`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now()).format("YYYY HH:mm:ss")}\`
  • Voice Mute Bitiş Tarihi: \`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now() + ms(time)).format('YYYY HH:mm:ss')}\`
  • Voice Mute Sebebi: [\`${reason}\`]
`)).catch(e => { })  
client.channels.cache.get(cpuanbilgi).send(`${user} aldığınız **#${Cezaİd}** ID'li ceza ile **${cpuan}** ceza puanına ulaştınız.`).catch(e => { })
qdb.set(`voiceCehck_${user.id}`, reason); //Mute geri açma
message.lineReply(`${user} Üyesi **${reason}** sebebiyle ${message.author} tarafından **${time.replace(`s`, ` Saniye`).replace(`m`, ` Dakika`).replace(`h`, ` Saat`).replace(`d`, ` Gün`)}** boyunca ses kanallarında susturuldu! **Ceza Numarası:**(\`#${Cezaİd}\`)`)};
  client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.vmute\` komutunu kullandı. [\`${message.content}\`]`);
}

exports.conf = {
  command: "vmute", // Asıl komutumuz
  description: "Ses kanllarındaki mutesini başlatır", // Komut açıklamamız
  aliases: ["v-mute","sesmute","ses-mute","voice-mute","voicemute"] // Komutumuzun yardımcıları
}
