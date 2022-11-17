const Discord = require("discord.js")
const qdb = require("quick.db")
require("../ravgarcık.js");
exports.execute = async (bot2, message, args) => {
 
  if(message.author.id !== client.config.BotOwner) return
  message.channel.send("Tüm Botlar yeniden başlatılıyor.").then(msg => {
    console.log("[BOT]Yeniden başlatılıyor | [ravgarcıkkk]");
    process.exit(0);
});

};

exports.conf = {
  command: "restart", // Asıl komutumuz
  description: "", // Komut açıklamamız
  aliases: ["reboot"],
}