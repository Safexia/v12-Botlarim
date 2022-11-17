const { MessageEmbed } = require("discord.js");
const {MessageAttachment} = require("discord.js");
const { table } = require('table');
const db = require("quick.db");

const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");



exports.execute = async(client, message, args) => {
    let arr = await  db.get(`botkomutrole_${message.guild.id}`) || []
    if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!user) return this.client.yolla("Ceza bilgilerine bakmak istediğin kullanıcyı belirtmelisin", message.author, message.channel)
  let ihlal = qdb.get(`info.${user.id}.ihlal`) || [];

      let datax = [
          ["ID", "Tarih", "Ceza", "Sebep"]
      ];

      let dataxe = [
          ["ID", "Ceza", "Tarih", "Bitiş", "Yetkili", "Sebep"]
      ];

      let config = {
          border: {
              topBody: ``,
              topJoin: ``,
              topLeft: ``,
              topRight: ``,

              bottomBody: ``,
              bottomJoin: ``,
              bottomLeft: ``,
              bottomRight: ``,

              bodyLeft: `│`,
              bodyRight: `│`,
              bodyJoin: `│`,

              joinBody: ``,
              joinLeft: ``,
              joinRight: ``,
              joinJoin: ``
          }
      };
      ihlal.map(x => {
          datax.push([x.kod, x.bsure, x.cezatip, x.sebep])
      })

      ihlal.map(x => {
          dataxe.push([x.kod, x.cezatip, x.bsure, x.ssure, x.yetkili.tag, x.sebep])
      })
 

      let out = table(dataxe, config)
      let outi = table(datax.slice(0, 15), config)
      message.channel.send("<@" + user.id + "> kullanıcısının toplam " + datax.length + " cezası bulunmakta son 15 ceza aşağıda belirtilmiştir.Tüm ceza bilgi dosyasını indirmek için 🚫 tepkisine tıklaman yeterli.``.ceza ID`` komutunu uygulayınız. ```" + outi + "``` ").then(msg => {
          msg.react("🚫").then(async(r) => {
          });
          msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '🚫'),
              { max: 1, time: 30000 }).then(async collected => {
                  if (collected.first().emoji.name == '🚫') {
                      message.channel.send(`${user} kullanıcısının toplam ${datax.length} cezası aşağıdaki belgede yazmaktadır.`, { files: [{ attachment: Buffer.from(out), name: `${user.user.username}_cezalar.txt` }] }).then(msg => {
                          msg.delete({ timeout: 5000 })
                      })
                 
                    } else {
                  
              

     
                    }
                  })
                })
                  

                  }
              
                }
exports.conf = {
  command: "ravgarsicil",
  description: "BU KOD VORTEX TARAFINDAN KODLANDI",
  aliases: ["üyegeçmiş", "testcezali", "üye-geçmiş", "uyegecmis", "uye-gecmis"]  
};
