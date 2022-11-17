const qdb = require("quick.db")
const Discord = require("discord.js")


const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require("discord.js");

require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"));

  const parent = await message.guild.channels.create('Developed Logs', { type: 'category' });
  await message.guild.channels.create('cmd-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('afk-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('register-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('karaliste-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('streamer-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('yetki-ver-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('role-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('giris-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('nickname-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('nickname-log-2', { type: 'text', parent: parent.id });
  await message.guild.channels.create('username-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('avatar-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('giris-cikis-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('rol-log-2', { type: 'text', parent: parent.id });
  await message.guild.channels.create('guild-member-add-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('taglı-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('ses-log-plus', { type: 'text', parent: parent.id });
  await message.guild.channels.create('guild-member-add-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('ses-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('ses-log-plus', { type: 'text', parent: parent.id });

  
}


exports.conf = {
  command: "logkur", // Asıl komutumuz
  description: "", // Komut açıklamamız
  aliases: ["logcreate"],
}