const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");


    if(message.author.id !== client.config.BotOwner)
    if(!message.member.roles.cache.has(client.config.OwnerRole)) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));
    let embed2 = new MessageEmbed().setColor("RANDOM");

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000})).catch(e => { });
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi"

    client.channels.cache.get(client.config.BanLog).send(embed.setDescription(`${user} (\`${user.id}\`) üyesinin başarılı şekilde ban limiti sıfırlandı\n\n• Sebep: \`${reason}\` `)).catch(e => { })
    qdb.delete(`banL_${message.author.id}`)
    user.roles.add(client.config.BanYetkili).catch(e => { })

    message.channel.send(embed.setDescription(`
    ${user} adlı kişini başarıyla ban limiti sıfırlandı
    rolü geri verildi artık ${client.config.BanLimit} kere daha ban atabilir
`)).catch(e => { })

    message.react(client.config.emoji.onay)
};


exports.conf = {
  command: "banl", // Asıl komutumuz
  description: "ban limiti sıfırlar", // Komut açıklamamız
  aliases: ["ban-limit-sıfırla","banlimit","ban-limit","banlimitsıfırla"] // Komutumuzun yardımcıları
}

