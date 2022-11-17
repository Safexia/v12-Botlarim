const { MessageEmbed, } = require("discord.js");

exports.execute = async(client, message, args) => {
  if(!message.member.roles.cache.has(client.config.OwnerRole))
  if(!message.member.roles.cache.has(client.config.ÜstYetki))
  if (!message.member.hasPermission("ADMINISTRATOR"))
  if(message.author.id !== client.config.BotOwner) return;

        let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if (!rol) return;

        let rolrenk = `${rol.hexColor}`
        let rolID = `${rol.id}`
        let roluyesayi = `${message.guild.members.cache.filter(s => s.roles.cache.has(rol.id)).size}`
        let rolkisiler = `${message.guild.members.cache.filter(s => s.roles.cache.has(rol.id)).map(x => `${x} - (\`${x.id}\`)`).join("\n")}`

message.lineReply(`
- Roldeki kişi sayısı: \`${roluyesayi}\`

- Roldeki kişiler;
${rolkisiler}
`, {split: true})
};
exports.conf = {
  command: "rol", // Asıl komutumuz
  description: "Belirtilen üyeye kalıcı olarak ban atar", // Komut açıklamamız
  aliases: ["üyeler"] // Komutumuzun yardımcıları
}