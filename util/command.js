const { prefix, database1, database2 } = require('../config.json')
const mongo = require('./mongo')
let imagesarray = ['pixelate', 'shit', 'spank', 'egg', 'lilguy', 'gay', 'trigger', 'wasted', 'invert', 'retarded', 'kitchen', 'kozintk', 'kozintek', 'kozina', 'dogmeme', 'kalb', 'klb', 'dog', 'failure', 'looser', 'trash', 'ship', 'gmagik', 'magikgif', 'magik', 'deepfry', 'blurpify', 'nekoavatar', 'nav', 'jpeg']
let required = ['kuni', 'trap', 'tits', 'lesbian', 'feet', 'yuri', 'solo', 'keta', 'cum', 'lewd', 'nekogif', 'anal', 'blowjob', 'boobs', 'hentai', 'pussy']

module.exports = (client, aliases, callback) => {
	if (typeof aliases === 'string') {
		aliases = [aliases]
	}
	client.on('message', async message => {
		if (message.author.bot) return
		if (message.channel.type === 'dm') return
		
		aliases.forEach(alias => {
			
			const command = prefix+alias.toLowerCase()
			if (message.content.split(' ')[0].toLowerCase() == command) {
				// mongo(database1).then(async mongoose => {
					// mongoose.connection.collection('blacklists').findOne({ [message.author.id+'.id']: message.author.id }, async (error, blacklist) => {
						// if (blacklist == null) blacklist = {}
						// if (blacklist == undefined) blacklist = {}
						
						if (message.client.black.get(message.author.id) && command !== prefix+'help' && command !== prefix+'bcheck' && command !== prefix+'blacklistcheck') {
							message.channel.send('**'+message.author.username+'** you are not able to use commands any more! because have been blacklisted!')
							return message.channel.send('**'+message.author.username+'** contact **HyPeD#0003** for blacklist appeal!')
						}
						callback(message)
						if (message.author.id !== '458997221170479124') client.channels.cache.get('717763226078543954').send('**'+message.author.tag +'** running **'+command+'** in **('+message.guild.name+')**'+(message.content.split(' ').slice(1).join(' ') ? '\n<:space:817796102761611264>arguments: '+message.content.split(' ').slice(1).join(' ') : ''))
					// })
				// })
			}
		})
		
		if (message.channel.id !== '747840162578432181') return
		const embed = new Discord.MessageEmbed()
		.setAuthor(client.user.username, client.user.avatarURL(), 'https://discord.com/')
		.setColor('BLUE')
		.setDescription(message.content.split(' ').slice(0).join(' '))
		.setFooter(message.author.username, message.author.avatarURL())
		.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
		.setTimestamp()
		let m = await message.channel.send(emb)
		m.react('675727803433615406')
		m.react('675727810484240395')
		message.delete()
	})
}
