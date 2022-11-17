const { MessageEmbed } = require("discord.js");
const { Discord } = require("discord.js");

const client = global.client;
const qdb = require("quick.db");
const db = require("quick.db");

const moment = require("moment");

require("moment-duration-format");

exports.execute = async (member) => {
  

  let guvenli = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  let jail = qdb.get(`jaill.${member.id}`)
  let fBan = qdb.get(`fBan.${member.id}`)
  reklam = qdb.get(`reklamcıoc.${member.id}`)

  if(fBan) {
    member.ban();
    client.channels.cache.get(client.config.guildMemberAdd.forceban).send(`${member} adlı üye banlı olduğu halde girmeye çalıştı ve tekrardan banlandı.`).catch(e => { })
  } else if(jail) {
    member.roles.add(client.config.Cezalı).catch(e => { })
    client.channels.cache.find(a => a.name === "guild-member-add-log").send(`${member} adlı üye Cezalıda iken sunucudan quit atıp girdi ve ona cezalı rolünü geri verdim.`).catch(e => { })

  } else if(guvenli) {
    member.roles.add(client.config.Süpheli).catch(e => { })
    client.channels.cache.find(a => a.name === "guild-member-add-log").send(`${member} adlı üye hesabı 7 gün önce açılmış olduğu için jaile atılmıştır.`).catch(e => { })
  } else if(reklam) {
    member.roles.add(client.config.Reklamcı).catch(e => { })
    client.channels.cache.find(a => a.name === "guild-member-add-log").send(`${member} adlı üye Reklamcıda iken sunucudan quit atıp girdi ve ona reklamcı rolünü geri verdim.`).catch(e => { })
  } else {
    member.setNickname("İsim | Yaş")
    member.roles.add(client.config.Unregister).catch(e => { })
  }

  let tag2 = client.config.Etiket
  let tag = client.config.Tag; //tagınız
  let rol = client.config.TaglıRole; //tag rol id
  if(member.user.username.includes(tag)){
    member.roles.add(rol)
    client.channels.cache.get(client.config.TagLog).send(`${member} adlı kullanıcı isminde \`${client.config.Tag}\` bulundurarak sunucumuza katıldı. Kullanıcı adı: \`${member.user.tag}\``)

  }
  if(member.user.discriminator.includes(tag2)){
    member.roles.add(rol)
    client.channels.cache.get(client.config.TagLog).send(`${member} adlı kullanıcı etiketinde \`${client.config.Etiket}\` bulundurarak sunucumuza katıldı. Kullanıcı adı: \`${member.user.tag}\``)

  }
  
  
 
};
exports.conf = {
  event: "guildMemberAdd" // Eventin ne olduğunu belirliyoruz.
};