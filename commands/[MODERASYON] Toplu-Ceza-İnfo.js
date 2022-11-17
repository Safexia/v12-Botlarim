const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");



exports.execute = async(client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");

  let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
  let user = message.guild.member(kullanici);
  let embed = new MessageEmbed().setColor("BLACK").setThumbnail(kullanici.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  if(message.author.id !== "728161454288535604") 

  if(!message.member.roles.cache.has(client.config.OwnerRole))
  if(!message.member.roles.cache.has(client.config.BotCommands))
  if(!message.member.roles.cache.has(client.config.AltYetki))
  if(!message.member.roles.cache.has(client.config.OrtaYetki))
  if(!message.member.roles.cache.has(client.config.ÜstYetki))
  if (!message.member.hasPermission("ADMINISTRATOR"))
  if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
    let cpuan = qdb.fetch(`cpuan${kullanici.id}`) || `0`;
    let voicemute = qdb.get(`info.${user.id}.kullanıcıvoice`) || [];
    let inv =  qdb.fetch(`inv.${user.id}.total`) || 0;  
    let chatmute = qdb.get(`info.${user.id}.kullanıcıchat`) || [];
    let cezalı = qdb.get(`info.${user.id}.kullanıcıcezalı`) || [];
    let tekilvoicemute = qdb.fetch(`info.${user.id}.kullanıcıvoicetekil`)
   
    voicemute = voicemute.reverse();
    chatmute = chatmute.reverse();
    cezalı = cezalı.reverse();

    let voice = voicemute.length > 0 ? voicemute.map((value,) => `Ceza ID: \`#${value.kod}\`\nCeza Sebebi: \`${value.sebep}\`\nCeza Tarihi: \`${value.bsure}\`\nCeza Bitiş: \`${value.ssure}\``).slice(0,1) : "Veritabanında voice mute bilgisi bulunmamakta.";
    let mute = chatmute.length > 0 ? chatmute.map((value,) => `Ceza ID: \`#${value.kod}\`\nCeza Sebebi: \`${value.sebep}\`\nCeza Tarihi: \`${value.bsure}\`\nCeza Bitiş: \`${value.ssure}\``).slice(0,1) : "Veritabanında chat mute bilgisi bulunmamakta.";
    
    let ceza = cezalı.length > 0 ? cezalı.map((value,) => `Ceza ID: \`#${value.kod}\`\nCeza Sebebi: \`${value.sebep}\`\nCeza Tarihi: \`${value.bsure}\`\nCeza Bitiş: \`${value.ssure}\``).slice(0,1) : "Veritabanında cezalı bilgisi bulunmamakta.";
    message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setThumbnail(kullanici.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setDescription(`**➤ Kullanıcı bilgisi:** 
    ${user} kişisinin ceza bilgileri aşağıda belirtilmiştir.

    **➤ Cezalı Bilgisi:**\n${ceza}

    **➤ Chat Mute Bilgisi:**\n${mute}
 
    **➤ Ses Mute Bilgisi:**\n${voice}
    `));
    
 
  }
exports.conf = {
  command: "info",
  description: "BU KOD VORTEX TARAFINDAN KODLANDI",
  aliases: ["testinfo"]  
}
