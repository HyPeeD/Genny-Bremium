const { canModifyQueue } = require('../util/music-modify')

module.exports = {
	name: 'stop',
	description: 'Stops the music',
	execute(message) {
		const queue = message.client.queue.get(message.guild.id)
    
		if (!queue) return message.channel.send('**'+message.author.username+'**, sorry no songs playing in this server!')
		if (!canModifyQueue(message.member, message.channel)) return
		
		queue.songs = [];
		queue.connection.dispatcher.end();
		queue.textChannel.send('**'+message.author.username+'** Bot Successfully Disconnected')
	}
}