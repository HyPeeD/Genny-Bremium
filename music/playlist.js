const { MessageEmbed } = require('discord.js')
const { play } = require('../include/play')
const { YOUTUBE_API_KEY, MAX_PLAYLIST_SIZE } = require('../config.json')
const YouTubeAPI = require('simple-youtube-api')
const youtube = new YouTubeAPI(YOUTUBE_API_KEY)

var { getData, getPreview } = require('spotify-url-info')
const { getAudioDurationInSeconds } = require('get-audio-duration')

module.exports = {
	name: 'playlist',
	cooldown: 3,
	aliases: ['pl'],
	description: 'Play a playlist from youtube',
	async execute(message, args, client) {
		const { PRUNING } = require('../config.json')
		const { channel } = message.member.voice

		const serverQueue = message.client.queue.get(message.guild.id)
		if (serverQueue && channel !== message.guild.me.voice.channel) return message.channel.send(':no_entry_sign: You must be listening in **'+message.guild.me.voice.channel.name+'** to use that!').catch(console.error)
		let demo = new MessageEmbed()
        .setAuthor(message.client.user.username, message.client.user.avatarURL(), 'https://youtube.com/')
        .addField('!!play', 'Plays a track. A range of sites are supported.\n\n Examples:\n`!!play Y2K, bbno$ - Lalala` - Searches youtube for \'marble soda\'\n`!!play https://soundcloud.com/billieeilish/bad-guy` - Plays a soundcloud track, using the direct URL\n`!!play https://www.youtube.com/watch?v=XbGs_qK2PQA` - Plays a youtube video, using the direct URL')
		.addField('Usage', '`!!play <track>`', true)
        .addField(message.client.user.username, 'in service :v::skin-tone-1:', true)
        .setColor('#2f3136')
		if (!args.length) return message.channel.send(demo)
		if (!channel) return message.channel.send(':no_entry_sign: You must be listening in a voice channel to use that!')

		const permissions = channel.permissionsFor(message.client.user)
		if (!permissions.has('CONNECT')) return message.channel.send('**'+message.author.username+'**, please make sure i can connect to this voice channel!')
		if (!permissions.has('SPEAK')) return message.channel.send('**'+message.author.username+'**, please make sure i can speak in this voice channel!')
    
		const search = args.join(' ')
		const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi
		const url = args[0]
		const urlValid = pattern.test(args[0])

		const queueConstruct = {
			textChannel: message.channel,
			channel,
			connection: null,
			songs: [],
			loop: false,
			volume: 100,
			playing: true
		}

		let song = null
		let playlist = null
		let videos = []

		if (search.includes('soundcloud')) return message.channel.send('**'+message.author.username+'**, sorry but soundcloud not supported yet!') 
		if (search.includes('spotify') && search.includes('playlist')) return message.channel.send('**'+message.author.username+'**, sorry but spotify playlist not supported yet!')
		if (urlValid) {
			try {
				playlist = await youtube.getPlaylist(url, { part: 'snippet' })
				videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: 'snippet' })
			} catch (error) {
				return message.channel.send('**'+message.author.username+'**, playlist not found! please try again!')
			}
		} else {
			try {
				const results = await youtube.searchPlaylists(search, 1, { part: 'snippet' })
				playlist = results[0]
				videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: 'snippet' })
			} catch (error) {
				return message.channel.send('**'+message.author.username+'**, playlist not found! please try again!')
			}
		}

		videos.forEach((video) => {
			song = {
				title: video.title,
				url: video.url,
				duration: video.durationSeconds
			}

			if (serverQueue) {
				serverQueue.songs.push(song)
			} else {
				queueConstruct.songs.push(song)
			}
		})

		let playlistEmbed = new MessageEmbed()
		.setTitle(`${playlist.title}`)
		.setURL(playlist.url)
		.setColor('#2f3136')
		.setFooter(message.author.username, message.author.avatarURL({ dynamic: true }))
		.setTimestamp()

		playlistEmbed.setDescription(queueConstruct.songs.map((song, index) => `**${index + 1}**. ${song.title}`))
		if (playlistEmbed.description.length >= 2048) playlistEmbed.description = playlistEmbed.description.substr(0, 2007) + '\nPlaylist larger than character limit...'
		.setImage(playlistEmbed.description.length > 130 ? '' : 'https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')

		message.channel.send({ embed: playlistEmbed })

		if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct)

		if (!serverQueue) {
			try {
				queueConstruct.connection = await channel.join()
				await queueConstruct.connection.voice.setSelfDeaf(true)
				play(queueConstruct.songs[0], message)
			} catch (error) {
				console.error(error)
				message.client.queue.delete(message.guild.id)
				return message.channel.send('<:service:872512824923013190> **'+message.author.username+'**, sorry there was an error..')
			}
		}
	}
}