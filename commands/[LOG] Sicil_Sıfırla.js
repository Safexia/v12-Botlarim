const { MessageEmbed, Discord } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const kdb = new qdb.table("Kayıt");
exports.execute = async (client, message, args) => {
    const qdb = require("quick.db")
 if(!message.member.roles.cache.has(client.config.OwnerRole))
 if(!message.member.roles.cache.has(client.config.BotCommands))
 if(!message.member.roles.cache.has(client.config.AltYetki))
 if(!message.member.roles.cache.has(client.config.OrtaYetki))
 if(!message.member.roles.cache.has(client.config.ÜstYetki))
 if (!message.member.hasPermission("ADMINISTRATOR"))
 if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

    let embed2 = new MessageEmbed().setColor("RANDOM");
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);


let toplamyayın = qdb.fetch(`toplamyayın_`) || `0`;

qdb.delete(`info.${user.id}.ihlal`);

message.channel.send(new MessageEmbed()
.setDescription(`${user} adlı kişinin Ceza-i İşlem Verisini sıfırladınız.`)
.setColor(`GREEN`))
client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.sicilreset\` komutunu kullandı. [\`${message.content}\`]`);


}
exports.conf = {
    command: "resetsicil",
    aliases: ["sicilreset"]
} 
