const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const kdb = new qdb.table("Kayıt");


exports.execute = async (client, message, args) => {
  
  let arr = await  db.get(`registeryrole_${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
  
  let embed2 = new MessageEmbed().setColor("RANDOM");

  let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
  if(KaraListe) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));
  let embed = new MessageEmbed().setAuthor("Top Kayıt Listesi").setFooter(client.config.SetFooter).setColor("RANDOM")
  let data = await kdb.get("teyit") || {};
  let arr = Object.keys(data);
  let listedMembers = arr.filter(dat => message.guild.members.cache.has(dat)).sort((a,b) => Number((data[b].erkek || 0) + (data[b].kiz || 0)) - Number((data[a].erkek || 0) + (data[a].kiz || 0))).map((value, index) => `**${index + 1}.** **${client.users.cache.get(value).username}** - **${(data[value].erkek || 0) + (data[value].kiz || 0)}** kayıt (**${(data[value].erkek || 0)}** erkek, **${(data[value].kiz || 0)}** kız)  `).splice(0, 10);
  message.lineReply(embed.setDescription(`\n${listedMembers.join("\n") || "Sunucuda Hiç Bir Kimse Kayıt Olmamıştır!"}`));
  }
};
exports.conf = {
    name: "topteyit",
    aliases: ["top-teyit", 'teyit-top',"kayıt-top","kayıttop"],
    usage: "topteyit",
    description: "Top teyit istatistikleri."
};