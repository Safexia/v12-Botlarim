const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
require("moment-duration-format");
const db = require("quick.db");

const moment = require("moment");
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  if(message.author.id !== "728161454288535604")
  return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

    let embed2 = new MessageEmbed().setColor("RANDOM");

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));

  
    let vmuteytrol = await db.get(`vmuteyetkilirole_${message.guild.id}`) || []
    let muteytrol = await db.get(`muteyetkilirole_${message.guild.id}`) || []
    let jailytrol = await db.get(`jailyetkilirole_${message.guild.id}`) || []
    let banytrol = await db.get(`banyetkilirole_${message.guild.id}`) || []
    let unregisterrole = await db.get(`unregisterrole_${message.guild.id}`) || []
    let şüphelirol = await db.get(`şüphelirole_${message.guild.id}`) || []
    let registeryrol = await db.get(`registeryrole_${message.guild.id}`) || []
    let cezalırol = await db.get(`cezalırole_${message.guild.id}`) || []
    let botkomutrol = await db.get(`botkomutrole_${message.guild.id}`) || []
    let taglırol = await db.get(`teamrole_${message.guild.id}`) || []


    let erkekrole = await db.get(`erkekrole_${message.guild.id}`) || []

    const acik = "Aktif"
    const kapali = "Deaktif"
  
  
    const embed = new MessageEmbed().setColor("RANDOM").setDescription(`
 

    ${await db.has(`botkomutrole_${message.guild.id}`) ? `[**${acik}**] **Bot Komut**: (${botkomutrol.map(c => `<@&${c}>`)})` : `[**${kapali}**] **Bot Komut**: Bot Komut Permi Ayarlanmamış`}


  
    \`\`\`ROL KURULUM\`\`\`
    ${await db.has(`vmuteyetkilirole_${message.guild.id}`) ? `[**${acik}**] **VoiceMute Yetkili**: (${vmuteytrol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup vmuteyetkili @rol @rol2 @rol3\``}
    ${await db.has(`muteyetkilirole_${message.guild.id}`) ? `[**${acik}**] **ChatMute Yetkili**: (${muteytrol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup muteyetkili @rol @rol2 @rol3\``}
    ${await db.has(`jailyetkilirole_${message.guild.id}`) ? `[**${acik}**] **Jail Yetkili**: (${jailytrol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup jailyetkili @rol @rol2 @rol3\``}
    ${await db.has(`banyetkilirole_${message.guild.id}`) ? `[**${acik}**] **Ban Yetkili**: (${banytrol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup banyetkili @rol @rol2 @rol3\``}
    ${await db.has(`cezalırole_${message.guild.id}`) ? `[**${acik}**] **Cezalı Rolü**: (${cezalırol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup cezalı @rol\``}
    ${await db.has(`teamrole_${message.guild.id}`) ? `[**${acik}**] **Taglı Rolü**: (${taglırol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup taglırole @rol\``}

    \`\`\`REGİSTER KURULUM\`\`\`
    ${await db.has(`registeryrole_${message.guild.id}`) ? `[**${acik}**] **Kayıt Yetkili**: (${registeryrol.map(c => `<@&${c}>`)})` : `[**${kapali}**]  \`.rolesetup kayıtyetkili @rol @rol2 @rol3\``}
    ${await db.has(`unregisterrole_${message.guild.id}`) ? `[**${acik}**] **Kayıtsız Rolü**: (${unregisterrole.map(c => `<@&${c}>`)})` : `[**${kapali}**]  \`.rolesetup kayıtsız @rol @rol2\``}
    ${await db.has(`şüphelirole_${message.guild.id}`) ? `[**${acik}**] **Şüpheli Rolü**: (${şüphelirol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup şüpheli @rol\``}
    ${await db.has(`erkekrole_${message.guild.id}`) ? `[**${acik}**] **Erkek Rolü**: (${erkekrole.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup erkekrole @rol @rol2 @rol3\``}

    \`\`\`KANAL KURULUM\`\`\`
    ${await db.has(`registerchat_ravgar`) ? `[**${acik}**] **Register Chat** (<#${await db.get(`registerchat_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup kayıtkanal #kanal\`[**Register-Chat**]`}
    ${await db.has(`vmutebilgi_ravgar`) ? `[**${acik}**] **VoiceMute Bilgi** (<#${await db.get(`vmutebilgi_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup vmutebilgi #kanal\`[**Vmute-Bilgi**]`}
    ${await db.has(`cmutebilgi_ravgar`) ? `[**${acik}**] **ChatMute Bilgi** (<#${await db.get(`cmutebilgi_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup cmutebilg #kanal\`[**CMute-Bilgi**]`}
    ${await db.has(`jailbilgi_ravgar`) ? `[**${acik}**] **Jail Bilgi** (<#${await db.get(`genelchat_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup jailbilgi #kanal\`[**Jail-Bilgi**]`}
    ${await db.has(`banbilgi_ravgar`) ? `[**${acik}**] **Ban Bilgi** (<#${await db.get(`genelchat_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup banbilgi #kanal\`[**Ban-Bilgi**]`}
    ${await db.has(`cpuanbilgi_ravgar`) ? `[**${acik}**] **Cezapuan Chat** (<#${await db.get(`genelchat_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup cezapuanbilgi #kanal\`[**Cezapuan-Bilgi**]`}


    `)
    message.channel.send(embed); 
    }


exports.conf = {
    command: "kurulumyardım",
    aliases: [],
    description: "Belirtilen üyenin tüm bilgilerini gösterir."
}
