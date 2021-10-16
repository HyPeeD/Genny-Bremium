const progressbar = require("string-progressbar")
const { MessageEmbed } = require("discord.js")
const { YOUTUBE_API_KEY } = require("../config.json")
var fetchVideoInfo = require('updated-youtube-info')
const smallm = require('short-number')
const YouTubeAPI = require("simple-youtube-api")
const getYouTubeID = require('get-youtube-id')
const youtube = new YouTubeAPI(YOUTUBE_API_KEY)
const convert = require("hh-mm-ss")
require('../util/reply-message')

module.exports = {
	name: "np",
	description: "Show now playing song",
	aliases: ["np"],
	execute(message, client) {
		const queue = message.client.queue.get(message.guild.id)
		if (!queue) return message.channel.send('**'+message.author.username+'**, sorry no songs playing in this server!')
		const song = queue.songs[0]
		const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000
		const left = song.duration - seek
	
		fetchVideoInfo(getYouTubeID(song.url)).then(async function(videoInfo) {
			let nowPlaying = new MessageEmbed()
			.setAuthor("Genny Premium", message.client.user.avatarURL(), "https://youtube.com/")
			.setTitle(song.title)
			.setURL(song.url)
			.addField("\u200b", new Date(seek * 1000).toISOString().substr(11, 8) + " `(" + progressbar.filledBar(song.duration, seek, 20, line = "□□", slider = "■■")[0] + ")` " + (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)), false)
			.addField("Channel", `[**${videoInfo.owner}**](https://youtube.com/channel/${videoInfo.channelId})`, true)
			.addField("Duration", `${convert.fromS(videoInfo.duration, 'mm:ss')} — [**Download MP3**](https://www.flvto.biz/sa/downloads/mp3/yt_${videoInfo.videoId})`, true)
			.addField("Views", smallm(videoInfo.views), true)
			.setFooter(message.author.username, message.author.avatarURL({ dynamic: true }))
			.setImage(videoInfo.thumbnailUrl ? videoInfo.thumbnailUrl : 'https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
			.setColor("#2f3136")
			.setTimestamp()

			if (song.duration > 0) nowPlaying.setFooter("Time Remaining: " + new Date(left * 1000).toISOString().substr(11, 8))
			message.inlineReply(nowPlaying)

		})
	}
}
