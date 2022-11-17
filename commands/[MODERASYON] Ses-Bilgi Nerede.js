const Discord = require("discord.js");
const db = require("quick.db");

exports.execute = async (client, message, args) => {
    let arr = await  db.get(`botkomutrole_${message.guild.id}`) || []
    if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) return;
    {
  

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!user) return client.yolla("Ses bilgisine bakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene!", message.author, message.channel)
        if (!user.voice.channel) return client.yolla("<@" + user.id + "> bir ses kanalına bağlı değil.", message.author, message.channel)
        let mic = user.voice.selfMute == true ? "Kapalı" : "Açık"
        let hop = user.voice.selfDeaf == true ? "Kapalı" : "Açık"
        let süresi = client.channelTime.get(user.id)
        await client.yolla(`${user} kişisi <#${user.voice.channel.id}> kanalında. **Mikrofonu: ${mic}, Kulaklığı: ${hop}**
Kanala gitmek için [tıklaman](${await user.voice.channel.createInvite({maxAge: 10 * 60 * 1000, maxUses: 1 },)}) yeterli 
${süresi ? `\`\`\`Aktif Bilgiler:\`\`\`
<#${user.voice.channel.id}> kanalına \`${await client.turkishDate(Date.now() - süresi.time)}\` önce giriş yapmış.` : ""}`, message.author, message.channel)
}

}
exports.conf = {
    command: "n",
    aliases: ["nerede"]
} 

