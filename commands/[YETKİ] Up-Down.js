const moment = require("moment");
const config = require("../anan.json");
const { MessageEmbed } = require("discord.js");
const Database = require('../models/inviter.js');
const messageUserChannel = require("../schemas/messageUserChannel");
const conf = require("../configs/config.json");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");    
const { MessageButton } = require('discord-buttons');
const voiceUserChannel = require("../schemas/voiceUserChannel");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const voiceUserParent = require("../schemas/voiceUserParent");

const qdb = require("quick.db");
const kdb = new qdb.table("Kayıt");

require("moment-duration-format");

exports.execute = async (client, message, args) => {
  
  let embed2 = new MessageEmbed().setColor("RANDOM");


  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!member) return message.channel.send(embed2.setDescription("Bir kullanıcı belirtmelisin!"));
  if (!member.roles.cache.has("931268471252189257")) 
  if (!member.roles.cache.has("932700504683872286"))return message.lineReply("Belirttiğin kullanıcı yetkili olmadığı için Yetkili Yükseltme/Düşürme araçlarını yükleyemedim. [Kullanıcıya yetki vermek için .ytver @User/UserID]") 

  const category = async (parentsArray) => {
    const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
    const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
    let voiceStat = 0;
    for (var i = 0; i <= voiceUserParentData.length; i++) {
      voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
    }
    return moment.duration(voiceStat).format("H [saat], m [dakika]");
  };
  
  const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
  const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
  const voiceLength = Active2 ? Active2.length : 0;
  let voiceTop;
  let messageTop;
  Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `${x.channelID}: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."
  Active2.length > 0 ? voiceTop = Active2.splice(0, 5).map(x => `${x.channelID}: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : voiceTop = "Veri bulunmuyor."
  
  const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
  const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });

  const messageDaily = messageData ? messageData.dailyStat : 0;
  const messageWeekly = messageData ? messageData.weeklyStat : 0;

  const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
  const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");


  const filteredParents = message.guild.channels.cache.filter((x) =>
    x.type === "category" &&
    !conf.publicParents.includes(x.id) &&
    !conf.registerParents.includes(x.id) &&
    !conf.solvingParents.includes(x.id) &&
    !conf.privateParents.includes(x.id) &&
    !conf.aloneParents.includes(x.id) &&
    !conf.funParents.includes(x.id)
  );
 
  let cpuan = qdb.fetch(`cpuan${member.id}`) || `0`;

  let taglı = qdb.get(`aldı.${member.id}.tag`) || `0`;
  let uyeDurum;
    if (cpuan.length < 5) uyeDurum = 'Çok güvenli!';
    if (cpuan.length > 10 && cpuan.length < 50) uyeDurum = 'Güvenli!';
    if (cpuan.length > 51 && cpuan.length < 99) uyeDurum = 'Dikkat Çekiyor.!';
    if (cpuan.length > 100 && cpuan.length < 139) uyeDurum = 'Şüpheli!';
    if (cpuan.length > 140 && cpuan.length < 149) uyeDurum = 'Tehlikeli!';
    if (cpuan.length > 150) uyeDurum = 'Çok Tehkileli!';
  let mkp = qdb.get(`marketpuan${member.id}`) || `0`;
  let erkek = qdb.get(`erkekKayit_${member.id}`) || `0`;
  let toplamkayit = qdb.get(`toplamKayit_${member.id}`);
  let kız = qdb.get(`bayanKayit_${member.id}`) || `0`;
  let yetkilipermleri = [
    "931268471252189257",
    "931268470455279736",
    "931268469347995709",
    "931268468467187782",
    "931268467267608607",
    "931268466298728489",
    "931268465422106686",
    "931268464721690664",
    "931268463840854016",
    "931268462922326106",
    "931268461936660581", 
    "931268460779012097", 
    "931268459977900093",
    "931268457905942549",
  "931268457373265920",
  "931268456349827144",
  "931268455347421264",
  "931268453543866391", 
  "931268452801450034",
  "931268451610275881",
  "931268451190865940", 
  "931268449987067986",
""]


let komutpermleri = [
  "931268497378541568", 
  "921489801251786802", 
  "", 
  ""]
  let skillpermleri = [
    "931268441913065582", 
    "931268440935772190", 
    "931268439807524884", 
    "931268437362221176",
  "931268434153578618",
"931268433025314898",
"931268432463269908"]

 
  const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.id });
  const total = inviterData ? inviterData.total : 0;
  const regular = inviterData ? inviterData.regular : 0;
  const bonus = inviterData ? inviterData.bonus : 0;
  const leave = inviterData ? inviterData.leave : 0;
  const fake = inviterData ? inviterData.fake : 0;
  const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.id });
  const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
  const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;

const görev = message.member.roles.cache.has("916343926456209418") ?
`\`\`\`
Cezapuan: ${cpuan || "0"} Puan (${uyeDurum})
Taglı Üye: ${taglı}
Davet: Toplam: ${total} (Regular ${regular}) Haftalık: ${weekly}
Kayıt: (Toplam ${toplamkayit || "0"}) (Erkek,${erkek} - Kadın,${kız})
Kayıt Market Puanı: ${mkp} puan. (.kayıtmarket)\`\`\`` : "";



var button_1 = new MessageButton()
.setID("1")
.setLabel("Yetki Yükselt")
.setStyle("green")
.setEmoji("⬆️")

var button_2 = new MessageButton()
.setID("2")
.setLabel("İptal")
.setStyle("gray")
.setEmoji("❌")

var button_3 = new MessageButton()
.setID("3")
.setLabel("Yetkileri Düşür")
.setStyle("red")
.setEmoji("⬇️")
let ravgarfilter = yetkilipermleri.filter(a => message.member.roles.cache.has(a))

let ravgarfilter2 = komutpermleri.filter(a => message.member.roles.cache.has(a))

let embedravgar = new MessageEmbed().setFooter(client.config.SetFooter).setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
.setDescription(`
Kullanıcının Yetkisi: ${ravgarfilter.length ? ravgarfilter.map(x => `<@&${x}>`): "Bulunamadı."},${ravgarfilter2.length ? ravgarfilter2.map(x => `<@&${x}>`): "Bulunamadı."}
${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}.\`
${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Public Kategori: \`${await category(conf.publicParents)}.\`
${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Register Kategori: \`${await category(conf.registerParents)}.\`
${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Private Kategori: \`${await category(conf.privateParents)}.\`
${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Alone Kategori: \`${await category(conf.aloneParents)}.\`
${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Diğer: \`${await category(filteredParents.map(x => x.id))}.\`
─────────────────────
    `)
    embedravgar.addField(`${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Ses Kanal Sıralaması: - (\`Toplam ${voiceLength} kanal\`) `,`
    ${voiceTop}
    ─────────────────────`)

    embedravgar.addField(`${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Mesaj Bilgileri: - (\`Toplam ${messageData ? messageData.topStat : 0} mesaj\`)`,`
    ${messageTop}
    ─────────────────────`)
    embedravgar.addField("**Toplam Ses**", `
    \`\`\`js
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`\`\`
    `, true);
    embedravgar.addField("**Haftalık Ses**", `
    \`\`\`js
${voiceWeekly}\`\`\`
    `, true);
    embedravgar.addField("**Günlük Ses**", `
    \`\`\`js
${voiceDaily}\`\`\`
    `, true);
    embedravgar.addField("**Toplam Mesaj**", `
    \`\`\`js
${messageData ? messageData.topStat : 0} mesaj\`\`\`
    `, true);    embedravgar.addField("**Haftalık Mesaj**", `
    \`\`\`js
${messageWeekly} mesaj\`\`\`
    `, true);    embedravgar.addField("**Günlük Mesaj**", `
    \`\`\`js
${messageDaily} mesaj\`\`\`
    `, true);
    embedravgar.addField(`Diğer Bilgiler:`,
    `\`\`\`
Cezapuan: ${cpuan || "0"} Puan (${uyeDurum})
Taglı Üye: ${taglı}
Davet: Toplam: ${total} (Regular ${regular}) Haftalık: ${weekly}
Kayıt: (Toplam ${toplamkayit || "0"}) (Erkek,${erkek} - Kadın,${kız})
Kayıt Market Puanı: ${mkp} puan. (.kayıtmarket)\`\`\``)


    let msg = await message.channel.send({ buttons : [ button_1, button_2, button_3], embed: embedravgar})
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter)

      collector.on("collect", async (button) => {



        if(button.id === "1") {
          msg.delete()
          await button.reply.defer()
          let yetkiNumber;
          let sahipOlunanRol = Number();
          for (yetkiNumber = 0; yetkiNumber < config.Yetkiler.length ; yetkiNumber++) {
            if(member.roles.cache.has(config.Yetkiler[yetkiNumber])) {
              sahipOlunanRol += yetkiNumber
            };
          }  
       if(!member.roles.cache.has(config.Yetkiler[config.Yetkiler.length-1])){
          await member.roles.add(config.Yetkiler[sahipOlunanRol+1]).catch(e => { })
          await member.roles.remove(config.Yetkiler[sahipOlunanRol]).catch(e => { })
          await message.channel.send(embed2.setDescription(`${member} Kullanısı <@&${config.Yetkiler[sahipOlunanRol+1]}> Yetkisine Başarılı bir Şekilde Yükseltildi.`)).catch(e => { })
        } else { message.channel.send(embed2.setDescription(`:x: Belirtilen Kullanıcı Zaten Max Role Sahip.`)).catch(e => { }) }
      }
          

        
        

        if(button.id === "2") {
          await button.reply.defer()
          message.channel.send(embed2.setDescription(`İşlem iptal edildi.`))
 
        
        }

        if(button.id === "3") {
          msg.delete()
          let yetkiNumber;
          let sahipOlunanRol = Number();
          for (yetkiNumber = 0; yetkiNumber < config.Yetkiler.length ; yetkiNumber++) {
            if(member.roles.cache.has(config.Yetkiler[yetkiNumber])) {
              sahipOlunanRol += yetkiNumber
            };
          }  
          if(!member.roles.cache.has(config.Yetkiler[0])){
          await member.roles.add(config.Yetkiler[sahipOlunanRol-1]).catch(e => { })
          await member.roles.remove(config.Yetkiler[sahipOlunanRol]).catch(e => { })
          await message.channel.send(embed2.setDescription(`${member} Kullanısı <@&${config.Yetkiler[sahipOlunanRol-1]}> Yetkisine Başarılı bir Şekilde Düşürüldü.`)).catch(e => { })
        } else {
          message.channel.send(embed2.setDescription(`${member} adlı kullanıcısı zaten suanda başlangıç yetkisinde yetkisini almak için tepkiye tıkla.
          ${member} adlı kullanıcının Yetkisi: ${ravgarfilter.length ? ravgarfilter.map(x => `<@&${x}>`): "Bulunamadı."},${ravgarfilter2.length ? ravgarfilter2.map(x => `<@&${x}>`): "Bulunamadı."}`)).then(async msj => {
          await msj.react('✅');
         const kabul = (reaction, member) => {
          return ['✅'].includes(reaction.emoji.name) && member.id === message.author.id;
        };
      msj.awaitReactions(kabul, {max: 1, time: 50000, error: ['time']}).then(async c => {
        let cevap = c.first();
        if (cevap) {
          message.lineReply("Yetkilinin [Yetki-Rolleri] (\`Tiresias of Starling\` , \`Starling Bot Command\`) rolleri başarılı bir şekilde alındı.")
         await msj.delete().catch(e => { });
         member.roles.remove("931268471252189257")
          await button.reply.defer()

        }
        })
    
      })
    }
  }
    

   

  
	

  })
    
}
  

exports.conf = {
  command: "ytyükselt", // Asıl komutumuz
  description: "", // Komut açıklamamız
  aliases: ["ytdüşür","staff"] // Komutumuzun yardımcıları
}
