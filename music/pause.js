const { canModifyQueue } = require('../util/music-modify')

module.exports = {
	name: "pause",
	aliases: ["r"],
	description: "Pause the currently playing music",
	execute(message) {
		const queue = message.client.queue.get(message.guild.id)
		if (!queue) return message.channel.send('**'+message.author.username+'**, sorry no songs playing in this server!')
		if (!canModifyQueue(message.member, message.channel)) return

		if (queue.playing) {
			queue.playing = false
			queue.connection.dispatcher.pause(true)
			queue.textChannel.send('<:pause:873241808883294230> Paused **'+queue.songs[0].title+'**')
		}
	}
}
