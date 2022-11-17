const Discord = require("discord.js")
exports.execute = async (client, message, args) => {
    const qdb = require("quick.db")

    let embed2 = new MessageEmbed().setColor("RANDOM");

    if(!message.member.roles.cache.has(client.config.OwnerRole))
    if(message.author.id !== client.config.BotOwner) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));

let toplamyayın = qdb.fetch(`toplamyayın_`) || `0`;

 qdb.delete(`toplamyayın_`);

message.channel.send(new Discord.MessageEmbed().setFooter(client.config.SetFooter)
.setDescription(`Sunucudan açılan toplam **${toplamyayın}** bulunan yayın açma geçmişi ${message.author} tarafından sıfırlandı.`)
.setColor(`GREEN`))



var ravgargönder = '832706208574078981'
const ravgarembed = new Discord.MessageEmbed().setFooter(`Sıfırlanmadan önce açılan yayın sayısı: ${toplamyayın} `).setColor("BLUE").setDescription(`sunucunun yayın açma geçmişi ${message.author} tarafından sıfırlandı.`)
client.channels.cache.get(ravgargönder).send(ravgarembed);

client.channels.cache.get(client.config.KomutLog).send(`[${tarih}] - :wrench: **${message.author.tag}** adlı kullanıcı ${message.channel} adlı kanalda \`fullyayınsıfırla\``);

}
exports.conf = {
    command: "fullyayınsıfırla",
    aliases: ["fullstreamersıfırla"]
} 
