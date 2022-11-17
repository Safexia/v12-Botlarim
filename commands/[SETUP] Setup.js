const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
require("moment-duration-format");
const db = require("quick.db");

const moment = require("moment");
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  if(message.author.id !== "728161454288535604")
  if(message.author.id !== "569158273601896461") return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

    let embed2 = new MessageEmbed().setColor("RANDOM");

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));
    
    let reklamrol = await db.get(`reklamcı_${message.guild.id}`) || []

    let baslangıcyt = await db.get(`baslangıcyt_${message.guild.id}`) || []
    let ikinciyt = await db.get(`2inciyt_${message.guild.id}`) || []
    let ücüncüyt = await db.get(`3üncücyt_${message.guild.id}`) || []    
    let vmuteytrol = await db.get(`vmuteyetkilirole_${message.guild.id}`) || []
    let muteytrol = await db.get(`muteyetkilirole_${message.guild.id}`) || []
    let jailytrol = await db.get(`jailyetkilirole_${message.guild.id}`) || []
    let banytrol = await db.get(`banyetkilirole_${message.guild.id}`) || []
    let unregisterrole = await db.get(`unregisterrole_${message.guild.id}`) || []
    let şüphelirol = await db.get(`şüphelirole_${message.guild.id}`) || []
    let registeryrol = await db.get(`registeryrole_${message.guild.id}`) || []
    let cezalırol = await db.get(`cezalırole_${message.guild.id}`) || []
    let kadınrole = await db.get(`kadınrole_${message.guild.id}`) || []
    let reklamyt = await db.get(`reklamcıyt_${message.guild.id}`) || []

    let botkomutrol = await db.get(`botkomutrole_${message.guild.id}`) || []
    let taglırol = await db.get(`teamrole_${message.guild.id}`) || []
    let enaltyt = await db.get(`enaltytrole_${message.guild.id}`) || []

    let cekiliskatılım = await db.get(`cekiliskatılım_ravgar_${message.guild.id}`) || []
    let etkinlikkatılım = await db.get(`etkinlikkatılım_ravgar_${message.guild.id}`) || []

    let vip = await db.get(`viptrole_${message.guild.id}`) || []
    let vip2 = await db.get(`+viptrole_${message.guild.id}`) || []
    let streamerr = await db.get(`streamertrole_${message.guild.id}`) || []
    let vmuted = await db.get(`vmuted_${message.guild.id}`) || []
    let muted = await db.get(`muted_${message.guild.id}`) || []
    let vkcezalı = await db.get(`vkcezalı_${message.guild.id}`) || []
    let dccezalı = await db.get(`dccezalı_${message.guild.id}`) || []

    

    let erkekrole = await db.get(`erkekrole_${message.guild.id}`) || []

    const acik = "Aktif"
    const kapali = "Deaktif"
  
  
    const embed = new MessageEmbed().setColor("RANDOM").setDescription(`
 
    \`\`\`FİRST\`\`\`
    ${await db.has(`enaltytrole_${message.guild.id}`) ? `[**${acik}**] **En Alt Yetki**: (${enaltyt.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup enaltyt @rol\``}
    ${await db.has(`botkomutrole_${message.guild.id}`) ? `[**${acik}**] **Bot Komut**: (${botkomutrol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup botkomut @rol\``}

    \`\`\`SERVER\`\`\`
    ${await db.has(`tag1_ravgar_${message.guild.id}`) ? `[**${acik}**] **TAG 1.** (\`${await db.get(`tag1_ravgar_${message.guild.id}`)}\`)` : `[**${kapali}**] \`.serversetup tag1 <TAG>\`[**SERVER 1. TAG**]`}
    ${await db.has(`tag2_ravgar_${message.guild.id}`) ? `[**${acik}**] **TAG 2.** (\`${await db.get(`tag2_ravgar_${message.guild.id}`)}\`)` : `[**${kapali}**] \`.serversetup tag2 <TAG>\`[**SERVER 2. TAG**]`}
    ${await db.has(`teamrole_${message.guild.id}`) ? `[**${acik}**] **Taglı Rolü**: (${taglırol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup taglırole @rol\``}

    \`\`\`SUNUCU ROL\`\`\`
    ${await db.has(`vmuteyetkilirole_${message.guild.id}`) ? `[**${acik}**] **VoiceMute Yetkili**: (${vmuteytrol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup vmuteyetkili @rol @rol2 @rol3\``}
    ${await db.has(`muteyetkilirole_${message.guild.id}`) ? `[**${acik}**] **ChatMute Yetkili**: (${muteytrol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup muteyetkili @rol @rol2 @rol3\``}
    ${await db.has(`jailyetkilirole_${message.guild.id}`) ? `[**${acik}**] **Jail Yetkili**: (${jailytrol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup reklamyetkili @rol @rol2 @rol3\``}
    ${await db.has(`reklamcıyt_${message.guild.id}`) ? `[**${acik}**] **Jail Yetkili**: (${reklamyt.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup jailyetkili @rol @rol2 @rol3\``}
    ${await db.has(`banyetkilirole_${message.guild.id}`) ? `[**${acik}**] **Ban Yetkili**: (${banytrol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup banyetkili @rol @rol2 @rol3\``}
    ${await db.has(`cezalırole_${message.guild.id}`) ? `[**${acik}**] **Cezalı Rolü**: (${cezalırol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup cezalı @rol\``}
    ${await db.has(`reklamcı_${message.guild.id}`) ? `[**${acik}**] **Reklamcı Rolü**: (${reklamrol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup reklamcı @rol\``}
    
    \`\`\`REGİSTER\`\`\`
    ${await db.has(`registeryrole_${message.guild.id}`) ? `[**${acik}**] **Kayıt Yetkili**: (${registeryrol.map(c => `<@&${c}>`)})` : `[**${kapali}**]  \`.rolesetup kayıtyetkili @rol @rol2 @rol3\``}
    ${await db.has(`unregisterrole_${message.guild.id}`) ? `[**${acik}**] **Kayıtsız Rolü**: (${unregisterrole.map(c => `<@&${c}>`)})` : `[**${kapali}**]  \`.rolesetup kayıtsız @rol @rol2\``}
    ${await db.has(`şüphelirole_${message.guild.id}`) ? `[**${acik}**] **Şüpheli Rolü**: (${şüphelirol.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup şüpheli @rol\``}
    ${await db.has(`erkekrole_${message.guild.id}`) ? `[**${acik}**] **Erkek Rolü**: (${erkekrole.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup erkekrole @rol @rol2 @rol3\``}
    ${await db.has(`kadınrole_${message.guild.id}`) ? `[**${acik}**] **Kadın Rolü**: (${kadınrole.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup kadınrole @rol @rol2 @rol3\``}
    
    \`\`\`KANAL\`\`\`
    ${await db.has(`registerchat_ravgar`) ? `[**${acik}**] **Register Chat** (<#${await db.get(`registerchat_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup kayıtkanal #kanal\`[**Register-Chat**]`}
    ${await db.has(`vmutebilgi_ravgar`) ? `[**${acik}**] **VoiceMute Bilgi** (<#${await db.get(`vmutebilgi_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup vmutebilgi #kanal\`[**Vmute-Bilgi**]`}
    ${await db.has(`cmutebilgi_ravgar`) ? `[**${acik}**] **ChatMute Bilgi** (<#${await db.get(`cmutebilgi_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup cmutebilg #kanal\`[**CMute-Bilgi**]`}
    ${await db.has(`jailbilgi_ravgar`) ? `[**${acik}**] **Jail Bilgi** (<#${await db.get(`jailbilgi_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup jailbilgi #kanal\`[**Jail-Bilgi**]`}
    ${await db.has(`reklambilgi_ravgar`) ? `[**${acik}**] **Reklam Bilgi** (<#${await db.get(`reklambilgi_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup reklambilgi #kanal\`[**Reklam-Bilgi**]`}
    ${await db.has(`banbilgi_ravgar`) ? `[**${acik}**] **Ban Bilgi** (<#${await db.get(`banbilgi_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup banbilgi #kanal\`[**Ban-Bilgi**]`}
    ${await db.has(`cpuanbilgi_ravgar`) ? `[**${acik}**] **Cezapuan Chat** (<#${await db.get(`cpuanbilgi_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup cezapuanbilgi #kanal\`[**Cezapuan-Bilgi**]`}
    ${await db.has(`kurallar_ravgar`) ? `[**${acik}**] **Kurallar Kanalı** (<#${await db.get(`kurallar_ravgar`)}>)` : `[**${kapali}**] \`.kanalsetup kurallar #kanal\`[**Cezapuan-Bilgi**]`}

    \`\`\`Yetki Sistemi\`\`\`
    ${await db.has(`baslangıcyt_${message.guild.id}`) ? `[**${acik}**] **Başlangıç Yetkisi**: (${baslangıcyt.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup baslangıcyt @rol @rol2 @rol3\``}
    ${await db.has(`2inciyt_${message.guild.id}`) ? `[**${acik}**] **2. Yetki**: (${ikinciyt.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup 2yetki @rol @rol2 @rol3\``}
    ${await db.has(`3üncücyt_${message.guild.id}`) ? `[**${acik}**] **3. Yetki**: (${ücüncüyt.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup 3yetki @rol @rol2 @rol3\``}
    
    \`\`\`ROLLER 2\`\`\`
    ${await db.has(`viptrole_${message.guild.id}`) ? `[**${acik}**] **Vip**: (${vip.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup vip @rol\``}
    ${await db.has(`+viptrole_${message.guild.id}`) ? `[**${acik}**] **+Vip**: (${vip2.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup +vip @rol\``}
    ${await db.has(`streamertrole_${message.guild.id}`) ? `[**${acik}**] **Streamer**: (${streamerr.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup streamer @rol\``}
    ${await db.has(`vmuted_${message.guild.id}`) ? `[**${acik}**] **Vmuted**: (${vmuted.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup vmuted @rol\``}
    ${await db.has(`muted_${message.guild.id}`) ? `[**${acik}**] **Muted**: (${muted.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup muted @rol\``}
    ${await db.has(`vkcezalı_${message.guild.id}`) ? `[**${acik}**] **Vk Cezalı**: (${vkcezalı.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup vkcezalı @rol\``}
    ${await db.has(`dccezalı_${message.guild.id}`) ? `[**${acik}**] **DC Cezalı**: (${dccezalı.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup dccezalı @rol\``}
    
    \`\`\`ROLLER BOT\`\`\`
    ${await db.has(`etkinlikkatılım_ravgar_${message.guild.id}`) ? `[**${acik}**] **Etkinlik Katılımcısı**: (${etkinlikkatılım.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup etkinlikkatılımcısı @rol\``}
    ${await db.has(`cekiliskatılım_ravgar_${message.guild.id}`) ? `[**${acik}**] **Çekiliş Katılımcısı**: (${cekiliskatılım.map(c => `<@&${c}>`)})` : `[**${kapali}**] \`.rolesetup cekiliskatılımcısı @rol\``}
    `)
    message.lineReply(embed); 


    }


exports.conf = {
    command: "ravgarsetup",
    aliases: [],
    description: "Belirtilen üyenin tüm bilgilerini gösterir."
}
