const { canModifyQueue } = require('../util/music-modify')
const { MessageEmbed } = require('discord.js')
const { empty } = require('../config.json')

module.exports = {
	name: 'join',
	aliases: ['j'],
	description: 'Join your voice channel',
	async execute(message, args) {
		
		const queue = message.client.queue.get(message.guild.id)
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
		if (!channel) return message.channel.send('<:attention:872878815523799040> **'+message.author.username+'** you must be in a voice channel to use this command!')
		
		if (queue && queue.channel.members.length !== 0) return message.channel.send('<:attention:872878815523799040> **'+message.author.username+'** I am sorry there is some one using me in (**#'+channel.name+'**)')
		
		const permissions = channel.permissionsFor(message.client.user)
		if (!permissions.has('CONNECT')) return message.channel.send('**'+message.author.username+'** I must have connect permission <:wut_:688867208402829333>')
		if (!permissions.has('SPEAK')) return message.channel.send('**'+message.author.username+'** I must have speak permission <:wut_:688867208402829333>')
		
		channel.join().then(connection => {
			connection.voice.setSelfDeaf(true)
		})
		message.channel.send('<:twitter:872911855822209085> **'+message.author.username+'** I have just connected successfully to (**#'+channel.name+'**)')
	}
}
