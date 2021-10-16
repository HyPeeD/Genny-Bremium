const { canModifyQueue } = require('../util/music-modify')

module.exports = {
	name: 'remove',
	description: 'Remove song from the queue',
	execute(message, args) {
		const queue = message.client.queue.get(message.guild.id)
		if (!queue) return message.channel.send('**'+message.author.username+'**, sorry no songs playing in this server!')
		if (!canModifyQueue(message.member, message.channel)) return
    
		if (!args.length) return message.channel.send('**'+message.author.username+'** you must have to include an argument (**number from queue**)')
		if (isNaN(args[0])) return message.channel.send('**'+message.author.username+'** you must have to include an argument (**number from queue**)')

		const song = queue.songs.splice(args[0] - 1, 1)
		queue.textChannel.send('**'+message.author.username+'**, removed **'+song[0].title+'** from the queue <:drinking:750050072707727371>')
	}
}
