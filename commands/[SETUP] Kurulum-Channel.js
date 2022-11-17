const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");
require("moment-duration-format");
const moment = require("moment");
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  if(message.author.id !== "728161454288535604")  return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

  
      let embed = new MessageEmbed().setColor("RANDOM");
  
    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));
    const kanal = message.mentions.channels.first()
    if(args[0] == "kayıtkanal") {
      db.set(`registerchat_ravgar`, kanal.id)
      message.channel.send(embed.setDescription(` Register Kanalı ${kanal} olarak tanımlandı.`))
    }  
    if(args[0] == "reklambilgi") {
      db.set(`reklambilgi_ravgar`, kanal.id)
      message.channel.send(embed.setDescription(` Register Kanalı ${kanal} olarak tanımlandı.`))
    }  
    
    if(args[0] == "genelchat") {
      db.set(`genelchat_ravgar`, kanal.id)
      message.channel.send(embed.setDescription(`Genel Chat ${kanal} olarak tanımlandı.`))
    }  
    if(args[0] == "kurallar") {
      db.set(`kurallar_ravgar`, kanal.id)
      message.channel.send(embed.setDescription(`Kurallar kanalı ${kanal} olarak tanımlandı.`))
    }  
   
    if(args[0] == "vmutebilgi") {
      db.set(`vmutebilgi_ravgar`, kanal.id)
      message.channel.send(embed.setDescription(`VoiceMute bilgi kanalı ${kanal} olarak tanımlandı.`))
    }  

    if(args[0] == "cmutebilgi") {
      db.set(`cmutebilgi_ravgar`, kanal.id)
      message.channel.send(embed.setDescription(`ChatMute bilgi kanalı ${kanal} olarak tanımlandı.`))
    }  

    if(args[0] == "jailbilgi") {
      db.set(`jailbilgi_ravgar`, kanal.id)
      message.channel.send(embed.setDescription(`Jail bilgi kanalı ${kanal} olarak tanımlandı.`))
    }  
    
    if(args[0] == "banbilgi") {
      db.set(`banbilgi_ravgar`, kanal.id)
      message.channel.send(embed.setDescription(`Ban bilgi kanalı ${kanal} olarak tanımlandı.`))
    }  

    if(args[0] == "cezapuanbilgi") {
      db.set(`cpuanbilgi_ravgar`, kanal.id)
      message.channel.send(embed.setDescription(`Cezapuan bilgi kanalı ${kanal} olarak tanımlandı.`))
    }  
  }
exports.conf = {
    command: "kanalsetup",
    aliases: [],
    description: "Belirtilen üyenin tüm bilgilerini gösterir."
}
