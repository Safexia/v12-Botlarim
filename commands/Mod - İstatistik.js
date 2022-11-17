const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
require("moment-duration-format");
const moment = require("moment");
require("../ravgarcık.js");ravgarportsravgarecute = async (client, message, args) => {
    
    let embed2 = new MessageEmbed().setColor("RANDOM");

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

    if(client.config.SadeceTaglı) {
  

        if(!message.member.roles.cache.has(client.config.RegisterYetkili))
        if(!message.member.roles.cache.has(client.config.OwnerRole))
        if(!message.member.roles.cache.has(client.config.BotCommands))
        if(!message.member.roles.cache.has(client.config.AltYetki))
        if(!message.member.roles.cache.has(client.config.OrtaYetki))
        if(!message.member.roles.cache.has(client.config.ÜstYetki))
        if (!message.member.hasPermission("ADMINISTRATOR"))
        if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
      
    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanici);
    
    let data = qdb.fetch(`tagaldı.${uye.id}`) || `0`;
    let muteAlma = qdb.fetch(`muteAlma.${uye.id}`) || `0`;
    let muteAtma = qdb.fetch(`muteAtma.${uye.id}`) || `0`;

    let jailAlma = qdb.fetch(`jailAlma.${uye.id}`) || `0`;
    let jailAtma = qdb.fetch(`jailAtma.${uye.id}`) || `0`;

    let inv =  qdb.fetch(`inv.${uye.id}.total`) || 0;  
    let smuteAlma = qdb.fetch(`smuteAlma.${uye.id}`) || `0`;
    let smuteAtma = qdb.fetch(`smuteAtma.${uye.id}`) || `0`;

    let erkek = qdb.get(`erkekKayit_${uye.id}`) || `0`;
    let toplam = qdb.get(`toplamKayit_${uye.id}`) || `0`;
    let kız = qdb.get(`bayanKayit_${uye.id}`) || `0`;
    let datas = qdb.get(`aldı.${message.author.id}.tag`)
    if(datas < 1) "Tamamlanmamış."
    if(datas > 1) "Tamamlanmış."
  
    const embed = new MessageEmbed().setColor("RANDOM").setFooter(client.config.SetFooter).setDescription(`
    ➥ Kullanıcı Hakkında Bilgi ;
    **Kullanıcı >**  ${kullanici}
    **Kullanıcı ID >**  \`${kullanici.id}\`
    **Kuruluş Tarihi >** \`${moment(kullanici.createdAt).format('D/MMMM/YYYY')}\`
    **Sunucuya Giriş Tarihi >** \`${moment(kullanici.joinedAt).format('D/MMMM/YYYY')}
    ──────────────────────────────
    ➥ **Kullanıcının Yaptığı Ceza-i İşlemleri; 
    Voice Mute       : ${smuteAlma}
    Chat Mute        : ${muteAlma}
    Cezalı           : ${jailAlma}
    ──────────────────────────────
    ➥ **Kullanıcının Verdiği Ceza-i İşlemleri; 
    Voice Mute       : ${smuteAtma}
    Chat Mute        : ${muteAtma}
    Cezalı           : ${jailAtma}
    Cezalı(Kaldırma) : ${jailKladırma}
    ──────────────────────────────
    ➥ **Kullanıcının Teyit İşlemleri; 
    Toplam Teyit     : ${toplam}
    Erkek            : ${erkek}
    Kadın            : ${kız}
    Kayıtsız         : ${kayıtsız}
    ➥ **Kullanıcının Diğer İşlemleri; 
    İnvite Sayısı    : ${smuteAtma}
    Cezapuanı        : ${muteAtma}
    Taglı üye sayısı : **${datas || "Tamamlanmamış."}**
    `).setThumbnail(kullanici.avatarURL({dynamic: true, size: 2048}))
    message.channel.send(embed); 
} else {
  
    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanici);

    let data = qdb.fetch(`tagaldı.${uye.id}`) || `0`;
    let muteAlma = qdb.fetch(`muteAlma.${uye.id}`) || `0`;
    let muteAtma = qdb.fetch(`muteAtma.${uye.id}`) || `0`;
    let inv =  qdb.fetch(`inv.${uye.id}.total`) || 0;  
    let jailAlma = qdb.fetch(`jailAlma.${uye.id}`) || `0`;
    let jailAtma = qdb.fetch(`jailAtma.${uye.id}`) || `0`;
    let jailKladırma = qdb.fetch(`jailKaldırma.${uye.id}`) || `0`;


    let smuteAlma = qdb.fetch(`smuteAlma.${uye.id}`) || `0`;
    let smuteAtma = qdb.fetch(`smuteAtma.${uye.id}`) || `0`;
    let kayıtsız = qdb.fetch(`kayıtsızaatma.${uye.id}`) || `0`;
    let datas = qdb.get(`aldı.${message.author.id}.tag`)


  
   let erkek = qdb.get(`erkekKayit_${uye.id}`) || `0`;
   let toplam = qdb.get(`toplamKayit_${uye.id}`) || `0`;
   let kız = qdb.get(`bayanKayit_${uye.id}`) || `0`;


   const embed = new MessageEmbed().setColor("RANDOM").setFooter(client.config.SetFooter).setDescription(`
   ➥ Kullanıcı Hakkında Bilgi ;
   **Kullanıcı >**  ${kullanici}
   **Kullanıcı ID >**  \`${kullanici.id}\`
   **Kuruluş Tarihi >** \`${moment(kullanici.createdAt).format('D/MMMM/YYYY')}\`
   **Sunucuya Giriş Tarihi >** \`${moment(kullanici.joinedAt).format('D/MMMM/YYYY')}
   ──────────────────────────────
   ➥ **Kullanıcının Yaptığı Ceza-i İşlemleri; **
   Voice Mute       : **${smuteAlma}**
   Chat Mute        : **${muteAlma}**
   Cezalı           : **${jailAlma}**
   ──────────────────────────────
   ➥ **Kullanıcının Verdiği Ceza-i İşlemleri; **
   Voice Mute       : **${smuteAtma}**
   Chat Mute        : **${muteAtma}**
   Cezalı           : **${jailAtma}**
   Cezalı(Kaldırma) : **${jailKladırma}**
   ──────────────────────────────
   ➥ **Kullanıcının Teyit İşlemleri; **
   Toplam Teyit     : **${toplam}**
   Erkek            : **${erkek}**
   Kadın            : **${kız}**
   Kayıtsız         : **${kayıtsız}**
   ➥ **Kullanıcının Diğer İşlemleri; **
   İnvite Sayısı    : **${smuteAtma}**
   Cezapuanı        : **${muteAtma}**
   Taglı üye sayısı : **${datas || "Tamamlanmamış."}**

   `).setThumbnail(kullanici.avatarURL({dynamic: true, size: 2048}))
   message.channel.send(embed); 
}

};ravgarports.conf = {
    command: "me",
    aliases: ["gbt", "istatistik","statme"],
    description: "Belirtilen üyenin tüm bilgilerini gösterir."
};
