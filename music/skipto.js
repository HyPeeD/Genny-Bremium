const { canModifyQueue } = require('../util/music-modify')

module.exports = {
	name: 'skipto',
	aliases: ['st'],
	description: 'Skip to the selected queue number',
	execute(message, args) {

		const queue = message.client.queue.get(message.guild.id)
		if (!queue) return message.channel.send('**'+message.author.username+'**, sorry no songs playing in this server!')
		if (!canModifyQueue(message.member, message.channel)) return
		if (!args.length) return message.channel.send('**'+message.author.username+'**, the number **must** be between (\`1\`) and (\`'+queue.songs.length+'\`)')
		if (isNaN(args[0])) return message.channel.send('**'+message.author.username+'**, the number **must** be between (\`1\`) and (\`'+queue.songs.length+'\`)')

		if (args[0] > queue.songs.length) return message.reply(`**${message.author.username},** The queue has only ${queue.songs.length} item songs long!`)

		queue.playing = true
		if (queue.loop) {
			for (let i = 0; i < args[0] - 2; i++) {
				queue.songs.push(queue.songs.shift())
			}
		} else {
			queue.songs = queue.songs.slice(args[0] - 2)
		}
		queue.connection.dispatcher.end()
		queue.textChannel.send(`<:skip:872878810343813212> **${message.author.username},** skipped ${args[0] - 1} songs`)
	}
}
