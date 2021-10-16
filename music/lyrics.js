const { MessageEmbed } = require('discord.js');
const lyricsFinder = require('lyrics-finder');
var fetchVideoInfo = require('updated-youtube-info');
const getYouTubeID = require('get-youtube-id');

module.exports = {
  name: 'lyrics',
  aliases: ['ly'],
  description: 'Get lyrics for the currently playing song',
  async execute(message, client) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send('**'+message.author.username+'**, sorry no songs playing in this server!')
 
	let lyrics = null;
    try {
		lyrics = await lyricsFinder(queue.songs[0].title, '')
		if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`
    } catch (error) {
		lyrics = `No lyrics found for ${queue.songs[0].title}.`
    }
	
    let lyricsEmbed = new MessageEmbed()
    .setAuthor('Genny Premium', message.client.user.avatarURL(), 'https://youtube.com/')
    .setTitle(queue.songs[0].title)
    .setURL(queue.songs[0].url)
    .setDescription(lyrics)
    .setColor('#2f3136')
    .setFooter(message.author.username, message.author.avatarURL())
    .setTimestamp()

	if (lyricsEmbed.description.length >= 2048) lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`
    return message.channel.send(lyricsEmbed).catch(console.error)
  }
}