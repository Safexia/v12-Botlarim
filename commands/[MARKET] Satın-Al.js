const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const ms = require('ms');
require("moment-duration-format");
require("../ravgarcık.js");
const db = require("quick.db");
const moment = require("moment");

exports.execute = async (client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");

  let arr = await  db.get(`botkomutrole_${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {

   let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM").setTimestamp();

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.lineReply(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));
    


  let ürün1 = 1000
  let ürün2 = 1000
  let ürün3 = 1000
  let ürün4 = 1000
  let ürün5 = 300000
  let ürünname1 = "Orcharis"
  let ürünname2 = "Juddy"
  let ürünname3 = "Fources"
  let ürünname4 = "Sanroof"
  let ürünname5 = "1 Aylık Discord Nitro Classic"
  let GuildName = message.guild.name
    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let user = message.guild.member(kullanici);
    let marketpuan = qdb.fetch(`marketpuan${message.member.id}`) || `0`;
    let market = args[0]
    if(!market || isNaN(market)) return message.lineReply(embed.setDescription(`${message.member} lütfen geçerli bir \`ID\` giriniz.`))
       
    
           if (args[0] === "1") {
           if(marketpuan < 1000) return message.lineReply(embed.setDescription(`Dostum almak istediğin ürün ${ürün1} puan fakat senin **${marketpuan}** puanın bulunmakta`))    
           message.lineReply(embed.setDescription(`Başarıyla ${ürünname1} adlı ürünü ${ürün1} puana satın aldın.`))
           qdb.add(`marketpuan${message.member.id}`, -1000)
           qdb.add(`ürünlerim1.${message.member.id}`, 1)
           message.author.send(embed.setDescription(`"${GuildName}" sunucusunda başarılı bir şekilde "${ürünname1}" adlı ürünü satın aldın. `))
           message.member.roles.add("920681863310360576")}
          if (args[0] === "2") {
          if(marketpuan < 1000) return message.lineReply(embed.setDescription(`Dostum almak istediğin ürün ${ürün2} puan fakat senin **${marketpuan}** puanın bulunmakta`))
            message.lineReply(embed.setDescription(`Başarıyla ${ürünname2} adlı ürünü ${ürün2} puana satın aldın.`))
            qdb.add(`marketpuan${message.member.id}`, -1000)
            qdb.add(`ürünlerim2.${message.member.id}`, 1)
            message.member.roles.add("920681864111476736")
          message.author.send(embed.setDescription(`"${GuildName}" sunucusunda başarılı bir şekilde "${ürünname2}" adlı ürünü satın aldın. `))}
          if (args[0] === "3") {
          if(marketpuan < 1000) return message.lineReply(embed.setDescription(`Dostum almak istediğin ürün ${ürün3} puan fakat senin **${marketpuan}** puanın bulunmakta`))
            message.lineReply(embed.setDescription(`Başarıyla ${ürünname4} adlı ürünü ${ürün3} puana satın aldın.`))
            qdb.add(`marketpuan${message.member.id}`, -1000)
            qdb.add(`ürünlerim3.${message.member.id}`, 1)
            message.member.roles.add("920681866514800670")
            message.author.send(embed.setDescription(`"${GuildName}" sunucusunda başarılı bir şekilde "${ürünname3}" adlı ürünü satın aldın. `))}
          if (args[0] === "4") {
          if(marketpuan < 1000) return message.lineReply(embed.setDescription(`Dostum almak istediğin ürün **${ürün4}** puan fakat senin **${marketpuan}** puanın bulunmakta`))
            message.lineReply(embed.setDescription(`"${GuildName}" sunucusunda başarıyla ${ürünname4} adlı ürünü ${ürün4} puana satın aldın.`))
            qdb.add(`marketpuan${message.member.id}`, -1000)
            qdb.add(`ürünlerim4.${message.member.id}`, 1)
            message.member.roles.add("920681873427034182")
            message.author.send(embed.setDescription(`Başarılı bir şekilde "${ürünname4}" adlı ürünü satın aldın. `))}
          if (args[0] === "5") {
          if(marketpuan < 30000) return message.lineReply(embed.setDescription(`Dostum almak istediğin ürün **${ürün5}** puan fakat senin **${marketpuan}** puanın bulunmakta`))
          message.lineReply(embed.setDescription(`Başarıyla ${ürünname5} adlı ürünü ${ürün5} puana satın aldın.`))
            qdb.add(`marketpuan${message.member.id}`, -300000)
            qdb.add(`ürünlerim5.${message.member.id}`, 1)
            message.author.send(embed.setDescription(`"${GuildName}" sunucusunda bşarılı bir şekilde "${ürünname5}" adlı ürünü satın aldın sunucumuzdaki üst yetkililerimize satın aldıgını bildirerek Nitronu Temin edebilirsin`))}
       
            client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.marketal\` komutunu kullandı. [\`${message.content}\`]`);

          };
        }
exports.conf = {
  command: "marketpuan", // Asıl komutumuz
  description: "Sunucdaki ceza puanını atar", // Komut açıklamamız
  aliases: ["marketal"] // Komutumuzun yardımcıları
}
