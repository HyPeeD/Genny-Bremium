const { canModifyQueue } = require('../util/music-modify')

module.exports = {
	name: 'volume',
	aliases: ['vol'],
	description: 'Change volume of currently playing music',
	execute(message, args) {
		const queue = message.client.queue.get(message.guild.id)

		if (!queue) return message.channel.send('**'+message.author.username+'**, sorry no songs playing in this server!')
		if (!canModifyQueue(message.member, message.channel)) return
		
		let emote = null
		
		if (!args[0]) return message.channel.send(`<:none:873257085448650812> **${message.author.username}**, current **volume** is (\`${queue.volume}\`)`)
		if (isNaN(args[0])) return message.channel.send('<:attention:872878815523799040> **'+message.author.username+'**, volume **must** be between (\`0\`) and (\`150\`)')
		if (parseInt(args[0]) > 150 || parseInt(args[0]) < 0) return message.channel.send('<:attention:872878815523799040> **'+message.author.username+'**, volume **must** be between (\`0\`) and (\`150\`)')
		
		if (queue.volume > parseInt(args[0])) emote = '<:soundo:872878811115565117>'
		if (queue.volume < parseInt(args[0])) emote = '<:sounds:872878814219370607>'
		if (parseInt(args[0]) == 0) emote = '<:soundd:872911850206011443>'
		queue.textChannel.send((emote == null ? '<:none:873257085448650812>' : emote)+` volume has been **changed** from (\`${queue.volume}\`) to (\`${args}\`)`).then(() => {
			queue.volume = args[0]
			queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 150)
			message.client.queue.set(message.guild.id, queue)
		})
	}
}
