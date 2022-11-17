const {MessageButton, MessageActionRow} = require('discord-buttons')

exports.execute = async (client, message, args) => {
        if(message.author.id !== "728161454288535604") return;
     
        let button_1 = new MessageButton().setStyle('gray').setLabel(`1`).setID('x1')
        let button_2 = new MessageButton().setStyle('gray').setLabel(`2`).setID('x2') 
        let button_3 = new MessageButton().setStyle('gray').setLabel(`3`).setID('x3')
        let button_4 = new MessageButton().setStyle('gray').setLabel(`4`).setID('x4') 
        let button_5 = new MessageButton().setStyle('gray').setLabel(`5`).setID('x5')

        let row = new MessageActionRow().addComponents(button_1, button_2, button_3, button_4, button_5)
message.channel.send(`
1 : \`Sunucu profilini görüntüleyin.\`
2 : \`Veritabanındaki isim geçmişinizi görüntüleyin.\`
3 : \`Sunucu istatistiklerinizi görüntüleyin.\`
4 : \`Sunucudaki davet bilgilerinizi görüntüleyin.\`
5 : \`Sunucu içerisindeki ceza-i işlemlerinizi görüntüleyin(sicil).\`
`, { components :[row]})
}
exports.conf = {
  command: "kpanelkurulum", // Asıl komutumuz
  description: "Belirtilen kişiyi erkek olarak kayıt eder", // Komut açıklamamız
  aliases: [] // Komutumuzun yardımcıları
}