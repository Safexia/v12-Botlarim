const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const db = require("quick.db");



exports.execute = async (client, message, args) => {
  if(!message.member.roles.cache.has(client.config.OwnerRole))
  if (!message.member.hasPermission("ADMINISTRATOR"))
  if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
  let cpuanbilgi = await db.get(`cpuanbilgi_ravgar`);

  let embed2 = new MessageEmbed().setColor("RANDOM");

  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM").setTimestamp();

    if(message.author.id !== client.config.BotOwner)
    if(!message.member.roles.cache.has(client.config.OwnerRole)) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    let cpuan = qdb.fetch(`cpuan${user.id}`) || `0`;

    qdb.delete(`cpuan${user.id}`);
    client.channels.cache.get(cpuanbilgi).send(`**${message.author}**(\`${message.author.id}\`) adlı yetkili ${user} (\`${user.id}\`) adlı kullanıcının **${cpuan}** olan cezapuanını sıfırladı. `)

   message.channel.send(`${user} adlı üyenin **${cpuan}** olan cezapuanı ${message.author} tarafından sıfırlandı`).catch(e => { })
   client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.cezapuansıfırla\` komutunu kullandı. [\`${message.content}\`]`);

};

exports.conf = {
  command: "cezapuansıfırla", // Asıl komutumuz
  description: "Belirtilen üyenin tüm isim geçmişlerini siler", // Komut açıklamamız
  aliases: ["cezapuansıfırla"]
}