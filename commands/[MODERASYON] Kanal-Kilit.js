
const Discord = require("discord.js");
exports.execute = async (client, message, args) => {
  if(!message.member.roles.cache.has(client.config.OwnerRole))
  if(!message.member.roles.cache.has(client.config.BotCommands))
  if(!message.member.roles.cache.has(client.config.AltYetki))
  if(!message.member.roles.cache.has(client.config.OrtaYetki))
  if(!message.member.roles.cache.has(client.config.ÜstYetki))
  if (!message.member.hasPermission("ADMINISTRATOR"))
  if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
if(!args[0]) {
     const kilit = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`Kanal başarıyla kilitlendi, kilidi açmak \`${ayarlar.prefix}kilit aç\``)
  .setColor(ayarlar.kirmizi)
      message.channel.createOverwrite(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.lineReply(kilit)
  }) }

  if(args[0] == "aç") {
     const kilit = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription("Kanalın kilidi başarıyla açıldı.")
  .setColor(ayarlar.yesil)
      message.channel.createOverwrite(message.guild.id, {
     SEND_MESSAGES: null
    }).then(() => {
      message.lineReply(kilit)
  }) }
};
exports.conf = {
  command: "kilit", // Asıl komutumuz
  description: "Yazılan kanalı everyone rolüne kanala yazı kapatır", // Komut açıklamamız
  aliases: ["loock"] // Komutumuzun yardımcıları
}