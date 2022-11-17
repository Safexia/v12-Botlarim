const Discord = require("discord.js");
const client = global.client;
const chalk = require("chalk");
const moment = require("moment");
require("../ravgarab.js");
exports.execute = async () => {
  

      setInterval(() => {
        const customStatus = ["ravgar  ❤️ Resy #1837", "developed by ravgar", "bwrat 💙 ravgar"]
        const reloadStatus = Math.floor(Math.random() * (customStatus.length));
        client.user.setActivity(`${customStatus[reloadStatus]}`, { type: "PLAYING"})
        let botVoiceChannel = client.channels.cache.get(client.config.BotSesMain);
        if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
        console.log(chalk `{greenBright [${moment().format('YYYY-MM-DD HH:mm:ss')}]} {blueBright ${client.user.tag} }{red adlı botun SetActivity kısımları Check'lendi.}`)
      }, 10000);

      console.log(chalk `{greenBright [${moment().format('YYYY-MM-DD HH:mm:ss')}]} {red Sunucuİsmi Manager adlı ses kanalına bağlandı.}`)

};

exports.conf = {
  event: "ready" // Eventin ne olduğunu belirliyoruz.
};
