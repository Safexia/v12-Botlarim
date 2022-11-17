const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const db = require("quick.db")

const sicil = new qdb.table("tmute");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format");
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
 

    let embed5 = new MessageEmbed().setColor("RANDOM");

    let arr = await  db.get(`muteyetkilirole_${message.guild.id}`) || []
    if (!message.member.permissions.has(8) || !message.member.roles.cache.some(e => arr.some(x => x == e)))
 return;		{
        let cmutebilgi = await db.get(`cmutebilgi_ravgar`);
        if (!cmutebilgi) return message.lineReply("Chat-Mute Bilgi Kanalı Kurulmamış. \`.islemsetup\`")
        let cpuanbilgi = await db.get(`cpuanbilgi_ravgar`);
        let mutedperm = await db.get(`muted_${message.guild.id}`);

    
    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply("Bir kullanıcı belirt ve tekrar dene.")
    if(user.id === message.author.id) return message.lineReply("Kendine ceza-i işlem uygulayamazsın.");  
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.lineReply("Belirttiğin kullanıcı seninle aynı veya üst bir rolde oldugu için işlem uygulayamadım")
    let time = args[1];
    if(!time || !ms(time)) return message.lineReply("Bir zaman belirt.")

    let reason = args.splice(2).join(" ");
    if(!reason) reason = "Sebep Belirtilmedi.";

       
    qdb.add(`muteAlma.${user.id}`, 1) //User kaç mute yemiş onu sayar
    qdb.add(`muteAtma.${message.member.id}`, 1) //Yetkili kaçtane mute atmış onu sayar

    qdb.add(`cpuan${user.id}`, 15) //Ceza puan sayma
    qdb.add(`Cezaİd_`, +1); //Ceza ID sayma

    let Cezaİd = qdb.fetch(`Cezaİd_`) + 1; //Ceza ID veri çekme 
    let cpuan = qdb.fetch(`cpuan${user.id}`) //Ceza puan veri çekme

    let aylar = {
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
        
    let tarih = moment(Date.now()).format('DD/MM/YYYY H:mm')
    let bitis =  moment(Date.now() + ms(time)).format('DD/MM/YYYY H:mm')
    let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(`Ceza Numarası: #${Cezaİd}`).setColor("RANDOM");
    let embed2 = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(`${tarih}`).setColor("RANDOM");

  /*  //Sicil kaıyt
    sicil.push(`sicil.${user.id}`, {
        Tip : "Chat Mute",
        Yetkili : message.author.id,
        reason : reason,
        tarih : tarih
    });
*/
    //Ceza ID veri kayıt
    qdb.set(`cezaBilgi_${Cezaİd}`, {
        sebep: reason,
        kod: Cezaİd,
        yetkili: message.author.id, 
        yetkili2: message.author.displayName,
        uyes: user.id,
        cpuan : "15",

        bsure: tarih,
        ssure: bitis,
        cezatip: "Chat Mute"
    });
    qdb.set(`user.${user.id}.sicil`, {
        sebep: reason,
        kod: Cezaİd,
        yetkili2: message.author.displayName,
        yetkili: message.author.id, 
        uyes: user.id,
        bsure: tarih,
        ssure: bitis,
        cpuan : "15",

        cezatip: "Chat Mute"
    });
    qdb.push(`info.${user.id}.ihlal`, {
        sebep: reason,
        kod: Cezaİd,
        yetkili: message.author.id, 
        yetkili2: message.author.displayName,
        uyes: user.id,
        bsure: tarih,
        ssure: bitis,
        cpuan : "15",

        cezatip: "Chat Mute  "
    });

    qdb.push(`info.${user.id}.kullanıcıchat`, {
        sebep: reason,
        kod: Cezaİd,
        yetkili: message.author.id, 
        uyes: user.id,
        yetkili2: message.author.displayName,
        bsure: tarih,
        cpuan : "15",

        ssure: bitis,
        cezatip: "Chat Mute "
      });
let chatmutelog = client.config.ChatmuteLog
      client.channels.cache.get(cmutebilgi).send(embed.setDescription(`
      ${user} (\`${user.id}\`) adlı kullanıcı Metin kanallarında susturuldu.
      • Chat Muteleyen Yetkili: ${message.author} (\`${message.author.id}\`)
      • Chat Mute Süresi: \`${time.replace(`s`, ` Saniye`).replace(`m`, ` Dakika`).replace(`h`, ` Saat`).replace(`d`, ` Gün`)}\`\n• Chat Mute Tarihi: \`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now()).format("YYYY HH:mm:ss")}\`
      • Chat Mute Bitiş Tarihi: \`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now() + ms(time)).format('YYYY HH:mm:ss')}\`
      • Chat Mute Sebebi: [\`${reason}\`]
      `)).catch(e => { })    
      client.channels.cache.get(cpuanbilgi).send(`${user} aldığınız **#${Cezaİd}** ID'li ceza ile **${cpuan}** ceza puanına ulaştınız..`).catch(e => { })

      
    await user.roles.add(mutedperm).catch(e => { })
    setTimeout(async () => {
        await user.roles.remove(mutedperm).catch(e => { })
    }, ms(time));
    message.channel.send(`${user} Üyesi **${reason}** sebebiyle ${message.author} tarafından **${time.replace(`s`, ` Saniye`).replace(`m`, ` Dakika`).replace(`h`, ` Saat`).replace(`d`, ` Gün`)}** boyunca metin kanallarında susturuldu! **Ceza Numarası:**(\`#${Cezaİd}\`)`)

   
}
client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.mute\` komutunu kullandı. [\`${message.content}\`]`);

};
exports.conf = {
  command: "mute", // Asıl komutumuz
  description: "Sohbet kanallarındaki mutesini başlatır", // Komut açıklamamız
  aliases: ["chatmute", "cmute", "chat-mute"] // Komutumuzun yardımcıları
}
