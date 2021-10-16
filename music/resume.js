const { canModifyQueue } = require('../util/music-modify')

module.exports = {
	name: 'resume',
	aliases: ['r'],
	description: 'Resume currently playing music',
	execute(message) {
		const queue = message.client.queue.get(message.guild.id)
		if (!queue) return message.channel.send('**'+message.author.username+'**, sorry no songs playing in this server!')
		if (!canModifyQueue(message.member, message.channel)) return

		if (!queue.playing) {
			queue.playing = true
			queue.connection.dispatcher.resume()
			return queue.textChannel.send('<:resume:873242561723121795> Resuming **'+queue.songs[0].title+'**')
		}

		return message.channel.send('**'+message.author.username+'**, queue is not paused. <:drinking:750050072707727371>')
	}
}
