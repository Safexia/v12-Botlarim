const qdb = require("quick.db")
const Discord = require("discord.js")
const DeletedRoles = require("../models/deletedRoles");

const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require("discord.js");
const moment = require("moment")

require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
  if (message.author.id !== "728161454288535604") return;
  let veri = await DeletedRoles.find().exec();   

  message.channel.send(embed.setDescription(`\`\`\`js
${veri.reverse().map(dat => `Silinen Rol: ${dat.oldRoleID}\nAçılan Rol: ${dat.newRoleID}\nSilinme Tarihi: ${moment(dat.Date).locale("tr").format("LLL")}`).join("\n─────────────────────\n") || "Silinen Bir Rol Bulunamadı."}\`\`\``), {
    code: "md",
    split: true
})
};


exports.conf = {
  command: "silinenrol", // Asıl komutumuz
  description: "", // Komut açıklamamız
  aliases: ["ravgar_del"],
}