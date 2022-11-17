const Discord = require("discord.js")
exports.execute = async (client, message, args) => {
    const qdb = require("quick.db")
    const db = require("quick.db")
    const moment = require("moment")


    let arr = await  db.get(`botkomutrole_${message.guild.id}`) || []
    if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
  

let csm = message.mentions.members.first() || message.guild.members.cache.get(args[0])

let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM");

if(!csm) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
 

let data = qdb.get(`rollog.${csm.id}.kullanıcı`) || [];
data = data.reverse();

let roller = data.length > 0 ? data.map((value, index) => `\`${value.tarih} ${value.almaverme}\` ${value.alanveren} ${value.rolbilgi}`).slice(0,20).join("\n") : "";

message.lineReply(new Discord.MessageEmbed().setFooter(client.config.SetFooter)
.setDescription(`${csm} adlı kullanıcısının rol Alınma/Verilme işlemi bulunmaktadır. 
Son 20 Rol Alınma/Verilme işlemi aşağıda belirtilmiştir.
 
${roller || "Veri Bulunamadı."}`)
.setColor(`GREEN`))
}
client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.rollog\` komutunu kullandı. [\`${message.content}\`]`);

}



exports.conf = {
    command: "rollog",
    aliases: ["rollogs"]
} 
