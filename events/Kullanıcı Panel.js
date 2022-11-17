const settings = require("../configs/settings.json")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const messageUserChannel = require("../schemas/messageUserChannel");
const conf = require("../configs/config.json");
const voiceUserChannel = require("../schemas/voiceUserChannel");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const voiceUserParent = require("../schemas/voiceUserParent");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");

require("moment-duration-format");


const kdb = new qdb.table("Kayıt");

exports.execute = async (button,message) => {
  let user = button.clicker.id;
  let member = button.guild.members.cache.get(user.id);
  let nickname = button.clicker.displayName == button.clicker.username ? "" + button.clicker.username + " [Yok] " : button.clicker.displayName
  
  const category = async (parentsArray) => {
    const data = await voiceUserParent.find({ guildID: button.guild.id, userID: button.clicker.id });
    const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
    let voiceStat = 0;
    for (var i = 0; i <= voiceUserParentData.length; i++) {
      voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
    }
    return moment.duration(voiceStat).format("H [saat], m [dakika]");
  };
  let embed2 = new MessageEmbed().setColor("RANDOM").setThumbnail("https://cdn.discordapp.com/attachments/902231734014320730/910925332587102330/xxxxxx.PNG")

  let taglı = qdb.get(`aldı.${button.clicker.id}.tag`) || `0`;
  let mkp = qdb.get(`marketpuan${button.clicker.id}`) || `0`;
  let erkek = qdb.get(`erkekKayit_${button.clicker.id}`) || `0`;
  let toplamkayit = qdb.get(`toplamKayit_${button.clicker.id}`);
  let kız = qdb.get(`bayanKayit_${button.clicker.id}`) || `0`;
  const inviterData = await inviterSchema.findOne({ guildID: button.guild.id, userID: button.clicker.id });
  const total = inviterData ? inviterData.total : 0;
  const total2 = inviterData ? inviterData.total : 0;

  const regular = inviterData ? inviterData.regular : 0;

  const bonus = inviterData ? inviterData.bonus : 0;
  const leave = inviterData ? inviterData.leave : 0;
  const fake = inviterData ? inviterData.fake : 0;
  const invMember = await inviteMemberSchema.find({ guildID: button.guild.id, inviter: button.clicker.id });
  const daily = invMember ? button.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
  const weekly = invMember ? button.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;

  const Active1 = await messageUserChannel.find({ guildID: button.guild.id, userID: button.clicker.id }).sort({ channelData: -1 });
  const Active2 = await voiceUserChannel.find({ guildID: button.guild.id, userID: button.clicker.id }).sort({ channelData: -1 });
  const voiceLength = Active2 ? Active2.length : 0;
  let voiceTop;
  let messageTop;
  Active1.length > 0 ? messageTop = Active1.splice(0, 10).map(x => `${x.channelID}: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."
  Active2.length > 0 ? voiceTop = Active2.splice(0, 10).map(x => `${x.channelID}: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : voiceTop = "Veri bulunmuyor."

  const voiceData = await voiceUser.findOne({ guildID: button.guild.id, userID: button.clicker.id });
  const messageData = await messageUser.findOne({ guildID: button.guild.id, userID: button.clicker.id });
 

  const filteredParents = button.guild.channels.cache.filter((x) => {
    x.type === "category" &&
    !conf.publicParents.includes(x.id) &&
    !conf.registerParents.includes(x.id) &&
    !conf.solvingParents.includes(x.id) &&
    !conf.privateParents.includes(x.id) &&
    !conf.aloneParents.includes(x.id) &&
    !conf.funParents.includes(x.id)
    });


    let ihlal = qdb.get(`info.${user.id}.ihlal`) || [];
    ihlal = ihlal.reverse();

    let ihlaller = ihlal.length > 0 ? ihlal.map((value,) => `\`#${value.kod}\` [**${value.cezatip}**]  ${value.bsure} tarihinde **${value.sebep}** sebebiyle <@${value.yetkili}> tarafından cezalandırıldınız`).join("\n\n") : "Veri Bulunamadı.";

  let kayıt = kdb.get(`kullanici.${button.clicker.id}.kayıt`) || [];
  kayıt = kayıt.reverse();
  let isimler = kayıt.length > 0 ? kayıt.map((value, index) => `- \`${value.isim} ${value.yas}\` (${value.rol})`).join("\n"):"";

  let statembed = new MessageEmbed().setThumbnail("https://cdn.discordapp.com/attachments/902231734014320730/910928782095949824/xxxxxx.PNG").setColor("RANDOM");

  let embed = new MessageEmbed().setThumbnail("https://cdn.discordapp.com/attachments/902231734014320730/910928782095949824/xxxxxx.PNG").setColor("RANDOM");

    if(button.id === "x1") {
      await button.reply.think(true)
      await button.reply.edit(embed.setDescription(`
      **❯ Kullanıcı Bilgisi**
      \`•\` Hesap: ${button.clicker.user}
      \`•\` Kullanıcı ID: \`${button.clicker.user.id}\`
      \`•\` Kuruluş Tarihi: \`${moment(button.clicker.user.createdTimestamp).locale("tr").format("LLL")} - (${moment(button.clicker.user.createdTimestamp).locale("tr").fromNow()})\`
     
      ${button.clicker.member.roles.cache.size <= 20 ? button.clicker.member.roles.cache.filter(x => x.name !== "@everyone").map(x => x).join(' , ') : `Listelenemedi. (${button.clicker.member.roles.cache.size})`} `))
    }

    if(button.id === "x2") {
      await button.reply.think(true)
      await button.reply.edit(embed.setDescription(`Sunucu'daki İsimler geçmişiniz aşağıda belirtilmiştir.\n\n${isimler || "Veri bulunamadı"} `))    }

    if(button.id === "x3") {
      await button.reply.think(true)
      await button.reply.edit(statembed.setDescription(`
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Public Kategori: \`${await category(conf.publicParents)}\`
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Register Kategori: \`${await category(conf.registerParents)}\`
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Private Kategori: \`${await category(conf.privateParents)}\`
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Alone Kategori: \`${await category(conf.aloneParents)}\`
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Diğer: \`${await category(filteredParents.map(x => x.id))}\`  
      **─────────────────────**
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Sesli Kanal Bilgileri: (\`Toplam ${voiceLength} kanal\`)
      ${voiceTop}
      **─────────────────────**
      ${client.emojis.cache.find(x => x.name === "ravgar_message")} Mesaj Bilgileri: (\`Toplam ${messageData ? messageData.topStat : 0} mesaj\`)
      ${messageTop}
      *─────────────────────**
      \`\`\`
Taglı Üye: ${taglı} 
Davet: Toplam: ${total} (Regular ${regular}) Haftalık: ${weekly}
Kayıt: (Toplam ${toplamkayit || "0"}) (Erkek,${erkek} - Kadın,${kız})
Kayıt Market Puanı: ${mkp} puan. (.kayıtmarket)\`\`\``))
     }

    if(button.id === "x4") {
      await button.reply.think(true)
      await button.reply.edit(embed.setDescription(`
      Davet Verilerin Aşağıda belirtilmiştir.
      
      Toplam Davet: (**${total2}**)
      Gerçek Davet (**${regular}**)
      Fake Davet: (**${fake}**)
      Ayrılan: (**${leave}**)

      Günlük Olarak: (**${daily}**)
      Son 1 Hafta: (**${weekly}**)
      `))    }

    if(button.id === "x5") {
      await button.reply.think(true)
      await button.reply.edit(embed.setDescription(`Sunucu içerinde yaptıgın ceza-i işlemler;
      ${ihlaller}`))    }


  }

  exports.conf = {
  event: "clickButton" // Eventin ne olduğunu belirliyoruz.
};
