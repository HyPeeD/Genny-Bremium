const { canModifyQueue } = require('../util/music-modify')

module.exports = {
	name: 'shuffle',
	description: 'Shuffle queue',
	execute(message) {
		const queue = message.client.queue.get(message.guild.id)
		if (!queue) return message.channel.send('**'+message.author.username+'**, sorry no songs playing in this server!')
		if (!canModifyQueue(message.member, message.channel)) return

		let songs = queue.songs;
		for (let i = songs.length - 1; i > 1; i--) {
			let j = 1 + Math.floor(Math.random() * i);
			[songs[i], songs[j]] = [songs[j], songs[i]];
		}
		queue.songs = songs
		message.client.queue.set(message.guild.id, queue)
		queue.textChannel.send('🔀 **'+message.author.username+'**, shuffled the queue <:Gennys_love_me:683642974172872734>')
	}
}
