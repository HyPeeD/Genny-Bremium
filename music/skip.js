const { canModifyQueue } = require('../util/music-modify')

module.exports = {
	name: 'skip',
	aliases: ['s'],
	description: 'Skip the currently playing song',
	execute(message) {
		const queue = message.client.queue.get(message.guild.id)
		if (!queue) return message.channel.send('**'+message.author.username+'**, sorry no songs playing in this server!')
		if (!canModifyQueue(message.member, message.channel)) return

		queue.playing = true
		queue.connection.dispatcher.end()
		queue.textChannel.send('<:skip:872878810343813212> Skipped **'+queue.songs[0].title+'**')
	}
}