const ytdlDiscord = require("ytdl-core-discord")
const { canModifyQueue } = require("../util/music-modify")

module.exports = {
	async play(song, message) {
		const { PRUNING } = require("../config.json")
		const queue = message.client.queue.get(message.guild.id)

		if (!song) {
			message.client.music.delete(message.guild.id)
			message.client.queue.delete(message.guild.id)
			return queue.textChannel.send(`**<:queue:873258930845933608> Queue concluded.** Have a nice day.`)
		}
		
		queue.textChannel.send(`<:play:873244244528222278> **${message.author.username}** playing **${song.title}** in channel (**${queue.channel.name}**)`)
		let stream = null
		let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus"
		
		message.client.music.set(message.guild.id, {})
		
		try {
			if (song.url.includes("youtube.com")) {
				stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 })
			}
		} catch (error) {
			if (queue) {
				queue.songs.shift()
				module.exports.play(queue.songs[0], message)
			}
			console.error(error)
		}
		
		queue.connection.on('disconnect', () => { 
			if (message.client.music.get(message.guild.id)) message.client.music.delete(message.guild.id)
			message.client.queue.delete(message.guild.id) 
		})
		
		const dispatcher = queue.connection.play(stream, { type: streamType }).on("finish", () => {
			if (queue.loop) {
				// if loop is on, push the song back at the end of the queue
				// so it can repeat endlessly
				let lastSong = queue.songs.shift()
				queue.songs.push(lastSong)
				module.exports.play(queue.songs[0], message)
			} else {
				// Recursively play the next song
				queue.songs.shift()
				module.exports.play(queue.songs[0], message)
			}
		}).on("error", (err) => {
			console.error(err)
			queue.songs.shift()
			module.exports.play(queue.songs[0], message)
		})
		dispatcher.setVolumeLogarithmic(queue.volume / 150)
	}
}