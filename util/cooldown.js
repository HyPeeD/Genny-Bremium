let cooldown = {}
let secondcooldown = {}

module.exports = async (message) => {
	if (message.author.bot) return
	if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'**, sorry i must have send messages permission in this server! (**'+message.guild.name+'**)')
	
	if (cooldown[message.author.id] && cooldown[message.author.id].stop == true) {
		message.channel.send('**'+message.author.username+'**, please slowdown do not spam me!')
		secondcooldown[message.author.id] = {
			stop: true
		}
		setTimeout(() => delete secondcooldown[message.author.id], 4000)
	}
	if (secondcooldown[message.author.id] && secondcooldown[message.author.id].stop == true) return message.client.channels.cache.get('717763226078543954').send('**'+message.author.tag+'** spamming in **('+message.guild.name+')**\n<:space:817796102761611264>spamming - '+message.content.split(' ').slice(0).join(' '))
	cooldown[message.author.id] = {
		stop: true
	}
	setTimeout(() => delete cooldown[message.author.id], 2000)
}