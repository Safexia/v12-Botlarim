const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");

require("../ravgarcık.js");
require('discord-reply');

exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return  message.react("❌");
  
    if(!message.member.roles.cache.has(client.config.BoosterRol)) 
    return message.lineReply("Bu komutu sadece Booster'lar kullanabilir.")
    let uye = message.member;

    let taglırol = await db.get(`teamrole_${message.guild.id}`);


    let isim = args.splice(0).join(" ");
    if(!isim) return message.channel.send(embed.setDescription("Geçerli bir isim belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  
    if(isim.length >= "26") return message.channel.send(embed.setDescription(`Max 25 karakter kullana bilirsin.`))


    if(client.config.TagVarYok) {

    if(!message.member.roles.cache.has(taglırol)) {

    uye.setNickname(`${isim}`).catch(e => { });
  message.channel.send(embed.setDescription(`${message.member} yeni adın : ${isim}`));	

} else {
    uye.setNickname(`${isim}`).catch(e => { });
    message.channel.send(embed.setDescription(`${message.member} yeni adın ${isim}`));
}
} else {

    uye.setNickname(`${isim}`).catch(e => { });
    message.channel.send(embed.setDescription(`${message.member} yeni adın ${isim}`));
}

};
exports.conf = {
  command: "booster", // Asıl komutumuz
  description: "Sunucudaki ismini değiştirir.", // Komut açıklamamız
  aliases: ["boost","zengin"] // Komutumuzun yardımcıları
}