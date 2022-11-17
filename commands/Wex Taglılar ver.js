const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const moment = require("moment");
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    let tag = args[0]
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
    if (!tag || !rol) return;
    let xd = message.guild.members.cache.filter(s => s.user.username.includes(tag) && !s.roles.cache.has(rol.id))

    xd.array().forEach(async(cross, index) => {
        setTimeout(async() => {
            cross.roles.add(rol.id)
        }, index * 1000)
    })
    message.channel.send(`Belirtilen taga sahip üyelere **(${xd.size} kişiye)** ${rol} rolünü başarıyla verdim.`)




};
exports.conf = {
  command: "isimtag", // Asıl komutumuz
  description: "Sunucuda [AFK] olmanı sağlar. ", // Komut açıklamamız
  aliases: [] // Komutumuzun yardımcıları
};