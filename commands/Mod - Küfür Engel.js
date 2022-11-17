const Discord = require('discord.js')
const db = require('quick.db')
require("../ravgarcık.js");

exports.run = async (client ,message, args) =>{
  let embed2 = new MessageEmbed().setColor("RANDOM");

  if(!message.member.roles.cache.has(client.config.OwnerRole))
  if(message.author.id !== client.config.BotOwner) 

if(args[0] === 'aktif') {
    db.set(`kufur_${message.guild.id}`, "acik")
    message.channel.send('Başarılı Şekilde `Aktif` Edildi.')
  return
}
if (args[0] === 'deaktif') {
  db.delete(`kufur_${message.guild.id}`)
message.channel.send('Başarılı Şekilde `Deaktif` Edildi')
return
}
  message.channel.send('Lüten `Aktif` yada `Deaktif` Yazın!')
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['küfür'],
 permLevel: 0
};

exports.help = {
 name: 'küfür-ayarla',
 description: 'Davet Log Kanalını Belirler',
 usage: 'davet-kanal-ayarla #kanal'
};