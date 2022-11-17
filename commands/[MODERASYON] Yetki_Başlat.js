const Discord = require("discord.js")
const db = require("quick.db")
const { MessageButton } = require('discord-buttons');
require('discord-reply');

const { MessageEmbed } = require("discord.js");
const moment = require("moment")
require("../ravgarcık.js");
const qdb = require("quick.db")

exports.execute = async (client, message, args) => {
    let embed2 = new MessageEmbed().setColor("RANDOM");


    let arr = await  db.get(`botcu_${message.guild.id}`) || []
    if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!user) return message.lineReply(`Bir kullanıcı belirt ve tekrar dene.`);

let baslangıcyt = await db.get(`baslangıcyt_${message.guild.id}`) || []
let ikinciyt = await db.get(`2inciyt_${message.guild.id}`) || []
let ücüncüyt = await db.get(`3üncücyt_${message.guild.id}`) || []


var button_1 = new MessageButton()
.setID("33")
.setLabel("Başlangıç Yetki")
.setStyle("blurple")
.setEmoji("📁")

var button_2 = new MessageButton()
.setID("2")
.setLabel("2. Yetki")
.setStyle("blurple")
.setEmoji("📁")

var button_3 = new MessageButton()
.setID("3")
.setLabel("3. Yetki")
.setStyle("blurple")
.setEmoji("📁")

let embedravgar = new MessageEmbed().setFooter(`50 Saniye sonra butonlar kullanılmaz hale gelecektir.`).setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
.setDescription(`
Merhaba, Vermek istediğiniz yetkiyi aşağıdan seçiniz.

\`•\` [**Başlangıç**] ${await db.has(`baslangıcyt_${message.guild.id}`) ? `(${baslangıcyt.map(c => `<@&${c}>`)})` : `\`.rolesetup baslangıcyt @rol @rol2 @rol3\``}
\`•\` [**2. Yetki**]  ${await db.has(`2inciyt_${message.guild.id}`) ? `(${ikinciyt.map(c => `<@&${c}>`)})` : `\`.rolesetup 2yetki @rol @rol2 @rol3\``}
\`•\` [**3. Yetki**]  ${await db.has(`3üncücyt_${message.guild.id}`) ? `(${ücüncüyt.map(c => `<@&${c}>`)})` : `\`.rolesetup 3yetki @rol @rol2 @rol3\``}


    `)

    let msg = await message.channel.send({ buttons : [ button_1, button_2, button_3], embed: embedravgar})
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, {time: 50000})

      collector.on("collect", async (button) => {
        let embed = new MessageEmbed().setFooter(client.config.SetFooter).setColor("RANDOM");


      if(button.id === "33") {
        await button.reply.defer()
          msg.delete()
          user.roles.add(baslangıcyt)
        message.channel.send(embed.setDescription(`${user} adlı kullanıcıya ${await db.has(`baslangıcyt_${message.guild.id}`) ? `(${baslangıcyt.map(c => `<@&${c}>`)})` : `\`Roller belirtilmemiş\``} rolleri verildi.`))
        client.channels.cache.get("931280938342682654").send(embed.setDescription(`${user} adlı kullanıcı 1. yetkiden ${message.author} tarafından başlatıldı.
        Verilen Yetkiler: ${ücüncüyt.map(c => `<@&${c}>`)}`))
        message.channel.send(embed.setDescription(`${user} adlı kullanıcıya ${await db.has(`baslangıcyt_${message.guild.id}`) ? `(${ücüncüyt.map(c => `<@&${c}>`)})` : `\`Belirtilmemiş Roller.\``} rolleri verildi.`))

      }
      if(button.id === "2") {
        await button.reply.defer()
        message.channel.send(embed.setDescription(`${user} adlı kullanıcıya  ${await db.has(`3üncücyt_${message.guild.id}`) ? `(${ücüncüyt.map(c => `<@&${c}>`)})` : `\`Belirtilmemiş Roller.\``} rolleri verildi.`))
        msg.delete()
        user.roles.add(ikinciyt)
        message.channel.send(embed.setDescription(`${user} adlı kullanıcıya ${await db.has(`2inciyt_${message.guild.id}`) ? `(${ücüncüyt.map(c => `<@&${c}>`)})` : `\`Belirtilmemiş Roller.\``} rolleri verildi.`))
        client.channels.cache.get("931280938342682654").send(embed.setDescription(`${user} adlı kullanıcı 2. yetkiden ${message.author} tarafından başlatıldı.
        Verilen Yetkiler: ${ücüncüyt.map(c => `<@&${c}>`)}`))

      }
      if(button.id === "3") {
        await button.reply.defer()
        message.channel.send(embed.setDescription(`${user} adlı kullanıcıya  ${await db.has(`3üncücyt_${message.guild.id}`) ? `(${ücüncüyt.map(c => `<@&${c}>`)})` : `\`Belirtilmemiş Roller.\``} rolleri verildi.`))
        msg.delete()
        user.roles.add(ücüncüyt)
        client.channels.cache.get("931280938342682654").send(embed.setDescription(`${user} adlı kullanıcı 3. yetkiden ${message.author} tarafından başlatıldı.
        Verilen Yetkiler: ${ücüncüyt.map(c => `<@&${c}>`)}`))

      }

    })
    client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.yetkiver\` komutunu kullandı. [\`${message.content}\`]`);

}}
/////////////////////////////////////////////////////////////////////////////////////

exports.conf = {
command: "ytver",
aliases: ["yetkiver"]
} 
