const disbut = require("discord-buttons");
const { MessageEmbed } = require("discord.js");



exports.execute = async (client, message, args) => {
  if (message.member.permissions.has(8) || !client.ayarlar.sahip.some(x => x == message.author.id)) {
    let config = {
        "etkinlik": "931987799727542323",
        "cekilis": "931987798842568764",
    }
    let tag = client.config.Tag
    let tagg = client.config.Etiket

    let tagrol = client.config.TaglıRole
    let taglısize = message.guild.members.cache.filter(member => member.user.username.toLowerCase().includes(tag) && member.user.discriminator.toLowerCase().includes(tagg) && !member.roles.cache.has(tagrol))
    let et = message.guild.members.cache.filter(member => !member.roles.cache.has(config.cekilis) && !member.roles.cache.has(config.etkinlik)).size;

let btagrol = new disbut.MessageButton().setStyle('green').setLabel('Tag Dağıt!').setID('btagrol')
let ecdagit = new disbut.MessageButton().setStyle('red').setLabel('Etkinlik/Çekiliş Dağıt').setID('ecdagit')

let embed = new MessageEmbed()
.setDescription(`
\`\`\`js\nRol Dağıtım\`\`\`
${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Sunucu İçerisinde Taglı Fakat Rolsüz Kullanıcı: \`${taglısize.size}\`
${client.emojis.cache.find(x => x.name === "ravgar_nokta")} Sunucu İçerisinde Etkinlik/Çekiliş Rolü Olmayan Kullanıcı:  \`${et}\`
`)
.setColor("BLACK")
.setFooter(`Developed by ravgar`)

message.channel.send(embed, { buttons: [ecdagit,btagrol] })

}
}
client.on('clickButton', async (button) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");

    if (button.id === 'btagrol') {
      let tag = client.config.Tag
      let tagg = client.config.Etiket
  
    let tagrol = client.config.TaglıRole
          let kek = button.guild.members.cache.filter(member => member.user.username.toLowerCase().includes(tag) && member.user.discriminator.toLowerCase().includes(tagg) &&!member.roles.cache.has(tagrol))
    button.reply.send(embed2.setDescription(`Tagı olup rolü olmayan ${kek.size} kullanıcıya rol verildi.
    Tag Rolü verilen kullanıcılar;
    ${kek.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")}`))
    button.guild.members.cache.filter(member => member.user.username.toLowerCase().includes(tag) && !member.roles.cache.has(tagrol)).map(x=> x.roles.add(tagrol))                
    }
    if (button.id === 'ecdagit') {
        let çay = {
            "etkinlik": "931987798842568764",
            "cekilis": "931987799727542323",
        }
    let pasta = button.guild.members.cache.filter(member => !member.roles.cache.has(çay.etkinlik) && !member.roles.cache.has(çay.cekilis))
        let emcük = ["931987798842568764","931987799727542323"];
        button.reply.send(`Etkinlik/Çekiliş rolü olmayan ${pasta.size} kullanıcıya etkinlik, çekiliş rolleri verildi !`)
        button.guild.members.cache.filter(member => !member.roles.cache.has(çay.etkinlik) && !member.roles.cache.has(çay.cekilis)).map(x=> x.roles.add(emcük));
    }

  });
exports.conf = {
  command: "control", // Asıl komutumuz
  description: "Ses kanllarındaki mutesini kaldırır.", // Komut açıklamamız
  aliases: ["tagkontrol"] // Komutumuzun yardımcıları
}
