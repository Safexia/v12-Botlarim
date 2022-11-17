const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const moment = require("moment");
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  let embed = new MessageEmbed().setThumbnail("https://cdn.discordapp.com/attachments/902231734014320730/910928782095949824/xxxxxx.PNG")

  message.channel.send(embed.setDescription(`
  \`\`\`USER COMMAND'S\`\`\`
  \`.afk\` -> Afk Olmanızı sağlar.
  \`.booster\` -> Sunucuda isim değiştirmenizi sağlar.
  \`avatar || .avatar @user\`-> Belirttiğiniz kullanıcnın profil fotoğrafını atar.
  \`.banner || .banner @user\` ->  Belirttiğiniz kullanıcnın banner'ını atar.
  \`.davetlerim\` -> Sunucudaki davet istatistiklerini gösterir.
  \`\`\`STAFF COMMAND'S\`\`\`
  \`.vmute || .vmute @user/UserID <Süre (10m)> <Sebeb>\` -> Belirttiğiniz kullanıcı ses kanallarında susturur.
  \`.unvmute || .unvmute @user/UserID\` -> Belirttiğiniz kullanıcınun ses kanallarındaki susturmasını kaldırırsınız.
  \`.mute || .mute @user/UserID <Süre (10m)> <Sebeb>\` -> Belirttiğiniz kullanıcı metin kanallarında susturur.
  \`.unmute || .unmute @user/UserID\` -> kullanıcınun metin kanallarındaki susturmasını kaldırırsınız
  \`.jail || .jail @user/UserID <Sebeb>\` -> Belirttiğiniz kullanıcıyı cezalıya atar.
  \`.unjail || .unjail @user/UserID\` -> Belirttiğiniz kullanıcınun cezalısını kaldırırsınız.
  \`.ban || .ban @user/UserID <Sebeb>\` -> Belirttiğiniz kullanıcıyı sunucudan banlar.
  \`.sicil & .cezainfo || .sicil @user/UserID\` -> Belirttiğiniz kullanıcının ceza-i işlemlerine bakarsınız (sicil).
  \`.unban || .unban @user/UserID\` -> Belirttiğiniz kullanıcının banını kaldırırsınız.
  \`.ceza || .ceza <ID>\` -> Belirttiğiniz CezaID'sinin detaylarına bakarsınız.
  \`.cezapuan || .cezapuan @user/UserID\` -> Belirttiğiniz kullanıcının Cezapuanına bakarsınız.
  \`.sil || .sil <Sayı>\` -> Belirttiğiniz Miktar kadar mesaj silersiniz.
  \`.say\` -> Sunucunun istatistiklerine bakarsınız.
  \`.rollog || .rollog @user/UserID\` -> Belirttiğiniz kullanıcının rol işlemlerine bakarsınız.
  \`.üyeler || .üyeler @Role/RoleID\` -> Belirttiğiniz rolün detaylarına bakarsınız.
  \`.yetkiver || .yetkiver @user/userID\` -> Belirttiğiniz kullanıcıya yetki verirsiniz.
  \`\`\`REGİSTER COMMAND'S\`\`\`
  \`.erkek & .e || .erkek @user/userID <İsim> <Yaş>\` -> Belirttiğiniz kullanıcıyı **Erkek** olarak kaydedersiniz.
  \`.kadın & .k || .kadın @user/userID <İsim> <Yaş>\` -> Belirttiğiniz kullanıcıyı **Kadın** olarak kaydedersiniz.
  \`.isim || .isim @user/userID <İsim> <Yaş>\` -> Belirttiğiniz kullanıcının isimini değiştirirsiniz.
  \`.isimler || .isimler @user/userID\` -> Belirttiğiniz kullanıcının geçmiş isimlerine bakarsınız.
  \`.topteyit\` -> Toplam kayıt veri sıralamasını gösterir.
  \`.kayıtsız & .unregister || .kayıtsız @user/userID\` -> Belirttiğiniz kullanıcıyı kayıtsıza atarsınız.
  \`\`\`STAT COMMAND'S\`\`\`
  \`.ystat\` -> Yetkili istatistiklerinizi atar.
  \`.stat\` -> Sunucu istatistiklerinizi atar.
  \`.rolstat\` -> belirttiğiniz rolün istatistiklerini atar.
  `))


};
exports.conf = {
  command: "commands", // Asıl komutumuz
  description: "Sunucuda [AFK] olmanı sağlar. ", // Komut açıklamamız
  aliases: [] // Komutumuzun yardımcıları
};