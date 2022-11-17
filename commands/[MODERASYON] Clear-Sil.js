const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("../ravgarcık.js");
const qdb = require("quick.db");
exports.execute = async (client, message, args) => {

  let embed2 = new MessageEmbed().setColor("RANDOM");
    if(!message.guild) return;
    if(!message.member.hasPermission("MANAGE_MESSAGES")) 
    return;
 
    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

    if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) 
    return message.lineReply("Bir sayı belirt.")
    await message.delete().catch(e => { });
    await message.channel.bulkDelete(Number(args[0])).then(msjlar => message.lineReply(`Başarıyla **${msjlar.size}** adet mesaj silindi.`).then(x => x.delete({timeout: 5000}))).catch(e => { });
    client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.sil\` komutunu kullandı. [\`${message.content}\`]`);

};
exports.conf = {
  command: "sil", // Asıl komutumuz
  description: "Belirtilen miktar kadar sohbeti temizler.", // Komut açıklamamız
  aliases: ["celar"] // Komutumuzun yardımcıları
}