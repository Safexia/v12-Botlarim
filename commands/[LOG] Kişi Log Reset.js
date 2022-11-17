const Discord = require("discord.js")
exports.execute = async (client, message, args) => {
    const qdb = require("quick.db")
    const moment = require("moment")


    if(!message.member.roles.cache.has(client.config.OwnerRole))
    if (!message.member.hasPermission("ADMINISTRATOR"))
    if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
   
let csm = message.mentions.members.first() || message.guild.members.cache.get(args[0])

let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM");

if(!csm) return message.reply(new Discord.MessageEmbed()
.setDescription("Bir kullanıcı belirtmelisin."))
let data = qdb.get(`rollog.${csm.id}.kullanıcı`) || [];

qdb.delete(`rollog.${csm.id}.kullanıcı`) || [];
message.react(client.emojis.cache.find(x => x.name === "emojix"));

message.channel.send(new Discord.MessageEmbed().setFooter(client.config.SetFooter)
.setDescription(`${csm} adlı kullanıcı toplam ${data.lenght} rol Alınma/Verilme işlemi bulunmaktadır. 
Bunları işlemleri başarılı bir şekilde temizledin.`)
.setColor(`GREEN`))

client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.rolloguserreset\` komutunu kullandı. [\`${message.content}\`]`);

}



exports.conf = {
    command: "rolloguserreset",
    aliases: []
} 
