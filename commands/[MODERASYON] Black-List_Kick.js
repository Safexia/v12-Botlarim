const { MessageEmbed, Role } = require("discord.js");
const qdb = require("quick.db");
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
    if(!message.guild) return;
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");
    let embed2 = new MessageEmbed().setColor("RANDOM");



    if(!message.member.roles.cache.has(client.config.OwnerRole))
    if (!message.member.hasPermission("ADMINISTRATOR"))
    if(!message.member.roles.cache.has(client.config.KaraListeYetkili))
    if(message.author.id !== client.config.BotOwner) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));

    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi.";

    
    qdb.delete(`karaL.${user.id}`)

    client.channels.cache.get(client.config.KaraListeLog).send(embed.setDescription(`
    __**Kara Listeden Kaldırıldı**__

    **Yetkili** : ${message.member} - (\`${message.member.user.username} - ${message.member.id}\`) 
    **Üye** : ${user} - (\`${user.user.username} - ${user.id}\`)
    **Sebep** : ${reason}
    `)).catch(e => { })

   user.send(embed.setDescription(`${message.guild.name} adlı sunucudan kara listeden kaldırıldın bota erişimin tekrardan açılmıştır.`)).catch(e => { })
};
exports.conf = {
  command: "karaliste-kaldır", // Asıl komutumuz
  description: "Üyeyi kara listeden kaldırır", // Komut açıklamamız
  aliases: ["kara-liste-kaldır","klk","unkaraliste","un-karaliste"],
}

  
