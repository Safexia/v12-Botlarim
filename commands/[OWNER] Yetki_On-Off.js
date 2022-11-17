
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

const db = require("quick.db");
exports.execute = async (client, message, args) => {
    if(message.author.id !== "728161454288535604") 
    if(message.author.id !== "911778915624845372")
    if(message.author.id !== "504328724187971584")
    if(message.author.id !== "916044160899887155")
    return
    let Khold = args[0]
    if(!Khold){
    }
  if(Khold == "finish" || Khold == "çık" || Khold == "off"){
    message.guild.roles.cache.get("922951112099762197").setPermissions(8) //Founder
    message.guild.roles.cache.get("922951113001533480").setPermissions(1543572694) //Führer
    message.guild.roles.cache.get("922951113827844146").setPermissions(1543572678) //Owner
    message.guild.roles.cache.get("922951121918636112").setPermissions(1543572676)  //EKO
    message.guild.roles.cache.get("922951127752921148").setPermissions(1275137220) //GOD HAND
    console.log("Sunucu ohal modundan çıkarıldı.")

    client.channels.cache.get("923218134863847444").send(`Sunucu ${message.author} tarafından **OHAL** modundan çıkarıldı.`)
    return message.channel.send(`Sunucu Ohal Modundan çıkarıldı.`)
    
  } 
  if(Khold == "on" || Khold == "geç" || Khold == "tehlike"){
   let arr = ["ADMINISTRATOR","MANAGE_ROLES","KICK_MEMBERS","BAN_MEMBERS","MANAGE_CHANNELS","MANAGE_GUILD"];
   message.guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true).map(t => t.setPermissions(0));
   message.channel.send(`Sunucuda Ohal Moduna giriş yapıldı.`)
   client.channels.cache.get("923218134863847444").send(`Sunucu ${message.author} tarafından **OHAL** moduna giriş yapıldı.`)
console.log("Sunucuda ohal moduna geçildi.")
  }
  client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.ohal\` komutunu kullandı. [\`${message.content}\`]`);

  }

  exports.conf = {
    command: "ohal",
    aliases: []
    } 