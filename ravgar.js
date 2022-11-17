const MessageEmbed = require("discord.js");  
require('discord-reply');
const { Constants } = require('discord.js');
const Discord = require("discord.js");  
const chalk = require("chalk");
Constants.DefaultOptions.ws.properties.$browser = `Discord Android`
const _client = new Discord.Client({ fetchAllMembers: true });  
const client = global.client = _client
global.client = client;
const fs = require("fs");
const db = require("quick.db")
const qdb = require("quick.db")
const moment = require("moment")
const kdb = new db.table("kullanici");
const settings = require("./configs/settings.json");
const { Database } = require("ark.db");
global.confdb = new Database("./configs/config.json");
const rankdb = global.rankdb = new Database("./configs/ranks.json");

require('discord-buttons')(client)

require("./handlers/mongoHandler");

client.commands = new Discord.Collection();  
client.aliases = new Discord.Collection();  
fs.readdirSync("./commands").filter(file => file.endsWith(".js")).forEach(file => {
    let command = require(`./commands/${file}`);  
    client.commands.set(command.conf.command, command);  
    console.log(chalk `{cyan COMMAND } {greenBright [${moment().format('YYYY-MM-DD HH:mm:ss')}]} {red ${file.replace(".js", "")} } {blueBright Komut'u Yüklendi.}`);  
    command.conf.aliases.forEach(aliases => {
    client.aliases.set(aliases, command)  
  })
});




fs.readdirSync("./events").filter(file => file.endsWith(".js")).forEach(file => {
    let event = require(`./events/${file}`);  
    client.on(event.conf.event, event.execute);  
    console.log(chalk `{magenta EVENT } {greenBright [${moment().format('YYYY-MM-DD HH:mm:ss')}]} {red ${file.replace(".js", "")} } {blueBright Event'i Yüklendi.}`);  
});



    
  var logs = require("discord-logs")
  logs(client)

client.on("guildMemberOffline", (member, oldStatus) => {
 db.set(`status_${member.id}`, Date.now())
});
client.on("guildMemberOnline", (member, newStatus) => {
db.delete(`status_${member.id}`, newStatus)
});


client.on("voiceStateUpdate",(oldMember, newMember) => {

  if(newMember.channelID != null) {
  db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
  }
  
  if(newMember.channelID == null) {
  db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
  }
  
   if (oldMember.channelID  != newMember.channelID  ) {
  db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
  db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
  }
  })



  client.on("message", message => {
    if(message.content.toLowerCase() == "tag") 
    return message.lineReply(`${client.config.SunucuTag}
    `)
});


    
var logs = require("discord-logs")
logs(client)

client.on("guildMemberOffline", (member, oldStatus) => {
 db.set(`status_${member.id}`, Date.now())
});
client.on("guildMemberOnline", (member, newStatus) => {
db.delete(`status_${member.id}`, newStatus)
});


client.on("voiceStateUpdate",(oldMember, newMember) => {

  if(newMember.channelID != null) {
  db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
  }
  
  if(newMember.channelID == null) {
  db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
  }
  
   if (oldMember.channelID  != newMember.channelID  ) {
  db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
  db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
  }
  })



client.on("message", message => {
    if(message.content.toLowerCase() == ".tag") 
    return message.lineReply(`${client.config.SunucuTag}
    `)
});







client.on("message", async  msg => {
  let embed2 = new Discord.MessageEmbed().setColor("RANDOM");

  var mayfe = await db.fetch(`reklam_${msg.guild.id}`)
     if (mayfe == 'acik') {
         const birisireklammidedi = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
         if (birisireklammidedi.some(word => msg.content.includes(word))) {
           try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                   msg.delete();
                     return msg.channel.send(embed2.setDescription(`${msg.member} Reklam yapmak yasak.`)).then(msg => msg.delete(3000));
     
 
   msg.delete(3000);                              
 
             }              
           } catch(err) {
             console.log(err);
           }
         }
     }
     else if (mayfe == 'kapali') {
       
     }
     if (!mayfe) return;
   })

   
client.on("messageUpdate", (oldMessage, newMessage) => {
  
  
  const i = db.fetch(`${oldMessage.guild.id}.kufur`)
     if (i) {
         const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq","amguard","seksüel","sekssüel"];
         if (kufur.some(word => newMessage.content.includes(word))) {
           try {
             if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                   oldMessage.delete();
                           
                       return oldMessage.channel.send(new Discord.MessageEmbed().setDescription(`${oldMessage.author} Bu sunucuda küfür filtresi etkin.`).setColor('0x800d0d').setAuthor(oldMessage.member.displayName, oldMessage.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
   
             }              
           } catch(err) {
             console.log(err);
           }
         }
     }
     if (!i) return;
 });
 

//---------------------------------------------------------------------------------------//

client.on("guildMemberRoleAdd", (member, role) => {
  let rolveren = member.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE' }).then(audit => audit.entries.first());
  var yıl = [moment().format('YYYY')]
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"};
if(rolveren === undefined) rolveren: "Bilinmeyen"
let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")
 member.guild.fetchAuditLogs({
  type: "MEMBER_ROLE_UPDATE"
}).then(async (audit) => {
let ayar = audit.entries.first()
let hedef = ayar.target
let yapan = ayar.executor
if (yapan.bot) return

const chatembed = new Discord.MessageEmbed().setFooter(`${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}`).setAuthor(member.user.tag, member.user.avatarURL({dynamic: true})).setColor("BLUE").setDescription(` 
${member} üyesine bir rol **eklendi.**

**Rolü ekleyen kişi:** ${yapan} (\`${yapan.id}\`)
**Eklenen rol:** ${role} (\`${role.id}\`)

\`.rollog ${hedef.id}\``)
qdb.push(`rollog.${member.id}.kullanıcı`, {
  alanveren: `${yapan}`,
  rolbilgi: `${role}`,
  tarih: `${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}`,
  kisi: `${hedef}`,
  almaverme: `Eklendi.`
});
client.channels.cache.find(a => a.name === "role-log").send(chatembed);
});
})


client.on("guildMemberRoleRemove", (member, role) => {
  let rolveren = member.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE' }).then(audit => audit.entries.first());
  var yıl = [moment().format('YYYY')]
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"};
if(rolveren === undefined) rolveren: "Bilinmeyen"
let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")
 member.guild.fetchAuditLogs({
  type: "MEMBER_ROLE_UPDATE"
}).then(async (audit) => {
let ayar = audit.entries.first()
let hedef = ayar.target
let yapan = ayar.executor
qdb.push(`rollog.${member.id}.kullanıcı`, {
  alanveren: `${yapan}`,
  rolbilgi: `${role}`,
  tarih: `${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}`,
  kisi: `${hedef}`,
  almaverme: `Alındı.`

});
const chatembed = new Discord.MessageEmbed().setFooter(`Alınma Tarihi: ${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}`).setAuthor(member.user.tag, member.user.avatarURL({dynamic: true})).setColor("BLUE").setDescription(` 
${member} üyesinden bir rol **alındı.**

**Rolü alan kişi:** ${yapan} (\`${yapan.id}\`)
**Alınan rol:** ${role} (\`${role.id}\`)

\`.rollog ${hedef.id}\``)
client.channels.cache.find(a => a.name === "role-log").send(chatembed);
});
})



client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
  var yıl = [moment().format('YYYY')]
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"};
    member.guild.fetchAuditLogs({
      type: "MEMBER_UPDATE"
    }).then(async (audit) => {
    let ayar = audit.entries.first()
    let hedef = ayar.target
    let yapan = ayar.executor
    
let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")
const ravgarEmbed = new Discord.MessageEmbed().setFooter(`${gün}/${aylar[moment(Date.now()).format("MM")]}/${yıl} ${saat}`).setColor("BLUE").setDescription(`
\`${hedef.tag}\` adlı kullanıcının sunucu içerisindeki kullanıcı adı değiştirildi.
**ESKİ** 
"\`${oldNickname || member.user.tag}\`"
**YENİ** 
"\`${newNickname || member.user.tag}\`"
\`\`\`
Kullanıcı: ${hedef.tag} (${hedef.id})
Değiştirme Tarihi: ${gün}/${aylar[moment(Date.now()).format("MM")]}/${yıl} ${saat}
Değiştiren: ${yapan.tag} (${yapan.id})\`\`\`
`);
client.channels.cache.find(a => a.name === "nickname-log").send(ravgarEmbed);
    })

});


client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
  var yıl = [moment().format('YYYY')]
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"};
    member.guild.fetchAuditLogs({
      type: "MEMBER_UPDATE"
    }).then(async (audit) => {
    let ayar = audit.entries.first()
    let hedef = ayar.target
    let yapan = ayar.executor
    
let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")

client.channels.cache.find(a => a.name === "nickname-log-2").send(`:file_folder: ${member.user.tag} - (\`${member.user.id}\`) [\`${oldNickname || "Bir kullanıcı adına Sahip değilmiş."}\` > \`${newNickname || "Kullanıcı adı sıfırlanmış."}\`]`);
    })
  })
client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {
  var yıl = [moment().format('YYYY')]
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"};
let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")
  var ravgarGönder = '832706210380775478'
  const ravgarEmbed = new Discord.MessageEmbed().setColor("BLUE").setDescription(`
${user} ( \`${user.tag}\` ) üyesi Discord kullanıcı adını değiştirdi.
Yeni kullanıcı adı:
"${newUsername || user.tag}"  
Eski kullanıcı adı:
${oldUsername || user.tag}
\`\`\`Kullanıcı: ${user.tag} (${user.id})
Değiştirme Tarihi: ${gün}/${aylar[moment(Date.now()).format("MM")]}/${yıl} ${saat}\`\`\`
`)
client.channels.cache.find(a => a.name === "username-log").send(ravgarEmbed);
});


client.on("userAvatarUpdate", (user, oldAvatarURL, newAvatarURL) => {
var yıl = [moment().format('YYYY')]
let aylartoplam = {
  "01": "Ocak",
  "02": "Şubat",
  "03": "Mart",
  "04": "Nisan",
  "05": "Mayıs",
  "06": "Haziran",
  "07": "Temmuz",
  "08": "Ağustos",
  "09": "Eylül",
  "10": "Ekim",
  "11": "Kasım",
  "12": "Aralık"};
let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")
const ravgarEmbed = new Discord.MessageEmbed().setTimestamp().setColor("BLUE").setTitle(`${user.tag}`).setThumbnail(`${newAvatarURL}`).setDescription(`
${user} üyesi Discord Profil resmini değiştirdi.
Eski:
[Görseli görmek için Tıkla](${oldAvatarURL})
Yeni:
[Görseli görmek için Tıkla](${newAvatarURL})
\`\`\` Kullanıcı: ${user.tag} ${user.id}
Kullanıcı: ${user.tag}\nKullanıcı Id: 
Resim Değişme: ${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}\`\`\``)
client.channels.cache.find(a => a.name === "avatar-log").send(ravgarEmbed);
});


 //--------------------------------------------------------------------------------------\\






var logs = require("discord-logs")
logs(client)


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


     const guildInvites = new Map();




client.on("message", async message => {
  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(".")) return;
  let args = message.content.split(' ').slice(1);
  let command = message.content.split(' ')[0].slice(".".length);

  if (command === "eval" && message.author.id === "773265176597626950") {
    if (!args[0]) return message.channel.send(`Kod belirtilmedi`);
    let code = args.join(' ');

    function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
    try { 
      var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace("token", "Aptal orospu cocugu ne yapmaya çalışıyorsun.").replace(client.token, "Aptal orospu cocugu ne yapmaya çalışıyorsun.");
      message.channel.send(`${evaled.replace(client.token, "Aptal orospu cocugu ne yapmaya çalışıyorsun.")} ${evaled.replace(client.token, "Aptal orospu cocugu ne yapmaya çalışıyorsun.")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) };
  };

})

client.on("userUpdate", async function(oldUser, newUser) {
  const guildID = "924278301701312513"//sunucu
  const roleID = "924333933326368770"//taglırolü
  const tag = "✰"//tag
  const chat = '896090905218531349'// chat
  const log2 = '896411238349803550' // log kanalı

  const guild = client.guilds.cache.get(guildID)
  const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
  const member = guild.members.cache.get(newUser.id)
  if (newUser.username !== oldUser.username) {
      if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          member.roles.remove(roleID)
          client.channels.cache.get("926894191802470431").send(`<@${newUser.id}> adlı kullanıcı \`✰\` olan tagımızı kullanıcı adınadan silerek aramızdan ayrıldı. Kullanıcı adı: \`${oldUser.tag}\` => \`${newUser.tag}\``)
      } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
          member.roles.add(roleID)
          client.channels.cache.get("926894191802470431").send(`<@${newUser.id}> adlı kullanıcı \`✰\` olan tagımızı kullanıcı adına ekleyerek aramıza katıldı. Kullanıcı adı: \`${oldUser.tag}\` => \`${newUser.tag}\``)
      }
  }
  

})


client.on("voiceStateUpdate", async (ravgar1, ravgar2) => {
  let teyzennabuyo = client.channels.cache.find(a => a.name === "ses-log"); 
  if (ravgar1.channelID && ravgar1.selfMute && !ravgar2.selfMute) return teyzennabuyo.send(`:speaker: ${ravgar2.guild.members.cache.get(ravgar2.id).displayName} adlı kullanıcı \`${ravgar2.guild.channels.cache.get(ravgar2.channelID).name}\` adlı kanalda kendi susturmasını kaldırdı.`).catch();
  if (ravgar1.channelID && !ravgar1.selfMute && ravgar2.selfMute) return teyzennabuyo.send(`:mute: ${ravgar2.guild.members.cache.get(ravgar2.id).displayName} adlı kullanıcı \`${ravgar2.guild.channels.cache.get(ravgar2.channelID).name}\` adlı kanalda kendisini susturdu. `).catch();
  if (ravgar1.channelID && ravgar1.selfDeaf && !ravgar2.selfDeaf) return teyzennabuyo.send(`<:ravgar_undeaf:834190542383874108> ${ravgar2.guild.members.cache.get(ravgar2.id).displayName} adlı kullanıcı \`${ravgar2.guild.channels.cache.get(ravgar2.channelID).name}\` adlı kanalda kulaklığını açtı. `).catch();
  if (ravgar1.channelID && !ravgar1.selfDeaf && ravgar2.selfDeaf) return teyzennabuyo.send(`<:ravgar_deaf:834190542191329291> ${ravgar2.guild.members.cache.get(ravgar2.id).displayName} adlı kullanıcı \`${ravgar2.guild.channels.cache.get(ravgar2.channelID).name}\` adlı kanalda kulaklığını kapadı. `).catch();
  if (ravgar1.channelID && !ravgar1.serverMute && ravgar2.serverMute) return teyzennabuyo.send(`:mute: ${ravgar2.guild.members.cache.get(ravgar2.id).displayName} adlı kullanıcı \`${ravgar2.guild.channels.cache.get(ravgar2.channelID).name}\` adlı kanaldayken sunucuda mute yedi. `).catch();
  if (ravgar1.channelID && ravgar1.serverMute && !ravgar2.serverMute) return teyzennabuyo.send(`:speaker: ${ravgar2.guild.members.cache.get(ravgar2.id).displayName} adlı kullanıcı \`${ravgar2.guild.channels.cache.get(ravgar2.channelID).name}\` adlı kanaldayken sunucudaki mutesi açıldı. `).catch();
  })
  client.on("voiceStateUpdate", async (ravgar1, ravgar2, ) => {
    let slmbneravgar = client.channels.cache.find(a => a.name === "ses-log"); 
    if (!ravgar1.channelID && ravgar2.channelID) return slmbneravgar.send(`:telephone: ${ravgar2.guild.members.cache.get(ravgar2.id).displayName} adlı kullanıcı \`${ravgar2.guild.channels.cache.get(ravgar2.channelID).name}\` isimli ses kanalına katıldı! - `).catch();
    if (ravgar1.channelID && !ravgar2.channelID) return slmbneravgar.send(`:telephone: ${ravgar2.guild.members.cache.get(ravgar2.id).displayName} adlı kullanıcı \`${ravgar2.guild.channels.cache.get(ravgar1.channelID).name}\` adlı ses kanalından ayrıldı! - `).catch();
    if (ravgar1.channelID && ravgar2.channelID && ravgar1.channelID != ravgar2.channelID) return slmbneravgar.send(`:telephone: ${ravgar2.guild.members.cache.get(ravgar2.id).displayName}\` adlı kullanıcı \`${ravgar2.guild.channels.cache.get(ravgar1.channelID).name}\` adlı ses kanalından çıkıp \`${ravgar2.guild.channels.cache.get(ravgar2.channelID).name}\` adlı ses kanalına girdi.`).catch();
  })


  


     //-----------------------------------------------------------------------------------------------------------------------------------\\
     const {Client, } = require('discord.js');



     const bot23 = new Discord.Client({ fetchAllMembers: true });  


const { botOwner, botPrefix, botToken, guildID, botVoiceChannelID, inviteChannelID, durum } = require('./ravgarab.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ravgar:ravgar@ravgar.xtauw.mongodb.net/ravgar?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});// Mongo connect linki


bot23.on("ready", async () => {
  bot23.user.setPresence({ activity: { name: `${client.config.SetPresence2}` }, status: "online" });
  let botVoiceChannel = bot23.channels.cache.get("897605592745644033");
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  bot23.guilds.cache.forEach(guild => {
    guild.fetchInvites().then(invites => guildInvites.set(guild.id, invites)).catch(err => console.log(err));
  });
});    
bot23.on("inviteCreate", async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
bot23.on("inviteDelete", invite => setTimeout(async () => { guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()); }, 5000));
bot23.on("guildMemberAdd", async member => {
  let cachedInvites = guildInvites.get(member.guild.id);
  let newInvites = await member.guild.fetchInvites();
  let usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses) || cachedInvites.find(inv => !newInvites.has(inv.code)) || {code: member.guild.vanityURLCode, uses: null, inviter: {id: null}};
  let inviter = bot23.users.cache.get(usedInvite.inviter.id) || {id: member.guild.id};
  let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7*24*60*60*1000;
  let inviteChannel = bot23.channels.cache.get("897605591650959408");
  Database.findOne({ guildID: member.guild.id, userID: member.id }, (err, joinedMember) => {
    if (!joinedMember) {
      let newJoinedMember = new Database({
          _id: new mongoose.Types.ObjectId(),
          guildID: member.guild.id,
          userID: member.id,
          inviterID: inviter.id,
          regular: 0,
          bonus: 0,
          fake: 0
      });
      newJoinedMember.save();
    } else {
      joinedMember.inviterID = inviter.id;
      joinedMember.save();
    };
  });
  if (isMemberFake) {
    Database.findOne({ guildID: member.guild.id, userID: inviter.id }, (err, inviterData) => {
      if (!inviterData) {
        let newInviter = new Database({
          _id: new mongoose.Types.ObjectId(),
          guildID: member.guild.id,
          userID: inviter.id,
          inviterID: null,
          regular: 0,
          bonus: 0,
          fake: 1
        });
        newInviter.save().then(x => {
          if (inviteChannel) inviteChannel.send(`${member} katıldı! **Davet eden**: ${inviter.id == member.guild.id ? member.guild.name : inviter.tag} (**${(x.regular ? x.regular : 0)+(x.bonus ? x.bonus : 0)}**)`).catch(err => {});
        });
      } else {
        inviterData.fake++
        inviterData.save().then(x => {
          if (inviteChannel) inviteChannel.send(`${member} katıldı! **Davet eden**: ${inviter.id == member.guild.id ? member.guild.name : inviter.tag} (**${(x.regular ? x.regular : 0)+(x.bonus ? x.bonus : 0)}**)`).catch(err => {});
        });
      };
    });
  } else {
    Database.findOne({ guildID: member.guild.id, userID: inviter.id }, (err, inviterData) => {
        if (!inviterData) {
          let newInviter = new Database({
            _id: new mongoose.Types.ObjectId(),
            guildID: member.guild.id,
            userID: inviter.id,
            inviterID: null,
            regular: 1,
            bonus: 0,
            fake: 0
          });
          newInviter.save().then(x => {
            if (inviteChannel) inviteChannel.send(`${member} katıldı! **Davet eden**: ${inviter.id == member.guild.id ? member.guild.name : inviter.tag} (**${(x.regular ? x.regular : 0)+(x.bonus ? x.bonus : 0)}**)`).catch(err => {});
          });
        } else {
          inviterData.regular++;
          inviterData.save().then(x => {
            if (inviteChannel) inviteChannel.send(`${member} katıldı! **Davet eden**: ${inviter.id == member.guild.id ? member.guild.name : inviter.tag} (**${(x.regular ? x.regular : 0)+(x.bonus ? x.bonus : 0)}**)`).catch(err => {});
          });
        };
      });


  };
  guildInvites.set(member.guild.id, newInvites);
});





client.on("message", async message => {
  if (!message.guild || message.channel.type === "dm") return;
  let db = require("quick.db")
  const prefix = client.config.prefix;

  if (!prefix) return;
  let ozelkomutlar = await db.get(`özelkomut_${message.guild.id}`);
  if (!ozelkomutlar) return;
  let yazilanKomut =  message.content.split(" ")[0];
  yazilanKomut = yazilanKomut.slice(prefix.length);
  var args = message.content.split(" ").slice(1);
  let komut = ozelkomutlar.find(x => x.isim.toLowerCase() === yazilanKomut);
  if (!komut) return;
  if (komut.tur === "rol") {
    let verilecekRol = message.guild.roles.cache.get(komut.verilecekRol);
    let yetki = message.guild.roles.cache.get(komut.yetkiliROL);
    if (!message.member.permissions.has("ADMINISTRATOR") && yetki && !message.guild.roles.cache.has(yetki.id))
      return message.lineReply(`Rol silinmiş olabilir.`);
    if (!verilecekRol) return message.lineReply(`Rol silinmiş olabilir.`);
    if (!message.member.permissions.has("ADMINISTRATOR") && yetki !== "0" && !message.member.roles.cache.has(yetki.id))
      return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(client.user.username, client.user.avatarURL()).setDescription(`Yetkin yeterli değil.`))
    let üye = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!üye)
      return message.lineReply(`Bir kullanıcı belirt ve tekrar dene.`)
    üye.roles.cache.get(verilecekRol.id) ? üye.roles.remove(verilecekRol.id).then(a => message.channel.send(new Discord.MessageEmbed().setColor("BLACK").setDescription(`${üye} üyesinden ${verilecekRol} rolü alındı!`))) :
      üye.roles.add(verilecekRol.id).then(a => message.channel.send(new Discord.MessageEmbed().setColor("BLACK").setDescription(`${üye} üyesine ${verilecekRol} rolü verildi!`)))
    return;
  }
});

     


const disbut = require('discord-buttons')

client.on('message', async (message) => {
  if(message.author.id !== "728161454288535604") return 
  if (message.content.startsWith('.ravgarrolal')) {
    message.delete()
    let button = new disbut.MessageButton()
    .setStyle('green')
    .setLabel('Etkinlik Katılımcısı')
    .setID('Etkinlik Katılımcısı')
    .setEmoji('🎊');

    let button2 = new disbut.MessageButton()
    .setStyle('red')
    .setLabel('Çekiliş Katılımcısı') 
    .setID('Çekiliş Katılımcısı') 
    .setEmoji('🎉');


    message.channel.send(`
    Merhaba **✰ Astana** üyeleri,\nÇekiliş katılımcısı alarak ${client.emojis.cache.find(x => x.name === "ravgar_netflix")},${client.emojis.cache.find(x => x.name === "ravgar_spotify")},${client.emojis.cache.find(x => x.name === "ravgar_blutv")},${client.emojis.cache.find(x => x.name === "ravgar_nitro")} gibi çeşitli ödüllerin sahibi olabilirsiniz.\nEtkinlik katılımcısı alarak çeşitli etkinliklerin yapıldığı anlarda herkesten önce haberdar olabilirsiniz ve çekilişlere önceden katılma hakkı kazanabilirsiniz.\n\n__Aşağıda ki butonlara basarak siz de bu ödülleri kazanmaya hemen başlayabilirsiniz!__
@everyone`
    ,{buttons:[button,button2]});
  }
}); 

client.on("clickButton", async (button) => {
if (button.id == 'Etkinlik Katılımcısı'){
  if (button.clicker.member.roles.cache.has("926894656447467530")){
    await button.clicker.member.roles.remove("926894656447467530")
    await button.reply.think(true);
    await button.reply.edit('Başarılı bir şekilde **Etkinlik Katılımcısı** rolü alındı.')
  } else {
    await button.clicker.member.roles.add("926894656447467530")
    await button.reply.think(true);
    await button.reply.edit('Başarılı bir şekilde **Etkinlik Katılımcısı** rolü verildi.')
  }
} else {
  if (button.id == 'Çekiliş Katılımcısı'){
    if (button.clicker.member.roles.cache.has("926894711459971094")){
      await button.clicker.member.roles.remove("926894711459971094")
      await button.reply.think(true);
      await button.reply.edit('Başarılı bir şekilde **Çekiliş Katılımcısı** rolü alındı.')
    } else {
      await button.clicker.member.roles.add("926894711459971094")
      await button.reply.think(true);
      await button.reply.edit('Başarılı bir şekilde **Çekiliş Katılımcısı** rolü verildi.')
    }
  } 
  
} 
})
client.on('message', async (message) => {
  if(message.author.id !== "728161454288535604") return 
  if (message.content.startsWith('.ilisti')) {
    message.delete()
    let button = new disbut.MessageButton()
    .setStyle('gray')
    .setLabel('Lovers')
    .setID('Lovers')

    let button3 = new disbut.MessageButton()
    .setStyle('gray')
    .setLabel('Alone') 
    .setID('Alone') 
 

    message.channel.send(`
    Merhaba **${client.config.SunucuAdı}** üyeleri,!
    Dilediğiniz Lovers, No Manitas, Alone , Lgbt rollerini aşağıdaki butonlara tıklayarak alabilir/bırakabilirsiniz.
@everyone`
    ,{buttons:[button, button3,]});
  }
}); 

client.on("clickButton", async (button) => {
if (button.id == 'Lovers'){
  if (button.clicker.member.roles.cache.has("924040706295742515")){
    await button.clicker.member.roles.remove("924040706295742515")
    await button.reply.think(true);
    await button.reply.edit('Başarılı bir şekilde **Lovers** rolü alındı.')
  } else {
    await button.clicker.member.roles.add("924040706295742515")
    await button.reply.think(true);
    await button.reply.edit('Başarılı bir şekilde **Lovers** rolü verildi.')
  }
} else {

    if (button.id == 'Alone'){
      if (button.clicker.member.roles.cache.has("924044983470784572")){
        await button.clicker.member.roles.remove("924044983470784572")
        await button.reply.think(true);
        await button.reply.edit('Başarılı bir şekilde **Alone** rolü alındı.')
      } else {
        await button.clicker.member.roles.add("924044983470784572")
        await button.reply.think(true);
        await button.reply.edit('Başarılı bir şekilde **Alone** rolü verildi.')
      }
    
    
    }
  }
  

})









client.on("messageDelete", async message => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  await db.set(`snipe.${message.guild.id}.${message.channel.id}`, { yazar: message.author.id, yazilmaTarihi: message.createdTimestamp, silinmeTarihi: Date.now(), dosya: message.attachments.first() ? true : false });
  if (message.content) db.set(`snipe.${message.guild.id}.${message.channel.id}.icerik`, message.content);
});

const client2 = new Discord.Client();

const önerilimit = new Map()

client2.on("ready", () => {
    client2.user.setPresence({ activity: { name: "💚 İstek Öner Şikayet DM" }, status: "online" });
})
client2.on("ready", () => {
    const ses = client2.channels.cache.get(client.config.BotVoice2);
    if (!ses) return
    ses.join();
})
setInterval(() => {
    const ses = client2.channels.cache.get(client.config.BotVoice2);
    if (!ses) return
    ses.join();
}, 1);

client2.on("message", async message => {
    if (message.author.id === client2.user.id || message.author.bot) return;
    if (message.guild) return;
    if (client.config.önerilimit > 0 && önerilimit.has(message.author.id) && önerilimit.get(message.author.id) == client.config.önerilimit) return message.channel.send("Zaten Öneri göndermişsin.");
    message.lineReply("Önerin Başarıyla İletildi Bir sonraki Öneriyi __**1 Saat**__ Sonra Yapabilirsin")
    client2.channels.cache.get(client.config.İstekÖneriLog).send(new Discord.MessageEmbed().setAuthor("Bir öneri geldi!", client2.user.avatarURL()).setFooter(client.config.SetFooter).setDescription(`${message.author} - ${message.author.id}\n${message.content}`).setTimestamp().setColor("RANDOM"))
    if (1 > 0) {
        if (!önerilimit.has(message.author.id)) önerilimit.set(message.author.id, 1);
        else önerilimit.set(message.author.id, önerilimit.get(message.author.id) + 1);
        setTimeout(() => {
            if (önerilimit.has(message.author.id)) önerilimit.delete(message.author.id);
        }, 1000 * 60 * 60)
    };
})


client.login(client.config.RavgarınEmaneti).then(c => console.log(chalk `{cyan Connected_Bot } Bot: {magenta ${client.user.tag} }`)).catch(err => console.error(`Bot giriş yapamadı!`));  
client2.login("OTI2ODkzNjQ5MzUzMTEzNHKKIpCnM4uXQ"); 
