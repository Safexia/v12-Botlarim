const Discord = require("discord.js")
exports.execute = async (client, message, args) => {
    const qdb = require("quick.db")


    if(!message.member.roles.cache.has(client.config.OwnerRole))
    if (!message.member.hasPermission("ADMINISTRATOR"))
    if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
   
let csm = message.mentions.members.first() || message.guild.members.cache.get(args[0])

let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM");

if(!csm) return message.reply(new Discord.MessageEmbed()
.setDescription("Bir kullanıcı belirtmelisin."))
let yayınacmauser = qdb.fetch(`yayınacma.${csm.id}`) || `0`;

 qdb.delete(`yayınacma.${csm.id}`);

 message.lineReply(new Discord.MessageEmbed().setFooter("Kullanıcının yayın bilgilerini sıfırlamak için .streamerdenetsıfırla @Uye/ID")
.setDescription(`${csm} adlı kullanıcı toplam **${yayınacmauser}** bulunan yayın açma geçmişi ${message.author} tarafından sıfırlandı.`)
.setColor(`GREEN`))




const ravgarembed = new Discord.MessageEmbed().setFooter(`Sıfırlanmadan önce açtıgı yayın sayısı: ${yayınacmauser} `).setColor("BLUE").setDescription(`${csm} (\`${csm.id}\`) adlı kullanıcının yayın açma geçmisi ${message.author} \`(${message.author.id})\` tarafından sıfırlandı.`)
client.channels.cache.get(client.config.StreamerDenetleyiciLog).send(ravgarembed);

client.channels.cache.get(client.config.KomutLog).send(`[${tarih}] - :wrench: **${message.author.tag}** adlı kullanıcı ${message.channel} adlı kanalda \`.streamerdenetsıfırla\``);

}
exports.conf = {
    command: "streamerdenetsıfırla",
    aliases: ["streamersıfırla"]
} 
