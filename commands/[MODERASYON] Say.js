const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports.execute = async (client, message, args) => {       
  let embed2 = new MessageEmbed().setColor("RANDOM");

   
  let arr = await  db.get(`botkomutrole_${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {


   var TotalMember = message.guild.memberCount
   let wert = "ʷ"
   let w = "Achilles"
   kırkk = "§"
   let tagımız = "Resy"
   let isimsayı = message.guild.members.cache.filter(u => u.user.username.includes(tagımız)).size;
   var etiket =  message.guild.members.cache.filter(u => u.user.username).filter(member => member.user.discriminator == "1837").size;
   let bot = message.guild.members.cache.filter(s => s.voice.channel && s.user.bot).size
   var Boost = message.guild.premiumSubscriptionCount;
   var BoostLevel = message.guild.premiumTier;
   var Booster = message.guild.member.premiumSubscriptionCount;
          var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
          var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
                            


          const ravgarembed = new Discord.MessageEmbed()
              .setColor('RANDOM')
              .setDescription(`
**>** Sunucumuzda toplam **${TotalMember}** kullanıcı bulunmaktadır.
**>** Toplam (**${isimsayı + etiket}**) taglı kullanıcı var.
**>** Aktif **${Online}** kullanıcı bulunmaktadır.
**>** Ses Kanallarında **${Voice} (+${bot} bot)** kullanıcı bulunmaktadır.
`)
message.lineReply(ravgarembed)
}
}
exports.conf = {
  command: "say", // Asıl komutumuz
  description: "Sunucdaki ceza puanını atar", // Komut açıklamamız
  aliases: ["sunucusay","sesli","sayy","sessay"] // Komutumuzun yardımcıları
}
