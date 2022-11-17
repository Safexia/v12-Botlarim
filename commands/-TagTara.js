const { MessageEmbed, Role } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
const kdb = new qdb.table("Kayıt");
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
    if(message.author.id !== "728161454288535604") return;

    const tag = args.slice(0).join(' ');
    if(!tag) return message.reply(`**⚠ Bir Tag Girmelisiniz Örnek Kullanım;\n\`${ayarlar.prefix}tag-taraması ҭʀ \`**`)
      const memberss = message.guild.members.cache.filter(member => member.user.username.includes(tag));
        message.channel.send(memberss.map( member => `\`•\`${member} \`(${member.user.id})\`` ).join("\n") || `**Sunucudaki kimsede \`${tag}\` tagı bulunmuyor!**`)
          
  
    }



exports.conf = {
    command: "tagtara", // Asıl komutumuz
    description: "Belirtilen kişiyi erkek olarak kayıt eder", // Komut açıklamamız
    aliases: ["tagbul"] // Komutumuzun yardımcıları
  }
  //