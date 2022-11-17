const qdb = require("quick.db")
const Discord = require("discord.js")
const moment = require("moment")


const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require("discord.js");

require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  if(message.author.id !== "728161454288535604")
  if(message.author.id !== "853361842641829918") return message.react(client.emojis.cache.find(x => x.name === "ravgarcık_carpi"));

  let knaveqwe = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

  if(args[0] == "ver") {
      knaveqwe.forEach(r => {
  r.roles.add("931987793423515778")
  })
  const khold = new Discord.MessageEmbed()
  .setAuthor(" "+message.author.username +" ", message.author.avatarURL())
  .setColor("RANDOM")
  .setDescription("Sunucuda rolü olmayan \`"+ knaveqwe.size +"\` kişiye kayıtsız rolü verildi!")
  message.channel.send(khold)
  } else if(!args[0]) {
  const khold1 = new Discord.MessageEmbed()
  .setAuthor(""+message.author.username +" ", message.author.avatarURL())
  .setColor("RANDOM")
  .setDescription("Sunucumuzda rolü olmayan \`"+ knaveqwe.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!")
  message.channel.send(khold1)

  client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`rolsüz\` komutunu kullandı. [\`${message.content}\`]`);
  }
  
}


exports.conf = {
  command: "rolsüz", // Asıl komutumuz
  description: "", // Komut açıklamamız
  aliases: ["unregdagit"],
}