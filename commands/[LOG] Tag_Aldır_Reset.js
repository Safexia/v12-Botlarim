const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");


exports.execute = async (client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");

  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();

    if(message.author.id !== client.config.BotOwner)
    if(!message.member.roles.cache.has(client.config.OwnerRole)) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));

    qdb.delete(`tagaldı.${user.id}`);

   message.channel.send(embed.setDescription(`${user} adlı üyenin Tag verileri sıfırlandı.`)).catch(e => { })

   client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.tagalsıfırla\` komutunu kullandı. [\`${message.content}\`]`);


};

exports.conf = {
  command: "tagalsıfırla", // Asıl komutumuz
  description: "Belirtilen üyenin tüm isim geçmişlerini siler", // Komut açıklamamız
  aliases: ["tagalreset"]
}