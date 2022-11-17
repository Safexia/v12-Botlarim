const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
exports.execute = async (client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");

    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");
  
    if(!message.member.roles.cache.has(client.config.OwnerRole))
    if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));


    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return  message.react(client.config.emoji.red);

	if (!args[0] || isNaN(args[0])) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
    let user = args[0];
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi"


    qdb.add(`banAtma.${message.member.id}`, 1)


   qdb.delete(`fBan.${user}`) //KALICI BAB KOMUTU

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
    message.guild.members.unban(user).catch(err => message.channel.send("Belirtilen ID numarasına sahip bir ban bulunamadı!").then(x => x.delete({timeout: 5000})));
	client.channels.cache.get(client.config.YargıLog).send(embed.setDescription(`<@${user}> \`${user.id}\`  üyesinin aldıgı **YARGI** cezası ${message.author} tarafından kaldırıldı.\n\`\`\`\n• kaldırılma sebebi: [ ${reason} ]\n• kaldırılma tarihi: [ ${atılmagün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${atılmasaat} ]\`\`\``)).catch(e => { });
    message.channel.send(embed.setDescription(`<@${user}> adlı kişinin **YARGI** banı kaldırılmıştır.`)).catch(e => { })



    message.react(client.config.emoji.onay)
    client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.funban\` komutunu kullandı. [\`${message.content}\`]`);

}
exports.conf = {
  command: "yargıunban", // Asıl komutumuz
  description: "Belirtilen kullanıcının kalıcı banını açar", // Komut açıklamamız
  aliases: ["funban"] // Komutumuzun yardımcıları
}
