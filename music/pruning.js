const fs = require('fs')
const config = require('../config.json')

module.exports = {
	name: 'pruning',
	description: 'Toggle pruning of bot messages',
	async execute(message) {
		config.PRUNING = !config.PRUNING

		let err = await fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
		if (err) {
			return message.channel.send('**'+message.author.username+'**, sorry there was an error!')
		}

		return message.channel.send(':repeat_one: Pruning '+(config.PRUNING ? '**mode** enabled!' : '**mode** disabled!'))
	}
}
