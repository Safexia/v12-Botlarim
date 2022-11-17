const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");

const moment = require("moment");

exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");
    let embed2 = new MessageEmbed().setImage("https://cdn.discordapp.com/attachments/786747351309484093/835962604802670622/96382.gif").setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM")

    let embed3 = new MessageEmbed().setColor("RANDOM");

    if(!message.member.roles.cache.has(client.config.OwnerRole))
    if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));


    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return  message.react(client.config.emoji.red);

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send(embed.setDescription("yargılanacak bir üye belirtmelisin.")).then(x => x.delete({timeout: 5000})).catch(e => { });
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi"
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

    message.channel.send(embed2.setDescription(`${user}, kişisi ${message.author} tarafından ___${reason}___ nedeniyle yargılandı.`))

    user.send(embed2.setDescription(`${message.guild.name} sunucusundan ${message.author} tarafından ${reason} nedeniyle yasaklandın`))
    user.ban().catch(e => { });
    qdb.add(`banAtma.${message.member.id}`, 1)
    var yıl = [moment().format('YYYY')]
    let aylartoplam = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"};
  let aylar = aylartoplam;
  let atılmagün = moment(Date.now()).format("DD")
  let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    client.channels.cache.get(client.config.YargıLog).send(embed.setDescription(`${user} \`${user.id}\`  üyesi ${message.author} tarafından **YARGILANDI**.\n\`\`\`\n• yasaklanma sebebi: [ ${reason} ]\n• yasaklanma tarihi: [ ${atılmagün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${atılmasaat} ]\`\`\``)).catch(e => { });

    qdb.set(`fBan.${user.id}`, `ffffBann`) //KALICI JAİL KOMUTU
    message.react(client.config.emoji.onay)

    client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.yargı\` komutunu kullandı. [\`${message.content}\`]`);

  }
exports.conf = {
  command: "yargı", // Asıl komutumuz
  description: "Belirtilen üyeye kalıcı olarak ban atar", // Komut açıklamamız
  aliases: ["ravgarban","berkayban","ravgarincekici", "berkayıncekici"] // Komutumuzun yardımcıları
}