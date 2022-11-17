const { MessageEmbed, Role } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");

const moment = require("moment");
const kdb = new qdb.table("Kayıt");
require("../ravgarcık.js");

exports.execute = async (client, message, args) => {

//YETKİLİ ROLLER
let embed2 = new MessageEmbed().setColor("RANDOM");


let arr = await  db.get(`registeryrole_${message.guild.id}`) || []
if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
//HINDIRI BINDIRI

    let Tag = client.config.Tag;
    let Tag2 = client.config.Tag2;
    var tarih = [moment().format('DD/MM/YYYY | H:mm:ss')]
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);


    //EMBEDS
    let RegisterLogEmbed = new MessageEmbed().setColor("RANDOM")
    let EksikBilgiEmbed = new MessageEmbed().setColor("RANDOM")
    let RegisterEmbed = new MessageEmbed().setColor("RANDOM")
    let TaglıAlımEmbed = new MessageEmbed().setColor("RANDOM");
    let kadınRol = await db.get(`kadınrole_${message.guild.id}`);
    let taglırol = await db.get(`teamrole_${message.guild.id}`);
    let Unregrole = await db.get(`unregisterrole_${message.guild.id}`);

    if(!user) return message.lineReply("Bir kullanıcı belirt ve tekrar dene.")
    if(user.id === message.author.id) return message.lineReply("Kendine ceza-i işlem uygulayamazsın.")  
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.lineReply("Belirttiğin kullanıcı senle aynı veya üst bir rolde olduğu için işlemi uygulayamadım.")  


     
  
    let isim = args[1];
    let yas = args[2];
    if(!isim) return message.lineReply("Geçerli bir isim belirtmelisin!").then(x => x.delete({timeout: 5000}))
    
        kdb.add(`teyit.${message.author.id}.kiz`, +1);
        qdb.add(`bayanKayit_${message.author.id}`, 1)
        qdb.add(`toplamKayit_${message.author.id}`, 1)
         
        kdb.push(`kullanici.${user.id}.kayıt`, {
            isim: `${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}`,
            yas: yas ? `| ${yas}` : ``,
        rol : "**KADIN**",
        });
        const tag = user.user.username.includes("⦁") ? "⦁" : ("⦁" === "" ?  "⦁" : "⦁");

        let kayıt = kdb.get(`kullanici.${user.id}.kayıt`) || [];
        qdb.add(`marketpuan${message.member.id}`, 20) 
    
        kayıt = kayıt.reverse();
        let isimler = kayıt.length > 0 ? kayıt.map((value, index) => `\`${tag} ${value.isim} ${value.yas}\` (${value.rol})`).join("\n") : "Bu kullanıcı hakkında veri tabanında herhangi bir kayıta rastlanmadı.";
     
        client.channels.cache.find(a => a.name === "register-log").send(`\`[${tarih}]\` ${user}(\`${user.id}\`) adlı kullanıcı ${message.author}(\`${message.author.id}\`) adlı yetkili tarafından **Kadın** Olarak kayıt edildi. `)
    
    
        if(client.config.TagVarYok) {
          
    
        if(user.roles.cache.has(taglırol)) {
            await user.roles.add(kadınRol).catch(e => { });
            await user.roles.remove(Unregrole).catch(e => { }); 
    
            await user.setNickname(`${tag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yas ? ` | ${yas}` : ``}`).catch(e => { });
            
            message.lineReply(RegisterEmbed.setDescription(`
            ${user} kişisi "${tag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yas ? ` | ${yas}` : ``}" ismiyle Kadın olarak kayıt edildi. 
           
            ${client.emojis.cache.find(x => x.name === "ravgar_carpi")}  Kişinin toplamda ${kayıt.length} kayıtı bulundu.
            ${isimler}
            
            Kişinin önceki isimlerine \`.isimler @üye\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.
            `)).then(x => x.delete({timeout: 30000})).catch(e => { });
    
            return message.react(client.emojis.cache.find(x => x.name === "ravgar_yesil"));
        } else {
    
            await user.roles.add(kadınRol).catch(e => { });
            await user.roles.remove(Unregrole).catch(e => { }); 
            await user.setNickname(`${tag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yas ? ` | ${yas}` : ``}`).catch(e => { });
            message.lineReply(RegisterEmbed.setDescription(`
            ${user} kişisi "${tag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yas ? ` | ${yas}` : ``}" ismiyle Kadın olarak kayıt edildi.
           
            ${client.emojis.cache.find(x => x.name === "ravgar_carpi")}  Kişinin toplamda ${kayıt.length} kayıtı bulundu.
            ${isimler}
            
            Kişinin önceki isimlerine \`.isimler @üye\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.
            `)).then(x => x.delete({timeout: 30000})).catch(e => { });
            return message.react(client.emojis.cache.find(x => x.name === "ravgar_yesil"));

            
        } } else {
    
            await user.roles.add(kadınRol).catch(e => { });
            await user.roles.remove(Unregrole).catch(e => { }); 
            await user.setNickname(`${tag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yas ? ` | ${yas}` : ``}`).catch(e => { });
            message.lineReply(RegisterEmbed.setDescription(`
            ${user} kişisi "${tag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yas ? ` | ${yas}` : ``}" ismiyle Kadın olarak kayıt edildi. 
           
            ${client.emojis.cache.find(x => x.name === "ravgar_carpi")}  Kişinin toplamda ${kayıt.length} kayıtı bulundu.
            ${isimler}
            
            Kişinin önceki isimlerine \`.isimler @üye\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.
            `)).then(x => x.delete({timeout: 30000})).catch(e => { });
    
            return message.react(client.emojis.cache.find(x => x.name === "ravgar_yesil"));
            
    
        }


    }
    client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.kadın\` komutunu kullandı. [\`${message.content}\`]`);

}
exports.conf = {
    command: "k", // Asıl komutumuz
    description: "Belirtilen kişiyi erkek olarak kayıt eder", // Komut açıklamamız
    aliases: ["kadın", "kız"] // Komutumuzun yardımcıları
  }