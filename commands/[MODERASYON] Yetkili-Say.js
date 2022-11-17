const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {

  if(!message.member.roles.cache.has(client.config.OwnerRole))
  if(!message.member.roles.cache.has(client.config.BotCommands))
  if(!message.member.roles.cache.has(client.config.ÜstYetki))
  if (!message.member.hasPermission("ADMINISTRATOR"))
  if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
  let phentos = ""
  let phentos2 = ""
  
  message.guild.roles.cache.get("924040643712532501").members.map(r => { //herkeste olan rolü yazın.
    phentos += r.voice.channel ? " <@" + r.user.id + ">" : "";
    phentos2 += !r.voice.channel ? " <@" + r.user.id + ">" : "";
  });
var button_1 = new MessageButton()
.setID("1")
.setLabel("Ses Kanalında Bulunanlar")
.setStyle("red")

var button_2 = new MessageButton()
.setID("2")
.setLabel("İptal")
.setStyle("gray")

var button_3 = new MessageButton()
.setID("3")
.setLabel("Ses Kanalında Bulunmayanlar")
.setStyle("blurple")

let embedravgar = new MessageEmbed().setFooter(`50 Saniye sonra butonlar kullanılmaz hale gelecektir.`)
.setDescription(`
Merhaba, İstatiktiklerinize erişmek için aşağıdaki bilgilendirmeyi okuyunuz.

\`•\` Ses Kanallarında **Bulunan** Yetkileri Görmek için. \`KIRMIZI BUTON 🔴\` 
\`•\` İptal Etmek için. \`GRAY BUTON ⚫\` 
\`•\` Ses Kanallarında **Bulunmayan** Yetkileri Görmek için \`MAVİ BUTON 🔵\` 



    `)


    let embed = new MessageEmbed().setColor("RANDOM");

    let msg = await message.channel.send({ buttons : [ button_1, button_2, button_3], embed: embedravgar})
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, {time: 50000})

      collector.on("collect", async (button) => {

        
        if(button.id === "1") {
          await button.reply.defer()
          msg.delete()
          message.channel.send(`\`\`\`${phentos}\`\`\``)
        }if(button.id === "2") {
          await button.reply.defer()
          msg.delete()
          message.channel.send(embed.setDescription(`
          İşlem İptal edildi.`))

        }if(button.id === "3") {
          await button.reply.defer()
          msg.delete()
          message.channel.send(`\`\`\`${phentos2}\`\`\``)
        }

  });

}


exports.conf = {
  command: "ytsayravgar", // Asıl komutumuz
  description: "Belirtilen üyenin eski isimlerini atar", // Komut açıklamamız
  aliases: ["ravgarsay"]
}
