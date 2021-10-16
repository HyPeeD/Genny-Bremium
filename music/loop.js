const { canModifyQueue } = require('../util/music-modify')

module.exports = {
	name: "loop",
	aliases: ['l'],
	description: "Toggle music loop",
	execute(message) {
		const queue = message.client.queue.get(message.guild.id)
		if (!queue) return message.channel.send('**'+message.author.username+'**, sorry no songs playing in this server!')
		if (!canModifyQueue(message.member, message.channel)) return

		// toggle from false to true and reverse
		queue.loop = !queue.loop
		return queue.textChannel.send('<:repeaat:883727020901679174> '+(queue.loop ? 'Looping **mode** enabled!' : 'Looping **mode** Disabled!'))
	}
}