const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const moment = require('moment');
const db = require("quick.db");
const qdb = require("quick.db");
exports.execute = async (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
 let embed = new MessageEmbed().setTimestamp().setColor("RANDOM").setFooter(`${client.config.SetFooter}`);
 let arr = await  db.get(`botkomutrole_${message.guild.id}`) || []
 if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {



    if(!member) return message.channel.send(embed.setDescription(`Bir üye belirt.`))
    if (!member.user.username.includes(client.config.Tag)) return message.channel.send(embed.setDescription("Bu üyenin kullanıcı adında tagımız yok."));

    let data = qdb.fetch(`tagverdi.${member.id}`)

    if(data) return message.channel.send(`Bu kişi daha önceden tag almış.`).then(x => x.delete({timeout: 10000}));
        const filter = (reaction, user) => {
            return ["✅"].includes(reaction.emoji.name) && user.id === member.id; 
        };
        message.channel.send(`${member}, ${message.author} tarafından taglı olarak kaydedilecekseniz onaylıyorsan ✅ emojisine basman yeterli olacaktır.`).then(x => {
 x.react("✅");
            x.awaitReactions(filter, {max: 1, time: 15000, error: ['time']}).then(resp => {
                let response = resp.first();
                if (response) {
            qdb.add(`aldı.${message.author.id}.tag`, +1);
            qdb.push(`tagaldı.${message.author.id}`, {
                guildName: `${member}`,
                guildNameid: `${member.id}`,
                Zaman: moment(Date.now()).format("HH:mm:ss DD MM YYYY"),
                Yetkili: message.author.id
            });
            qdb.set(`tagverdi.${member.id}`,true)

            let datas = qdb.get(`aldı.${message.author.id}.tag`)
    
            message.channel.send(embed.setDescription(`Merhaba, ${message.author} başarılı bir şekilde ${member} adlı kullanıcıyı taglı olarak kayıt ettin.\n Toplam ${datas} kişiye tag aldırmışsın.`).setFooter(client.config.SetFooter).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({timeout: 10000}));
            let teyzennabuyo = client.channels.cache.find(a => a.name === "tagaldır-log"); 
            client.channels.cache.get(teyzennabuyo).send(`${message.author} adlı yetkili ${member} adlı kullanıcıyı taglı olarak kayıt etti. ✅`)
        };
    });
        })                
        
        }
        client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.tagaldır\` komutunu kullandı. [\`${message.content}\`]`);

    }

        exports.conf = {
            command: "tagaldır", // Asıl komutumuz
            description: "", // Komut açıklamamız
            aliases: ["tagaldı"],
          }