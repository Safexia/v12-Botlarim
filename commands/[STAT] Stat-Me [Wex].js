const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const Database = require('../models/inviter.js');
const messageUserChannel = require("../schemas/messageUserChannel");
const conf = require("../configs/config.json");
const { MessageButton } = require('discord-buttons');
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");

const voiceUserChannel = require("../schemas/voiceUserChannel");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const voiceUserParent = require("../schemas/voiceUserParent");

const qdb = require("quick.db");
const kdb = new qdb.table("Kayıt");

require("moment-duration-format");

exports.execute = async (client, message, args) => {
  


  const category = async (parentsArray) => {
    const data = await voiceUserParent.find({ guildID: message.guild.id, userID: message.author.id });
    const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
    let voiceStat = 0;
    for (var i = 0; i <= voiceUserParentData.length; i++) {
      voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
    }
    return moment.duration(voiceStat).format("H [saat], m [dakika]");
  };
  let embed2 = new MessageEmbed().setColor("RANDOM").setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))

  let taglı = qdb.get(`aldı.${message.author.id}.tag`) || `0`;
  let mkp = qdb.get(`marketpuan${message.author.id}`) || `0`;
  let erkek = qdb.get(`erkekKayit_${message.author.id}`) || `0`;
  let toplamkayit = qdb.get(`toplamKayit_${message.author.id}`);
  let kız = qdb.get(`bayanKayit_${message.author.id}`) || `0`;

  const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: message.author.id });
  const total = inviterData ? inviterData.total : 0;
  const regular = inviterData ? inviterData.regular : 0;
  const bonus = inviterData ? inviterData.bonus : 0;
  const leave = inviterData ? inviterData.leave : 0;
  const fake = inviterData ? inviterData.fake : 0;
  const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: message.author.id });
  const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
  const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;

  const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: message.author.id }).sort({ channelData: -1 });
  const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: message.author.id }).sort({ channelData: -1 });
  const voiceLength = Active2 ? Active2.length : 0;
  let voiceTop;
  let messageTop;
  Active1.length > 0 ? messageTop = Active1.splice(0, 10).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."
  Active2.length > 0 ? voiceTop = Active2.splice(0, 10).map(x => `<#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : voiceTop = "Veri bulunmuyor."

  const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: message.author.id });
  const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: message.author.id });
  const invite = await Database.findOne({guildID: message.guild.id, userID: message.author.id});
 
  const ytgözük = message.member.roles.cache.has("912419033423441990") ?
`\`\`\`Davet Bilgileri: Toplam: (})\nKayıt Bilgileri: Toplam: (${toplamkayit || "0"}) (E,${erkek} - K,${kız})\`\`\`` : "";

const görev = message.member.roles.cache.has("912419033423441990") ?
`\`\`\`GÖREV EKLENMEDİ\`\`\`` : "";

  const filteredParents = message.guild.channels.cache.filter((x) => {
    x.type === "category" &&
    !conf.publicParents.includes(x.id) &&
    !conf.registerParents.includes(x.id) &&
    !conf.solvingParents.includes(x.id) &&
    !conf.privateParents.includes(x.id) &&
    !conf.aloneParents.includes(x.id) &&
    !conf.funParents.includes(x.id)
    });


    var button_1 = new MessageButton()
    .setID("1")
    .setLabel("Kategori Veri")
    .setStyle("red")
    .setEmoji("📁")

    var button_2 = new MessageButton()
    .setID("2")
    .setLabel("Ses ve Chat Veri")
    .setStyle("blurple")
    .setEmoji("💬")

    var button_3 = new MessageButton()
    .setID("3")
    .setLabel("İnvite,Kayıt,Taglı Veri")
    .setStyle("green")
    .setEmoji("✉️")

    var button_4 = new MessageButton()
    .setID("4")
    .setLabel("Tüm Veri ")
    .setStyle("gray")
    .setEmoji("📙")
    let embedravgar = new MessageEmbed().setFooter(`50 Saniye sonra butonlar kullanılmaz hale gelecektir.`).setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
.setDescription(`
Merhaba, İstatiktiklerinize erişmek için aşağıdaki bilgilendirmeyi okuyunuz.

\`•\` Kategori İstatistikleri İçin \`KIRMIZI BUTON 🔴\` 
\`•\` Ses ve Chat Kanalları Sıralaması için \`MAVİ BUTON 🔵\` 
\`•\` Davet,Kayıt,Taglı Bilgileriniz için \`YEŞİL BUTON 🟢\` 
\`•\` Tüm İstatistik verilerini görüntelemek için \`GRİ BUTON ⚫\` 


    `)

    let msg = await message.channel.send({ buttons : [ button_1, button_2, button_3, button_4 ], embed: embedravgar})
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, {time: 50000})

      collector.on("collect", async (button) => {

    let embed = new MessageEmbed().setFooter(client.config.SetFooter).setColor("RANDOM");

   

    if(button.id === "1") {
      await button.reply.defer()
      message.channel.send(embed.setDescription(`
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Public Kategori: \`${await category(conf.publicParents)}\`
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Register Kategori: \`${await category(conf.registerParents)}\`
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Private Kategori: \`${await category(conf.privateParents)}\`
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Alone Kategori: \`${await category(conf.aloneParents)}\`
      ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Diğer: \`${await category(filteredParents.map(x => x.id))}\`

      `))
      
            
      
  
  }
    
  if(button.id === "2") {
    await button.reply.defer()
    message.channel.send(embed.setDescription(`
Ses Aktifliği Kanal Sıralaması **[VOİCE]** 
${voiceTop}
**─────────────────────**
Mesaj Aktifliği Kanal Sıralaması **[MESSAGE]** 
${messageTop}

    `))
    
          
    

}
if(button.id === "3") {
  await button.reply.defer()
  message.channel.send(embed.setDescription(`
  ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Taglı Üye: ${taglı}
  ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Davet: (Toplam ${total}) (Regular ${regular})
  ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Kayıt: (Toplam ${toplamkayit || "0"}) (Erkek,${erkek} - Kadın,${kız})
  ${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Kayıt Market Puanı: ${mkp} puan. (.kayıtmarket)   
  `))
}
        
  if(button.id === "4") {
    await button.reply.defer()
    message.channel.send(embed2.setDescription(`
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

})
client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.ystat\` komutunu kullandı. [\`${message.content}\`]`);

}
exports.conf = {
  command: ".me", // Asıl komutumuz
  description: "ID li ceza bildiyi gösterir", // Komut açıklamamız
  aliases: ["stattım"] // Komutumuzun yardımcıları
}
