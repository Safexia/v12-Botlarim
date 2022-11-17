const { MessageEmbed, Discord } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const kdb = new qdb.table("Kayıt");
exports.execute = async (client, message, args) => {
    const qdb = require("quick.db")

    let embed2 = new MessageEmbed().setColor("RANDOM");
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!message.member.roles.cache.has(client.config.OwnerRole))
    if(message.author.id !== client.config.BotOwner) return 
    

let toplamyayın = qdb.fetch(`toplamyayın_`) || `0`;

kdb.delete(`kullanici.${user.id}.kayıt`);

message.channel.send(new MessageEmbed()
.setDescription(`${user} adlı kişinin İsim Verisini sıfırladınız.`)
.setColor(`GREEN`))

client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.isimreset\` komutunu kullandı. [\`${message.content}\`]`);


}
exports.conf = {
    command: "isimreset",
    aliases: ["isimlersıfırla"]
} 
