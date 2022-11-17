const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const qdb = require("quick.db");
const db = require("quick.db");
exports.execute = async (client, message, args) => {
    let arr = await  db.get(`botkomutrole_${message.guild.id}`) || []
    if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
  
   
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let embed = new MessageEmbed().setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true })).setColor(message.member.displayHexColor).setFooter(client.config.SetFooter)

    if (!message.member.roles.cache.has("931268497378541568") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({ timeout: 10000 }));



    let data = qdb.get(`tagaldı.${member.id}`) || [];
    let listedData = data.length > 0 ? data.map((value, index) => `\`${index + 1}.\` ${value.guildName} | (\`${value.guildNameid}\`) ${value.Zaman}`).join("\n") : "Hiç bir kullanıcıyı taglı olarak kayıt etmemiş.";

    message.channel.send(embed.setDescription(`Merhaba ${message.setAuthor} umarım iyisindir.\nVeritabanını kontrol ediyorum ve buldugum sonuçlar.\n\nTag Görevi: ${data.length || "Görev tamamlanmamış."}\n\n ${listedData}`))
}
}
exports.conf = {
    command: "tagaldırdıklarım", // Asıl komutumuz
    description: "Üyeyi kara listeden kaldırır", // Komut açıklamamız
    aliases: ["taglistem"],
}