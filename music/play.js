const { canModifyQueue } = require('../util/music-modify')
const fetchVideoInfo = require('updated-youtube-info')
const getYouTubeID = require('get-youtube-id')
const { MessageEmbed } = require('discord.js')
const { play } = require('../include/play')
const { empty } = require('../config.json')
const convert = require('hh-mm-ss')
const usetube = require('usetube')
const ytdl = require('ytdl-core')

module.exports = {
	name: 'play',
	cooldown: 3,
	aliases: ['p'],
	description: 'Plays audio from YouTube or Soundcloud',
	async execute(message, args) {
	  
		let eemb = new MessageEmbed()
		.setColor("#2f3136")
		.setDescription('<:protection:872911854391930942> **'+message.author.username+'** sorry **radio** is playing right now! \n <:space:817796102761611264>You have to **stop** it first **before** you use music!')
		.setImage(empty)
		.setTimestamp()
		const isRadio = message.client.radio.get(message.guild.id)
		if (isRadio) {
			if (queue) message.client.queue.delete(message.guild.id)
			return message.channel.send(eemb)
		}
		
		const { channel } = message.member.voice
		const serverQueue = message.client.queue.get(message.guild.id)
		if (!channel) return message.channel.send('<:attention:872878815523799040> **'+message.author.username+'** you must be in a voice channel to use this command!')
			
		if (serverQueue && !canModifyQueue(message.member, message.channel)) return message.channel.send('<:attention:872878815523799040> **'+message.author.username+'** You must be listening in **'+message.guild.me.voice.channel.name+'** to use that!')
		
		let demo = new MessageEmbed()
        .setAuthor(message.client.user.username, message.client.user.avatarURL(), 'https://youtube.com/')
        .addField('!!play', 'Plays a track. A range of sites are supported. \n\n Examples:\n`!!play Y2K, bbno$ - Lalala` - Searches youtube for \'marble soda\'\n`!!play https://soundcloud.com/billieeilish/bad-guy` - Plays a soundcloud track, using the direct URL\n`!!play https://www.youtube.com/watch?v=XbGs_qK2PQA` - Plays a youtube video, using the direct URL')
        .addField('Usage', '`!!play <track>`', true)
        .addField(message.client.user.username, 'in service :v::skin-tone-1:', true)
        .setColor('#2f3136')
		
		if (!message.content.split(' ').slice(1).join(' ')) return message.channel.send(demo)

		const permissions = channel.permissionsFor(message.client.user)
		if (!permissions.has('CONNECT')) return message.channel.send('**'+message.author.username+'** I must have connect permission <:wut_:688867208402829333>')
		if (!permissions.has('SPEAK')) return message.channel.send('**'+message.author.username+'** I must have speak permission <:wut_:688867208402829333>')
    
		const search = args.join(' ')
		if (search.includes('soundcloud')) return message.channel.send('**'+message.author.username+'**, sorry but soundcloud is temporary out of service!')
		if (search.includes('spotify')) return message.channel.send('**'+message.author.username+'**, sorry but spotify is temporary out of service!')
		const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi
		const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi
		const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/
		const url = args[0]
		const urlValid = videoPattern.test(args[0])

		// Start the playlist if playlist url was provided
		if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
			return message.channel.send('**'+message.author.username+'**, sorry but playlists is temporary out of service!')
			// return message.client.commands.get('playlist').execute(message, args)
		}

		let volume = message.client.volum.get(message.guild.id)
		const queueConstruct = {
			textChannel: message.channel,
			channel,
			connection: null,
			songs: [],
			loop: false,
			volume: volume ? volume : 100,
			playing: true
		}

		let songInfo = null
		let song

		if (urlValid) {
			try {
				songInfo = await ytdl.getInfo(url)
				song = {
					title: songInfo.videoDetails.title,
					url: songInfo.videoDetails.video_url,
					duration: songInfo.videoDetails.lengthSeconds
				}
			} catch (error) {
				console.error(error)
				return message.channel.send('**'+message.author.username+'**, there was an error try again please!')
			}
		} else {
			try {
				const results = await usetube.searchVideo(search)
				songInfo = await ytdl.getInfo('http://www.youtube.com/watch?v='+results.videos[0].id)
				song = {
					title: songInfo.videoDetails.title,
					url: songInfo.videoDetails.video_url,
					duration: songInfo.videoDetails.lengthSeconds
				}
			} catch (error) {
				console.error(error)
				return message.channel.send(`**${message.author.username}**, didn't find any thing match **${message.content.split(' ').slice(1).join(' ')}**!`)
			}
		}
		if (serverQueue) {
			let videoInfo = await fetchVideoInfo(getYouTubeID(song.url))
			serverQueue.songs.push(song)
			let hyp = new MessageEmbed()
            .setAuthor('Added to queue', message.guild.iconURL(), 'https://youtube.com/')
			.setTitle(song.title)
			.setURL(song.url)
            .addField('Channel', videoInfo.owner, true)
            .addField('Duration', convert.fromS(videoInfo.duration, 'mm:ss') , true)
            .addField('Published at', videoInfo.datePublished, true)
			.addField('Position in queue', serverQueue.songs.length, true)
            .setColor('#2f3136').setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
			.setThumbnail(videoInfo.thumbnailUrl)
			.setFooter('By '+message.author.username)
			.setTimestamp()
			return serverQueue.textChannel.send(hyp)
		}

		queueConstruct.songs.push(song)
		message.client.queue.set(message.guild.id, queueConstruct)

		try {
			connection = await channel.join()
			queueConstruct.connection.voice.setSelfDeaf(true)
			play(queueConstruct.songs[0], message)
		} catch (error) {
			console.error(error)
			message.client.queue.delete(message.guild.id)
			return message.channel.send('<:service:872512824923013190> **'+message.author.username+'**, sorry there was an error..')
		}
	}
}
