const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const sicil = new qdb.table("tmute");
const db = require("quick.db")

const ms = require('ms');
const kdb = new db.table("kullanici");

const moment = require("moment");
require("../ravgar.js");
require("moment-duration-format");


exports.execute = async (client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");

    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");

    let arr = await  db.get(`vmuteyetkilirole_${message.guild.id}`) || []
    if (!message.member.permissions.has(8) || !message.member.roles.cache.some(e => arr.some(x => x == e))) return;
    {
     
    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
    let vmutedperm = await db.get(`vmuted_${message.guild.id}`);

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply(`Bir kullanıcı belirt ve tekrar dene.`)


    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi.";
   message.lineReply(`Bir kullanıcı belirt ve tekrar dene.`)(`${user} adlı kullanıcının ses mutesi ${message.author} tarafından kaldırıldı.`)
client.channels.cache.get("916348188405944381").send(`
${user} (\`${user.id}\`) kullanıcısının sesli kanallarındaki susturulması ${message.member} tarafından **${reason}** sebebi ile kaldırılmıştır.
`).catch(e => { })
let data = await kdb.get(`durum.${user.id}.vmute`)

    await user.roles.remove(vmutedperm).catch(e => { })
    qdb.delete(`voiceCehck_${user.id}`)
    if(user.voice.channel) user.voice.setMute(false);
    if (data) {
      await kdb.delete(`durum.${user.id}.vmute`)}
};
client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.unvmute\` komutunu kullandı. [\`${message.content}\`]`);

}
exports.conf = {
  command: "unsesmute", // Asıl komutumuz
  description: "Ses kanllarındaki mutesini kaldırır.", // Komut açıklamamız
  aliases: ["unvmute", "un-vmute","vunmute", "ses-unmute","sesunmute","voiceunmute","voice-unmute"] // Komutumuzun yardımcıları
}
