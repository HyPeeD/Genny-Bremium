const { token, prefix, dblc, dblm, empty, database1, database2 } = require('./config.json')
const { Client, Collection, MessageEmbed, MessageAttachment } = require('discord.js')
const { createCanvas, loadImage } = require('canvas')
const Minesweeper = require('discord.js-minesweeper')
const client = new Client({ disableEveryone: false })
const timereworker = require('./functions/get-time')
const timeparser = require('./functions/timeparser')
const { MessageButton } = require('discord-buttons')
const secparser = require('./functions/secparser')
const { get } = require('request-promise-native')
const waiting = require('./util/cooldown.js')
const command = require('./util/command')
const noAds = require('./util/anti-ads')
const gifencoder = require('gifencoder')
const smallm = require('short-number')
const mongo = require('./util/mongo')
let speed = require('./numbers.json')
const fetch = require('node-fetch')
const pretty = require('pretty-ms')
require('discord-buttons')(client)

client.commands = new Collection()
const webdict = require('webdict')
const ro = require('random-words')
const figlet = require('figlet')
const { join } = require('path')
require('./util/reply-message')
const jimp = require('jimp')
const hypedoo = 'HyPeD#0920'
const sec = require('sec')
const fs = require('fs')
client.queue = new Map()
client.radio = new Map()
client.music = new Map()
client.volum = new Map()
client.paus = new Map()
client.prefix = prefix
let position

for (const file of fs.readdirSync(join(__dirname, 'music')).filter((file) => file.endsWith('.js'))) {
	const command = require(join(__dirname, 'music', `${file}`))
	client.commands.set(command.name, command)
}

let notleveledarray = {}
let mentionsnipes = {}
let commanderwait = {}
let deletesnipes = {}
let leveledarray = {}
let firstvcarray = {}
let firstarray = {}
let editsnipes = {}
let hypedstime = {}
let ratelimitm = {}
let ratelimitd = {}
let penalcool = {}
let smalldown = {}
let hangcool = {}
let Latinise = {}
let mcounter = {}
let pilanty = {}
let clicker = {}
let leveled = []
let sermap = {}
let coinsa = {}
let blakli = {}
let recent = {}
let gotans = {}
let array = []
let setup = {}
let hints = {}
let resp = {}
let temp = {}
let afk = {}
let mpp = {}
let won = {}

let Datie = new Date().toLocaleString('en-US', { 
	timeZone: 'America/New_York', 
	timeZoneName: 'short', 
	weekday: 'short', 
	month: 'long', 
	day: '2-digit', 
	year: 'numeric',
	hour: '2-digit', 
	minute: '2-digit'
})

const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)
let addMoney = (author, amount) => {
	mongo(database1).then(async mongoose => {
		mongoose.connection.collection('profiles').findOne({ [author+'.id']: author }, async (error, profile) => {
			if (profile == null) profile = {}
			if (profile == undefined) profile = {}
      
			if (!profile[author]) return mongoose.connection.collection('profiles').insertOne({ [author]: { credits: amount, id: author } })
			mongoose.connection.collection('profiles').updateOne({ [author+'.id']: author }, { $set: { [author+'.credits']: parseInt(profile[author].credits) + amount } }) 
		})
	})
}
let updateMoney = (author, amount) => {
	mongo(database1).then(async mongoose => {
		mongoose.connection.collection('profiles').findOne({ [author+'.id']: author }, async (error, profile) => {
			if (profile == null) profile = {}
			if (profile == undefined) profile = {}
      
			if (!profile[author]) return mongoose.connection.collection('profiles').insertOne({ [author]: { credits: amount, id: author } })
			mongoose.connection.collection('profiles').updateOne({ [author+'.id']: author }, { $set: { [author+'.credits']: amount } })
		})
	})
}
let removeMoney = (author, amount) => {
	mongo(database1).then(async mongoose => {
		mongoose.connection.collection('profiles').findOne({ [author+'.id']: author }, async (error, profile) => {
			if (profile == null) profile = {}
			if (profile == undefined) profile = {}
      
			if (!profile[author]) return mongoose.connection.collection('profiles').insertOne({ [author]: { credits: amount, id: author } })
			mongoose.connection.collection('profiles').updateOne({ [author+'.id']: author }, { $set: { [author+'.credits']: parseInt(profile[author].credits) - amount } }) 
		})
	})
}


const randomnumber = max => {
	return Math.floor(Math.random() * Math.floor(max))
}


/* ************************************************************************* *\

mongo().then(async mongoose => {
  try {
    # Code here
    # let db = mongoose.connection
    # db.collection('test').insertOne({ HyPeD: 'tester'})
    # console.log(db.collection('test').countDocuments())
    # db.collection('test').deleteMany()
  } finally {
    mongoose.connection.close()
  }
  # function getKeyByValue(object, value) { return Object.keys(object).find(key => object[key].ticket === value) }
})

\* ************************************************************************** */

function roundedImage(img, width, height, radius) {
	// roundedImage(img, 10, 10, 290, 290, 35)
	const canva = createCanvas(width, height)
	const ctx = canva.getContext('2d')
  
	let x = 0
	let y = 0
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + canva.width - radius, y)
    ctx.quadraticCurveTo(x + canva.width, y, x + canva.width, y + radius)
    ctx.lineTo(x + canva.width, y + canva.height - radius)
    ctx.quadraticCurveTo(x + canva.width, y + canva.height, x + canva.width - radius, y + canva.height)
    ctx.lineTo(x + radius, y + canva.height)
    ctx.quadraticCurveTo(x, y + canva.height, x, y + canva.height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
        
    ctx.clip()
    ctx.drawImage(img, x, y, canva.width, canva.height)
    ctx.restore()
	return canva.toBuffer()
}

client.on('ready', function() {
  
	// noAds(client)
	  
	console.log(client.user.username+' ready!')
	client.user.setStatus('online')
	client.user.setActivity('!!help', { type: 'PLAYING' })

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	// ************************************************************************************************ IMAGES ************************************************************************************************  \\
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	let whodidthis = 'whodidthis'
	command(client, whodidthis, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
			if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg whodidthis picture for you..')
		try {
			let image = await jimp.read('https://cdn.glitch.com/a251574f-138b-4148-87c3-6522174a3c0c%2Fwhodidthis.png')
			let avatar = await jimp.read(commander.avatarURL({ dynamic: true, format: 'png' }))
			let outputName = 'whodidthis.png'
			
			avatar.resize(350, 350)
			avatar.composite(image, 0, 0)

			let error, res = await avatar.getBufferAsync(jimp.MIME_PNG)
			await message.channel.send({ files: [{ attachment: res, name: outputName }] })
			return m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})

	let pixelate = 'pixelate'
	command(client, pixelate, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
			if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg pixelate picture for you..')
		try {
			let avatar = await jimp.read(commander.avatarURL({ dynamic: true, format: 'png' }))
			let outputName = 'pixelate.png'

			avatar.resize(400, 400).pixelate(15)

			let error, res = await avatar.getBufferAsync(jimp.MIME_PNG)
			await message.channel.send({ files: [{ attachment: res, name: `pixelate.png` }] })
			return m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let shit = 'shit'
	command(client, shit, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
			if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg shit picture for you..')
		try {
			let shit = await jimp.read(commander.avatarURL({ dynamic: true, format: 'png' }))
			let base = await jimp.read('https://cdn.discordapp.com/attachments/634854460102803456/707948983712088165/shit.png')
			let outputName = 'shit.png'

			shit.resize(80, 80)
		 
			await base.composite(shit, 305, 720)
		 
			let error, res = await base.getBufferAsync(jimp.MIME_PNG)
			await message.channel.send({ files: [{ attachment: res, name: `shit.png` }] })
			return m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let spank = 'spank'
	command(client, spank, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ')[0]) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		else if (!message.mentions.users.first() && message.content.split(' ')[0]) {
			if (isNaN(message.content.split(' ')[0])) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ')[0])) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		}
	  
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg spank picture for you..')
		try {
			let spanker = await jimp.read(message.author.avatarURL({ dynamic: true, format: 'png' }))
			let spankee = await jimp.read(commander.avatarURL({ dynamic: true, format: 'png' }))
			let base = await jimp.read('https://cdn.discordapp.com/attachments/634854460102803456/709110225063379024/spank.png')
			let outputName = 'spank.png'

			spanker.resize(140, 140)
			spankee.resize(120, 120)

			const offset = 30
			base.crop(offset, 0, base.getWidth() - offset, base.getHeight())

			await base.resize(500, 500).composite(spanker, 225, 2.5).composite(spankee, 370, 220)
		  
			let error, res = await base.getBufferAsync(jimp.MIME_PNG)
			await message.channel.send({ files: [{ attachment: res, name: `spank.png` }] })
			m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let egg = 'egg'
	command(client, egg, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
			if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg egg picture for you..')
		let egg = await jimp.read(commander.avatarURL({ dynamic: true, format: 'png' }))
		let base = await jimp.read('https://cdn.glitch.com/917ce752-3821-4b78-b638-13d48f45cfe0%2Fegg.png?v=1584735929753')
		let outputName = 'egg.png'
		try {
			egg.resize(50, 50)
			await base.resize(350, 350).composite(egg, 143, 188)
		  
			let error, res = await base.getBufferAsync(jimp.MIME_PNG)
			await message.channel.send({ files: [{ attachment: res, name: `egg.png` }] })
			return m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let lilguy = 'lilguy'
	command(client, lilguy, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg lilguy picture for you..')
		try {
			let request = message.content.split(' ').slice(1).join(' ')
			if (request.length > 60) return message.channel.send('**'+message.author.username+'** oops text too big. <:oops:765590003694305351>')
			let buffer = await jimp.read('https://i.imgur.com/BIu8Phx.png')
			let font = await jimp.loadFont(jimp.FONT_SANS_16_BLACK)
			buffer.print(font, 125, 505, request)
			buffer.getBuffer(jimp.MIME_PNG, sendBuffer)
			function sendBuffer(err, buff) {
				message.channel.send({ files: [{ attachment: buff, name: `Lilguy.png` }] }).catch(console.error)
				m.delete().catch(e => true)
			}
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..').catch(e => true)
		}
	})
	  
	let gay = 'gay'
	command(client, gay, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
			if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg gay picture for you..')
		try {
			let frontground = await jimp.read('https://cdn.glitch.com/c417d43a-dea9-49f0-b094-d147a801e4f6%2Fgay.png?1524872809053')
			let avatar = await jimp.read(commander.avatarURL({ dynamic: true, format: 'png' }))
			frontground.opacity(0.35)
			frontground.resize(jimp.AUTO, 350)

			avatar.resize(350, 350)
			avatar.composite(frontground, 0, 0)

			avatar.getBuffer(jimp.MIME_PNG, (err, response) => {
				message.channel.send({ files: [{ attachment: response, name: `gay.png` }] })
				m.delete().catch(e => true)
			})
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let trigger = 'trigger'
	command(client, trigger, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating trigger gif picture for you..')
		try {
			let args = message.content.split(' ').slice(1)
			let member = message.mentions.users.first()
			const options = { size: 256,frames: 16 }
			if (member) {
				function getRandomInt(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min
				}
				let avatarurl = member.displayAvatarURL({ dynamic: true, format: 'png' })
				if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => { args.join(' ').includes(x) })) {
					avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
				}
				const base = new jimp(options.size, options.size)
				const avatar = await jimp.read(avatarurl)
				const text = await jimp.read('https://cdn.glitch.com/a7d3b6b8-9b7a-4aab-9ee4-1db0c07ef1eb%2Ftriggered.png?1526842782410')
				const tint = await jimp.read('https://cdn.glitch.com/5fed2789-b430-43c5-bf1b-a8dd32d46b97%2Fred.png?1527082445373')
				avatar.resize(320, 320)
				tint.scaleToFit(base.bitmap.width, base.bitmap.height)
				tint.opacity(0.2)
				text.scaleToFit(280, 60)
				const frames = []
				const buffers = []
				const encoder = new gifencoder(options.size, options.size)
				const stream = encoder.createReadStream()
				let temp

				stream.on('data', async buffer => await buffers.push(buffer))
				stream.on('end', async () => {
					m.delete().catch(e => true)
					return await message.channel.send({ files: [{ name: 'triggered.gif', attachment: Buffer.concat(buffers) }] })
				})
				for (let i = 0; i < options.frames; i++) {
					temp = base.clone()
					if (i === 0) {
						temp.composite(avatar, -16, -16)
					} else {
						temp.composite(avatar, -32 + getRandomInt(-16, 16), -32 + getRandomInt(-16, 16))
					}
					temp.composite(tint, 0, 0)
					if (i === 0) temp.composite(text, -10, 200)
					else temp.composite(text, -12 + getRandomInt(-8, 8), 200 + getRandomInt(-0, 12))
					frames.push(temp.bitmap.data)
				}
				encoder.start()
				encoder.setRepeat(0)
				encoder.setDelay(20)
				for (const frame of frames) {
					encoder.addFrame(frame)
				}
				encoder.finish()
			} else if (!member){
				const options = { size: 256, frames: 16 }

				function getRandomInt(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min
				}
				let avatarurl = message.author.displayAvatarURL({ dynamic: true, format: 'png' })
				if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => {args.join(' ').includes(x) })) {
				  avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
				}
				const base = new jimp(options.size, options.size)
				const avatar = await jimp.read(avatarurl)
				const text = await jimp.read('https://cdn.glitch.com/a7d3b6b8-9b7a-4aab-9ee4-1db0c07ef1eb%2Ftriggered.png?1526842782410')
				const tint = await jimp.read('https://cdn.glitch.com/5fed2789-b430-43c5-bf1b-a8dd32d46b97%2Fred.png?1527082445373')
				avatar.resize(320, 320)
				tint.scaleToFit(base.bitmap.width, base.bitmap.height)
				tint.opacity(0.2)
				text.scaleToFit(280, 60)
				const frames = []
				const buffers = []
				const encoder = new gifencoder(options.size, options.size)
				const stream = encoder.createReadStream()
				let temp

				stream.on('data', async buffer => await buffers.push(buffer))
				stream.on('end', async () => {
					m.delete().catch(e => true)
					return await message.channel.send({ files: [{ name: 'triggered.gif', attachment: Buffer.concat(buffers) }] })
				})
				for (let i = 0; i < options.frames; i++) {
					temp = base.clone()
					if (i === 0) {
						temp.composite(avatar, -16, -16)
					} else {
						temp.composite(avatar,-32 + getRandomInt(-16, 16), -32 + getRandomInt(-16, 16))
					}
					temp.composite(tint, 0, 0)
					if (i === 0) temp.composite(text, -10, 200)
					else temp.composite(text, -12 + getRandomInt(-8, 8), 200 + getRandomInt(-0, 12))
					frames.push(temp.bitmap.data)
				}
				encoder.start()
				encoder.setRepeat(0)
				encoder.setDelay(20)
				for (const frame of frames) {
					encoder.addFrame(frame)
				}
				encoder.finish()
			} else return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let wasted = 'wasted'
	command(client, wasted, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
			if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg wasted picture for you..')
		try {
			let avatar = await jimp.read(commander.displayAvatarURL({ dynamic: true, format: 'png' }))
			let base = await jimp.read('https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039')
			
			avatar.resize(295, 295)
			avatar.greyscale()
			avatar.gaussian(3)
			base.resize(295, 295)
			avatar.composite(base, 4, 0)
			let res = await avatar.getBufferAsync(jimp.MIME_PNG)
			
			message.channel.send({ files: [{ attachment: res, name: `wasted.png` }] })
			m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let invert = 'invert'
	command(client, invert, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ')[0]) {
		  if (isNaN(message.content.split(' ')[0])) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		  if (!client.users.cache.get(message.content.split(' ')[0])) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		}
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg invet picture for you..')
		try {
			jimp.read(commander.displayAvatarURL({ dynamic: true, format: 'png' })).then(buffer => {
				buffer.invert()
				buffer.getBuffer(jimp.MIME_PNG, sendBuffer)
			}).catch(console.error)
			function sendBuffer(err, buff) {
				message.channel.send({ files: [{ attachment: buff, name: `invert.png` }] })
				m.delete().catch(e => true)
			}
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let retarded = 'retarded'
	command(client, retarded, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg retarded picture for you..')
		try {
			var imgPath = 'https://cdn.discordapp.com/attachments/634854460102803456/751210118934167653/dog_template.png'
			var img
			var text = 'text'
			const args = message.content.split(' ')
			if (args.length < 1){
				m.edit('**'+message.author.username+'** please you must complete the command by using an argument!')
				message.channel.stopTyping()
				return
			}
			args.shift()
			text = args.join(' ')

			jimp.read(imgPath).then((image) => {
				img = image
				return jimp.loadFont(jimp.FONT_SANS_32_BLACK)
			}).then((font) => {
				img.print(font, 340, 24, text ? text : message.author.username+' i am cute?!', 250).write('images/img01.png', () => {
					message.channel.send({ files: [{ attachment: 'images/img01.png', name: 'images/retard_dog.png' }] })
					m.delete().catch(e => true)
					message.channel.stopTyping()
				})
			})
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let kitchen = ['kitchen', 'kozintk', 'kozintek', 'kozina']
	command(client, kitchen, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
		  if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		  if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		  }
	  
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg kitchen picture for you..')
		try {
		  const imageURL = 'https://cdn.discordapp.com/attachments/634854460102803456/764179477214396422/Capture_4.JPG'
		  let avatar = await jimp.read(commander.avatarURL({ dynamic: true, format: 'png' }))
		  let base = await jimp.read(imageURL)
		  let outputName = 'kitchen.png'
		  
		  const offset = 30
		  base.crop(offset, 0, base.getWidth() - offset, base.getHeight())

		  avatar.resize(60, 60)
		  avatar.circle()
		  await base.resize(500, 500).composite(avatar, 280, 340)

		  let res = await base.getBufferAsync(jimp.MIME_PNG)
		  await message.channel.send({ files: [{ attachment: res, name: outputName }] })
		  return m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	  let dogmeme = ['dogmeme', 'kalb', 'klb', 'dog']
	command(client, dogmeme, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
			if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
	  
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg dogmeme picture for you..')
		try {
		  const imageURL = 'https://cdn.discordapp.com/attachments/634854460102803456/748185574984253460/115803495_2929015190557556_3706812768475414558_n.jpg'
		  let avatar = await jimp.read(commander.avatarURL({ format: 'png' }))
		  let base = await jimp.read(imageURL)
		  let outputName = 'kalb.png'
		  const offset = 30
	  
		  avatar.resize(60, 60)
		  base.crop(offset, 0, base.getWidth() - offset, base.getHeight())

		  await base.composite(avatar, 35, 65)
		  await base.composite(avatar, 220, 100)

		  let error, res = await base.getBufferAsync(jimp.MIME_PNG)
		  await message.channel.send({ files: [{ name: 'kalb.png', attachment: res }]})
		  return m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let failure = ['failure', 'looser']
	command(client, failure, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
			if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg failure picture for you..')
		try {
			const imageURL = 'https://cdn.discordapp.com/attachments/634854460102803456/710107870733271050/failure.png'
			let avatar = await jimp.read(commander.avatarURL({ format: 'png' }))
			let base = await jimp.read(imageURL)
			let outputName = 'failure.png'

			avatar.resize(215, 215)

			const offset = 30
			base.crop(offset, 0, base.getWidth() - offset, base.getHeight())

			await base.composite(avatar, 143, 525)

			let error, res = await base.getBufferAsync(jimp.MIME_PNG)
			await message.channel.send({ files: [{ name: 'failure.png', attachment: res }]})
			return m.delete()
		} catch (err) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	  })
	  
	let trash = 'trash'
	command(client, trash, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
			if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg trash picture for you..')
		try {
			const options = { url: 'https://nekobot.xyz/api/imagegen?type=trash&url='+commander.displayAvatarURL({ format: 'png' }), json: true }
			let body = await get(options)
			m.delete().catch(e => true)
			message.channel.send({ files: [{ name: 'trash.png', attachment: body.message }] })
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	  })
	  
	let ship = 'ship'
	command(client, ship, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
	  
		const shipped = message.mentions.members.size === 2 ? message.mentions.members.array()[1] : message.member
		const shipper = message.mentions.members.size === 1 || message.mentions.members.size === 2 ? message.mentions.members.array()[0] : message.member
		let args = message.content.split(' ')
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg ship picture for you..')
		let member = message.mentions.users.first()
		if(message.mentions.members.size !== 2) return message.channel.send('**'+message.author.username+'** you have to mention 2 users to be shipped <:cutie:675727723624136715>')
		try {
			const options = { url: 'https://nekobot.xyz/api/imagegen?type=ship&user1='+shipped.user.displayAvatarURL({ dynamic: true, format: 'png' })+'&user2='+shipper.user.displayAvatarURL({ dynamic: true, format: 'png' }), json: true }
			let body = await get(options)
			message.channel.send({ files: [{ name: 'ship.png', attachment: body.message }] })
			m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let gmagik = ['gmagik', 'magikgif']
	command(client, gmagik, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
	  
		let args = message.content.split(' ').slice(1)
		let commander = message.mentions.users.first()
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating magik gif picture you..')
		try {
			if (commander) {
				if (!commander.avatarURL({ dynamic: true }).split('?size=')[0].endsWith('.gif')) return m.edit('<:service:872512824923013190> **'+message.author.username+'** this image is not a gif to use gmagik on it try using **!!magik** for sure result!')
				const options = { url: 'https://nekobot.xyz/api/imagegen?type=magik&image='+commander.displayAvatarURL({ dynamic: true, format: 'png' }), json: true }
		
				let body = await get(options)
				message.channel.send({ files: [{ name: 'gmagik.gif', attachment: body.message }] })
				m.delete().catch(e => true)
			} else {
				message.channel.messages.fetch({ limit: 25 }).then(async messages => {
					const result = messages.filter(m => m.attachments.size)
					if (!result.first()) {
						m.delete().catch(e => true)
						return message.channel.send('Usage \`!!gmagik [image/recent]\`')
					}
					if (!result.first().attachments.first().url.split('?size=')[0].endsWith('.gif')) return m.edit('<:service:872512824923013190> **'+message.author.username+'** this image is not a gif to use gmagik on it try using **!!magik** for sure result!')
					const options = { url: 'https://nekobot.xyz/api/imagegen?type=magik&image='+result.first().attachments.first().url, json: true }
					let body = await get(options)
					message.channel.send({ files: [{ name: 'gmagik.gif', attachment: body.message }] })
					m.delete().catch(e => true)
				})
			}
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let magik = 'magik'
	command(client, magik, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
	  
		let commander = message.mentions.users.first()
		
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg magik picture you..')
		try {
			if (commander) {
				let image = await jimp.read('https://nekobot.xyz/api/imagegen?type=magik&image='+commander.displayAvatarURL({ format: 'png' })+'&raw=1')
				image.resize(200, 200)
				let pic = await image.getBufferAsync(jimp.MIME_PNG)
				message.channel.send({ files: [{ name: 'magik.png', attachment: pic }] })
				m.delete().catch(e => true)
			} else {
				message.channel.messages.fetch({ limit: 25 }).then(async messages => {
					const result = messages.filter(m => m.attachments.size)
					if (!result.first()) {
						m.delete().catch(e => true)
						return message.channel.send('Usage \`!!magik [image/recent]\`')
					}
					let image = await jimp.read(`https://nekobot.xyz/api/imagegen?type=magik&image=${result.first().attachments.first().url.replace('.gif', '.png')}&raw=1`)
					image.resize(200, 200)
					let pic = await image.getBufferAsync(jimp.MIME_PNG)
					message.channel.send({ files: [{ name: 'magik.png', attachment: pic }] })
					m.delete().catch(e => true)
				})
			}
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let deepfry = 'deepfry'
	command(client, deepfry, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
		  if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		  if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg deepfry picture you..')
		try {
			message.channel.send({ files: [{ name: 'deepfry.png', attachment: 'https://nekobot.xyz/api/imagegen?type=deepfry&image='+commander.displayAvatarURL({ format: 'png' })+'&raw=1' }] })
			m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})

	let blurpify = 'blurpify'
	command(client, blurpify, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
			if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg blurpify picture you..')
		try {
			message.channel.send({ files: [{ name: 'blurpify.png', attachment: 'https://nekobot.xyz/api/imagegen?type=blurpify&image='+commander.displayAvatarURL({ format: 'png' })+'&raw=1' }] })
			m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let jpeg = 'jpeg'
	command(client, jpeg, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'** I must have attach files permission')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
			if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg jpeg picture you..')
		try {
			message.channel.send({ files: [{ name: 'jpeg.png', attachment: 'https://nekobot.xyz/api/imagegen?type=jpeg&url='+commander.displayAvatarURL({ dynamic: true, format: 'png' })+'&raw=1' }] })
			m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	let nav = ['nav', 'nekoavatar']
	command(client, nav, async message => {
		await waiting(message)
		const options = { url: 'https://nekos.life/api/v2/img/avatar', json: true }
		let body = await get(options)
		let m = await message.channel.send('<:service:872512824923013190> **'+message.author.username+'** creating jpg nekoavatar picture you..')
		try {
			message.channel.send({ files: [{ name: 'nekoavatar.png', attachment: body.url }] })
			m.delete().catch(e => true)
		} catch (e) {
			await m.edit('<:service:872512824923013190> **'+message.author.username+'** sorry there was an error..')
		}
	})
	  
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	// ************************************************************************************************* MISC *************************************************************************************************  \\
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	let hack = 'hack'
	command(client, hack, async message => {
		await waiting(message)
		const talkedRecently = new Set()
		let args = message.content.split(' ').slice(1)
		let hackUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
		if (!hackUser) return message.channel.send('Woaaah **Slow Down**, who are we hacking?')
		const final_name = hackUser.displayName.slice(0, Math.round(hackUser.displayName.length / 4))

		let replies = ['Send nudes', 'Im gay', 'man i love my mommy', 'i think it\'s smaller than most', 'dont frgt to like and subscrube!!', 'should i shave my neckbeard']
		let result = Math.floor(Math.random() * replies.length)
		const options = { url: 'https://www.passwordrandom.com/query?command=password&format=json&count=1', json: true }
		
		if (talkedRecently.has(message.author.id)) return message.channel.send('**'+message.author.username+'**, please wait a **few secondes** secondes before getting typing this again!')
		
		let body = await get(options)
		message.inlineReply('Hacking: ' + hackUser.displayName + '...').then(function(m) {
			setTimeout(function() {
				m.edit('[▝] finding discord Login')
				setTimeout(function() {
				  m.edit('[▝] Found\n**Email:** `' +final_name +'****@gmail.com`\n**Password:** `' +body.char +'`')
				  setTimeout(function() {
					m.edit('[▝] Fetching dms:')
					setTimeout(function() {
					  m.edit('[▝] **Last DM**: ' + '"'+replies[result]+'"')
					  setTimeout(function() {
						m.edit('[▝] Finding IP address')
						setTimeout(function() {
						  m.edit('[▗] **IP address:** 127.0.0.1')
						  setTimeout(function() {
							m.edit('[▖] Selling data to the Government...')
							setTimeout(function() {
							  m.edit('[▘] Reporting account to discord for breaking TOS...')
							  setTimeout(function() {
								m.edit('[▘] Finished hacking **' + hackUser.displayName + '**')
								setTimeout(function() {
									message.channel.send('**'+message.author.tag+'** the FBI (**Female Body Inspector**) caught you hacking **'+hackUser.  user.username+'**! <:hmmmm:765590001098293248>', { files: [{ attachment: 'https://media.tenor.com/images/1ec1659fd1cdaaf72a9a5fa566f842d6/tenor.gif', name: 'hacked.png' }] })
								}, 1800)
							  }, 1800)
							}, 1800)
						  }, 1800)
						}, 1800)
					  }, 1800)
					}, 1800)
				  }, 1800)
				}, 1800)
			}, 1800)
		})
		talkedRecently.add(message.author.id)
		setTimeout(() => talkedRecently.delete(message.author.id), 6000)
	})

	let chucknorris = ['chucknorris', 'cn']
	command(client, chucknorris, async message => {
		await waiting(message)
		const response = await fetch(`https://api.chucknorris.io/jokes/random`)
		const body = await response.json()
		message.channel.send(body.value)
	})

	let F = ['f']
	command(client, F, async message => {
		await waiting(message)
		if(resp[message.channel.id] && resp[message.channel.id].stop == true) return message.channel.send('**'+message.author.username+'** sorry but you will wait because there a cooldown.')
		if(!message.content.split(' ').slice(1).join(' ')) return message.channel.send('type smth to get respects for it.')
		message.channel.send('Press **F** to pay respects to **'+message.content.split(' ').slice(1).join(' ')+'**')
		const collector = message.channel.createMessageCollector(m => m.content == 'f' || m.content == 'F', { time: 10000 })
		collector.on('collect', m => {
			m.delete().catch(e => true)
			if(resp[m.author.id] && resp[m.author.id].status == true) return
			message.channel.send('× **'+m.author.username+'** paid respects...')
			resp[m.author.id] = {
			  status: true
		}
		collector.on('end', collected => {
		  delete resp[m.author.id]
		})
	  })
	})

	let whois = ['whois', 'user']
	command(client, whois, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		try {
			var commander
			if (message.mentions.members.first()) commander = message.mentions.members.first()
			else if (!message.mentions.members.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.member
			else if (!message.mentions.members.first() && message.content.split(' ').slice(1).join(' ')) {
				if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
				if (!message.guild.members.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
				commander = message.guild.members.cache.get(message.content.split(' ').slice(1).join(' '))
			}

			const badges = commander.user.flags ? commander.user.flags.toArray() : []
			let badges_emotes = ''
			if (badges.includes('DISCORD_EMPLOYEE')) badges_emotes = badges_emotes + '<:Staff:803985380008263702> Discord Staff'
			if (badges.includes('DISCORD_PARTNER')) badges_emotes === '' ? badges_emotes = badges_emotes + '<:partner:803988221670195210> Discord Partner' : badges_emotes = badges_emotes + '\n<:partner:803988221670195210> Discord Partner'
			if (badges.includes('HYPESQUAD_EVENTS')) badges_emotes === '' ? badges_emotes = badges_emotes + '<:HypeSquad:804014674667372555> Discord HypeSquad Events' : badges_emotes = badges_emotes + '\n<:HypeSquad:804014674667372555> Discord HypeSquad Events'
			if (badges.includes('BUGHUNTER_LEVEL_1') || badges.includes('BUGHUNTER_LEVEL_2')) badges_emotes === '' ? badges_emotes = badges_emotes + '<:BugHunter:803950445734789140> Bug Hunter' : badges_emotes = badges_emotes + '\n<:BugHunter:803950445734789140> Bug Hunter'
			if (badges.includes('HOUSE_BRAVERY')) badges_emotes === '' ? badges_emotes = badges_emotes + '<:Discord_bravery:803950623379947560> Discord HypeSquad Bravery' : badges_emotes = badges_emotes + '\n<:Discord_bravery:803950623379947560> Discord HypeSquad Bravery'
			if (badges.includes('HOUSE_BRILLIANCE')) badges_emotes === '' ? badges_emotes = badges_emotes + '<:Discord_brilliance:803950570586767380> Discord HypeSquad Brilliance' : badges_emotes = badges_emotes + '\n<:Discord_brilliance:803950570586767380> Discord HypeSquad Brilliance'
			if (badges.includes('HOUSE_BALANCE')) badges_emotes === '' ? badges_emotes = badges_emotes + '<:Discord_ballance:803950598373769247> Discord HypeSquad Balance' : badges_emotes = badges_emotes + '\n<:Discord_ballance:803950598373769247> Discord HypeSquad Balance'
			if (badges.includes('EARLY_SUPPORTER')) badges_emotes === '' ? badges_emotes = badges_emotes + '<:EarlySupport:803951079737917512> Early Supporter' : badges_emotes = badges_emotes + '\n<:EarlySupport:803951079737917512> Early Supporter'
			if (badges.includes('VERIFIED_DEVELOPER')) badges_emotes === '' ? badges_emotes = badges_emotes + '<:Verified_dev:803950480602169405> Verified Developer' : badges_emotes = badges_emotes + '\n<:Verified_dev:803950480602169405> Verified Developer'
			
			const createAccount = commander.user.createdAt.toUTCString()
			if (badges.length === 0) badges_emotes = 'None'
			let emb = new MessageEmbed()
			emb.setColor('#2f3136')
			emb.setTimestamp()
			emb.setAuthor(commander.user.tag, commander.user.displayAvatarURL({ format: 'png', dynamic: true, }))
			emb.setThumbnail(commander.user.displayAvatarURL({ format: 'png', dynamic: true, }), true)
			emb.addField('Registered', timereworker(createAccount), true)
			emb.addField('Acount age', timeparser(Date.now() - commander.user.createdTimestamp)+' old', false)
			emb.addField('Badges', badges_emotes, false)
			emb.setFooter('ID: ' + commander.id)
			emb.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
			if (commander && commander.joinedAt.toUTCString()) {
				let roles = (commander.roles.cache.size > 10 ? `${commander.roles.cache.sort(function compareNombres(a, b) { return b.position - a.position }).map((r) => r).slice(0, 9).join(', ').replace('@everyone', '')} etc..` : (commander.roles.cache.size == 0) ? `empty..` : `${commander.roles.cache.sort(function compareNombres(a, b) { return b.position - a.position }).map((r) => r).join(' ').replace('@everyone', '')}`)
				emb.addField('Roles ['+(commander.roles.cache.size - 1 || '0')+']', roles !== '' ? roles : 'Only default role!', false)
				emb.addField('On server', secparser(new Date() - commander.joinedAt) +' old', false)
				emb.addField('Highest role', commander.roles.highest.name, true)
				emb.addField('Display color', commander.displayHexColor, true)
				if (commander.voice.channel) emb.addField('Voice', '<#'+commander.voice.channel.id+'>', true)
				emb.addField('Joined', timereworker(commander.joinedAt.toUTCString()), false)
			}
			message.inlineReply(emb)
		} catch (e) {
			console.log(e)
			message.channel.send('**'+message.author.username+'** I am sorry there was an error!')
		}
	})

	let editsnipe = ['editsnipe', 'es']
	command(client, editsnipe, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		if (!editsnipes[message.channel.id]) return message.channel.send('**'+message.author.username+'** no targeted edits in (**#'+message.channel.name+'**)')
		
		let counter = 0
		let maxpage = editsnipes[message.channel.id].length
		let result = editsnipes[message.channel.id][counter]
		let user = client.users.cache.get(result['author'])
		
		const maxright = new MessageButton()
		.setID('maxright')
		.setEmoji('871500410060435507')
		.setStyle('blurple')
		const right = new MessageButton()
		.setID('right')
		.setEmoji('871500441656127508')
		.setStyle('blurple')
		const left = new MessageButton()
		.setID('left')
		.setEmoji('871500441509318656')
		.setStyle('blurple')
		const maxleft = new MessageButton()
		.setID('maxleft')
		.setEmoji('871500441920339998')
		.setStyle('blurple')
		const deletee = new MessageButton()
		.setID('deletee')
		.setEmoji('871500443019247656')
		.setStyle('red')
		
		let emb = new MessageEmbed()
		.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
		.setColor('#2f3136')
		.addField('Old Message', result['oldMsg'])
		.addField('New Message', result['newMsg'])
		.setThumbnail(message.author.avatarURL({ dynamic: true }))
		.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
		.setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
		.setFooter(`Page ${counter + 1}/${maxpage}`)
		.setTimestamp()
		
		if (editsnipes[message.channel.id].length >= 2) {
			let infoo = await message.channel.send({ buttons: [maxleft.setDisabled(true), left.setDisabled(true), right.setDisabled(false), maxright.setDisabled(false), deletee], embed: emb })
			const filter = button => button.clicker.user.id == message.author.id
			const collector = infoo.createButtonCollector(filter, { time: 120000 })
			collector.on('collect', async button => {
				if (button.id === 'maxright') {
					counter = editsnipes[message.channel.id].length - 1
					let resultt = editsnipes[message.channel.id][editsnipes[message.channel.id].length - 1]
					let user = client.users.cache.get(resultt['author'])
					
					emb = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
					.setColor('#2f3136')
					.addField('Old Message', resultt['oldMsg'])
					.addField('New Message', resultt['newMsg'])
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
					.setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
					.setFooter(`Page ${counter + 1}/${maxpage}`)
					.setTimestamp()
					infoo.edit({ buttons: [maxleft.setDisabled(false), left.setDisabled(false), right.setDisabled(true), maxright.setDisabled(true), deletee], embed: emb })
				} else if (button.id === 'maxleft') {
					
					counter = 0
					let resultt = editsnipes[message.channel.id][0]
					let user = client.users.cache.get(resultt['author'])
					
					emb = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
					.setColor('#2f3136')
					.addField('Old Message', resultt['oldMsg'])
					.addField('New Message', resultt['newMsg'])
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
					.setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
					.setFooter(`Page ${counter + 1}/${maxpage}`)
					.setTimestamp()
					infoo.edit({ buttons: [maxleft.setDisabled(true), left.setDisabled(true), right.setDisabled(false), maxright.setDisabled(false), deletee], embed: emb })
				} else if (button.id === 'left') {
					
					counter--
					if (counter <= 0) counter = 0
					let resultt = editsnipes[message.channel.id][counter]
					let user = client.users.cache.get(resultt['author'])
					
					emb = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
					.setColor('#2f3136')
					.addField('Old Message', resultt['oldMsg'])
					.addField('New Message', resultt['newMsg'])
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
					.setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
					.setFooter(`Page ${counter + 1}/${maxpage}`)
					.setTimestamp()
					if (counter <= 0) return infoo.edit({ buttons: [maxleft.setDisabled(true), left.setDisabled(true), right.setDisabled(false), maxright.setDisabled(false), deletee], embed: emb })
					infoo.edit({ buttons: [maxleft.setDisabled(false), left.setDisabled(false), right.setDisabled(false), maxright.setDisabled(false), deletee], embed: emb })
				} else if (button.id === 'right') {
					
					counter++
					if ((counter + 1) >= maxpage) counter = maxpage - 1
					let resultt = editsnipes[message.channel.id][counter]
					let user = client.users.cache.get(resultt['author'])
					
					emb = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
					.setColor('#2f3136')
					.addField('Old Message', resultt['oldMsg'])
					.addField('New Message', resultt['newMsg'])
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
					.setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
					.setFooter(`Page ${counter + 1}/${maxpage}`)
					.setTimestamp()
					if ((counter + 1) >= maxpage) return infoo.edit({ buttons: [maxleft.setDisabled(false), left.setDisabled(false), right.setDisabled(true), maxright.setDisabled(true), deletee], embed: emb })
					infoo.edit({ buttons: [maxleft.setDisabled(false), left.setDisabled(false), right.setDisabled(false), maxright.setDisabled(false), deletee], embed: emb })
				}
				if (button.id === 'deletee') {
					button.message.channel.send('**'+button.clicker.user.username+'** you just stopped buttons listeners!')
					return collector.stop()
				}
			})
			collector.on('end', () => {
				infoo.edit({ buttons: [maxleft.setDisabled(true), left.setDisabled(true), right.setDisabled(true), maxright.setDisabled(true), deletee.setDisabled(true)], embed: emb })
			})
		} else return message.channel.send({ embed: emb })
	})

	let deletesnipe = ['deletesnipe', 'ds']
	command(client, deletesnipe, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		if (!deletesnipes[message.channel.id]) return message.channel.send('**'+message.author.username+'** no targeted deletes in (**#'+message.channel.name+'**)')
		
		let args = message.content.split(' ')
		if (args[1] == 'remove') {
			if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**'+message.author.username+'**, you must have manage messages permission!')
			if (!parseInt(args[2])) return message.channel.send('**'+message.author.username+'**, you must type the delete message number!')
			if ((parseInt(args[2]) - 1) > deletesnipes[message.channel.id].length) return message.channel.send('**'+message.author.username+'**, the delete message number must be equal or less than deletenipes length!')
			if ((parseInt(args[2]) - 1) < 0) return message.channel.send('**'+message.author.username+'**, the delete message number must be upper than zero!')
			deletesnipes[message.channel.id][parseInt(args[2]) - 1] = {
				message: 'Deleted from deletesnipes by '+message.author.username,
				author: deletesnipes[message.channel.id][parseInt(args[2]) - 1].author,
				img: empty
			}
			return message.channel.send('**'+message.author.username+'**, done the deleted message number (**'+args[2]+'**) has been removed from deletesnipes!')
		}
		
		let counter = 0
		let maxpage = deletesnipes[message.channel.id].length
		let result = deletesnipes[message.channel.id][counter]
		let user = client.users.cache.get(result['author'])
		
		const maxright = new MessageButton()
		.setID('maxright')
		.setEmoji('871500410060435507')
		const right = new MessageButton()
		.setID('right')
		.setEmoji('871500441656127508')
		const left = new MessageButton()
		.setID('left')
		.setEmoji('871500441509318656')
		const maxleft = new MessageButton()
		.setID('maxleft')
		.setEmoji('871500441920339998')
		const deletee = new MessageButton()
		.setID('deletee')
		.setEmoji('871500443019247656')
		.setStyle('red')
		
		let emb = new MessageEmbed()
		.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
		.setColor('#2f3136')
		.addField('Deleted Message', (result['message'] == '' ? '\u200b' : result['message']))
		.setThumbnail(message.author.avatarURL({ dynamic: true }))
		.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
		.setImage(result['img'])
		.setFooter(`Page ${counter + 1}/${maxpage}`)
		.setTimestamp()
		
		if (deletesnipes[message.channel.id].length >= 2) {
			let infoo = await message.channel.send({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), right.setStyle('blurple'), maxright.setStyle('blurple'), deletee], embed: emb })
			const filter = button => button.clicker.user.id == message.author.id
			const collector = infoo.createButtonCollector(filter, { time: 120000 })
			collector.on('collect', async button => {
				if (button.id === 'maxright') {
					
					counter = deletesnipes[message.channel.id].length - 1
					let resultt = deletesnipes[message.channel.id][deletesnipes[message.channel.id].length - 1]
					let user = client.users.cache.get(resultt['author'])
					
					emb = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
					.setColor('#2f3136')
					.addField('Deleted Message', (resultt['message'] == '' ? '\u200b' : resultt['message']))
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
					.setImage(resultt['img'])
					.setFooter(`Page ${counter + 1}/${maxpage}`)
					.setTimestamp()
					infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), right.setStyle('blurple').setDisabled(true), maxright.setStyle('blurple').setDisabled(true), deletee], embed: emb })
				} else if (button.id === 'maxleft') {
					
					counter = 0
					let resultt = deletesnipes[message.channel.id][0]
					let user = client.users.cache.get(resultt['author'])
					
					emb = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
					.setColor('#2f3136')
					.addField('Deleted Message', (resultt['message'] == '' ? '\u200b' : resultt['message']))
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
					.setImage(resultt['img'])
					.setFooter(`Page ${counter + 1}/${maxpage}`)
					.setTimestamp()
					infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false), deletee], embed: emb })
				} else if (button.id === 'left') {
					
					counter--
					if (counter <= 0) counter = 0
					let resultt = deletesnipes[message.channel.id][counter]
					let user = client.users.cache.get(resultt['author'])
					
					emb = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
					.setColor('#2f3136')
					.addField('Deleted Message', (resultt['message'] == '' ? '\u200b' : resultt['message']))
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
					.setImage(resultt['img'])
					.setFooter(`Page ${counter + 1}/${maxpage}`)
					.setTimestamp()
					if (counter <= 0) return infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false), deletee], embed: emb })
					infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false), deletee], embed: emb })
				} else if (button.id === 'right') {
					
					counter++
					if ((counter + 1) >= maxpage) counter = maxpage - 1
					let resultt = deletesnipes[message.channel.id][counter]
					let user = client.users.cache.get(resultt['author'])
					
					emb = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
					.setColor('#2f3136')
					.addField('Deleted Message', (resultt['message'] == '' ? '\u200b' : resultt['message']))
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
					.setImage(resultt['img'])
					.setFooter(`Page ${counter + 1}/${maxpage}`)
					.setTimestamp()
					if ((counter + 1) >= maxpage) return infoo.edit({ buttons: [maxleft.setDisabled(false), left.setDisabled(false), right.setDisabled(true), maxright.setStyle('blurple').setDisabled(true), deletee], embed: emb })
					infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false), deletee], embed: emb })
				}
				if (button.id === 'deletee') {
					button.message.channel.send('**'+button.clicker.user.username+'** you just stopped buttons listeners!')
					return collector.stop()
				}
			})
			collector.on('end', () => {
				infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), right.setStyle('blurple').setDisabled(true), maxright.setStyle('blurple').setDisabled(true), deletee.setDisabled(true)], embed: emb })
			})
		} else return message.channel.send({ embed: emb })
	})

	let mentionsnipe = ['mentionsnipe', 'ms']
	command(client, mentionsnipe, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		if (!mentionsnipes[message.author.id]) return message.channel.send('**'+message.author.username+'** no targeted mentions in (**'+message.guild.name+'**)')
		if (!mentionsnipes[message.author.id][message.guild.id]) return message.channel.send('**'+message.author.username+'** no targeted mentions in (**'+message.guild.name+'**)')
		let counter = 0
		let maxpage = mentionsnipes[message.author.id][message.guild.id].length
		let result = mentionsnipes[message.author.id][message.guild.id][counter]
		let user = client.users.cache.get(result['author'])
		let linko = result['url']
		
		const maxright = new MessageButton()
		.setID('maxright')
		.setEmoji('871500410060435507')
		const right = new MessageButton()
		.setID('right')
		.setEmoji('871500441656127508')
		const left = new MessageButton()
		.setID('left')
		.setEmoji('871500441509318656')
		let upto = new MessageButton()
		.setStyle('url')
		.setURL(linko)
		.setEmoji('886279188871528548')
		const maxleft = new MessageButton()
		.setID('maxleft')
		.setEmoji('871500441920339998')
		
		let emb = new MessageEmbed()
		.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
		.setColor('#2f3136')
		.addField('Targeted Mention', result['message'])
		.setThumbnail(message.author.avatarURL({ dynamic: true }))
		.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
		.setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
		.setFooter(`Page ${counter + 1}/${maxpage}`)
		.setTimestamp()
		
		if (mentionsnipes[message.author.id][message.guild.id].length >= 2) {
			let infoo = await message.channel.send({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), upto, right.setStyle('blurple'), maxright.setStyle('blurple')], embed: emb })
			const filter = button => button.clicker.user.id == message.author.id
			const collector = infoo.createButtonCollector(filter, { time: 120000 })
			collector.on('collect', async button => {
				if (button.id === 'maxright') {
					
					counter = mentionsnipes[message.author.id][message.guild.id].length - 1
					let resultt = mentionsnipes[message.author.id][message.guild.id][mentionsnipes[message.author.id][message.guild.id].length - 1]
					let user = client.users.cache.get(resultt['author'])
					
					let linko = resultt['url']
					upto = new MessageButton()
					.setStyle('url')
					.setURL(linko)
					.setEmoji('886279188871528548')
					
					emb = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
					.setColor('#2f3136')
					.addField('Targeted Mention', resultt['message'])
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
					.setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
					.setFooter(`Page ${counter + 1}/${maxpage}`)
					.setTimestamp()
					infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), upto, right.setStyle('blurple').setDisabled(true), maxright.setStyle('blurple').setDisabled(true)], embed: emb })
				} else if (button.id === 'maxleft') {
					
					counter = 0
					let resultt = mentionsnipes[message.author.id][message.guild.id][0]
					let user = client.users.cache.get(resultt['author'])
					
					let linko = resultt['url']
					upto = new MessageButton()
					.setStyle('url')
					.setURL(linko)
					.setEmoji('886279188871528548')
					
					emb = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
					.setColor('#2f3136')
					.addField('Targeted Mention', resultt['message'])
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
					.setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
					.setFooter(`Page ${counter + 1}/${maxpage}`)
					.setTimestamp()
					infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), upto, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: emb })
				} else if (button.id === 'left') {
					
					counter--
					if (counter <= 0) counter = 0
					let resultt = mentionsnipes[message.author.id][message.guild.id][counter]
					let user = client.users.cache.get(resultt['author'])
					
					let linko = resultt['url']
					upto = new MessageButton()
					.setStyle('url')
					.setURL(linko)
					.setEmoji('886279188871528548')
					
					emb = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
					.setColor('#2f3136')
					.addField('Targeted Mention', resultt['message'])
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
					.setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
					.setFooter(`Page ${counter + 1}/${maxpage}`)
					.setTimestamp()
					if (counter <= 0) return infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), upto, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: emb })
					infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), upto, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: emb })
				} else if (button.id === 'right') {
					
					counter++
					if ((counter + 1) >= maxpage) counter = maxpage - 1
					let resultt = mentionsnipes[message.author.id][message.guild.id][counter]
					let user = client.users.cache.get(resultt['author'])
					
					let linko = resultt['url']
					upto = new MessageButton()
					.setStyle('url')
					.setURL(linko)
					.setEmoji('886279188871528548')
					
					emb = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
					.setColor('#2f3136')
					.addField('Targeted Mention', resultt['message'])
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
					.setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
					.setFooter(`Page ${counter + 1}/${maxpage}`)
					.setTimestamp()
					if ((counter + 1) >= maxpage) return infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), upto, right.setStyle('blurple').setDisabled(true), maxright.setStyle('blurple').setDisabled(true)], embed: emb })
					infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), upto, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: emb })
				}
			})
			collector.on('end', () => {
				infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), upto, right.setStyle('blurple').setDisabled(true), maxright.setStyle('blurple').setDisabled(true)], embed: emb })
			})
		} else return message.channel.send({ embed: emb, buttons: [upto] })
	})

	let marry = ['marry', 'marriage']
	command(client, marry, async message => {
		await waiting(message)
		let author = message.author.id
		let proposed = message.mentions.users.first()
		
		if (proposed && proposed.id === client.user.id) return message.channel.send(`**${message.author.username}**, nooo Don't touch me!!!`)
		if (proposed && proposed.bot) return message.channel.send('**'+message.author.username+'** rudee!!! don\'t propose again to a BOT... <:scaaared:750050074968719411>')
		if (proposed && proposed.id === author) return message.channel.send('**'+message.author.username+'** sorry to see you alone... <:scared:750050067032834097>')
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('marry-couples').findOne({ [author+'.id']: author }, async (error, marry) => {
				if (marry == null) marry = {}
				if (marry == undefined) marry = {}
			
				const showtime = new MessageButton()
				.setLabel('Show Time')
				.setID('show time')
				.setStyle('green')
				.setEmoji('873247210412834886')
		  
				let notmarried = new MessageEmbed()
				.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
				.setDescription(`Hey **[${message.author.username}](https://discord.gg/gWw6zBm79J)** if you want to be **married** follow the **line** under!
				<:reply:880430755338149899> You have to **propose** for someone\'s hand and **wait** to be accepted!`)
				.setColor('#2f3136')
				.setThumbnail('https://cdn.discordapp.com/emojis/867371656598257685.png?v=1')
			
				if (!proposed && !marry[author]) return message.inlineReply(notmarried)
				if (!proposed && marry[author]) {
					let user = await client.users.fetch(marry[author].marry)
					
					let married = new MessageEmbed()
					.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
					.setDescription(`<a:Heart:678372637231284234> Hey **[${message.author.username}](https://discord.gg/gWw6zBm79J)** look at **line** under for information!
					<:space:817796102761611264> <:reply:880430755338149899> Married with **${user.username}** and **(wish you stay together 4 ever)**!`)
					.setColor('#2f3136')
					.setThumbnail('https://cdn.discordapp.com/emojis/867371656598257685.png?v=1')
			
					return message.channel.send({ embed: married, buttons: [showtime] })
				} else if (proposed && marry[author]) {
					let user = await client.users.fetch(marry[author].marry)
			
					let alreadymarried = new MessageEmbed()
					.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
					.setDescription(`<a:Heart:678372637231284234> Hey **[${message.author.username}](https://discord.gg/gWw6zBm79J)** look at **line** under for information!
					<:space:817796102761611264> <:reply:880430755338149899> You are already married to **${user.username}** <:cuteee:817793001681584138>!`)
					.setColor('#2f3136')
					.setThumbnail('https://cdn.discordapp.com/emojis/867371656598257685.png?v=1')
			
					if (marry[author].marry == proposed.id) return message.channel.send({ embed: alreadymarried, buttons: [showtime] })
					return message.channel.send('**'+message.author.username+'** are you cheating on **' + user.username + '**??! I will tell him/her <:scaaared:750050074968719411>')
				}
				mongoose.connection.collection('marry-couples').findOne({ [proposed.id+'.id']: proposed.id }, async (error, pmarry) => {
					if (pmarry == null) pmarry = {}
					if (pmarry == undefined) pmarry = {}
			
					if (proposed && pmarry[proposed.id]) {
						let userr = await client.users.fetch(pmarry[proposed.id].marry)
						return message.channel.send('**'+message.author.username+'** Sorry **'+proposed.username+'** is already married to **'+userr.username+'** <:cutie:675727723624136715>')
					}
		  
					if (recent[message.author.id] && recent[message.author.id].status == true) return message.channel.send('<:watchs:872878816706568222> **'+message.author.username+'** you have already a proposal please wait for response!')
					else if (recent[proposed.id] && recent[proposed.id].status == true) return message.channel.send('<:watchs:872878816706568222> **'+message.author.username+'** I\'m sorry but **'+proposed.username+'** you have already a proposal please wait for response!')
					else {
						recent[message.author.id] = {
							status: true
						}
						recent[proposed.id] = {
							status: true
						}

						const declinemarry = new MessageButton()
						.setLabel('Decline')
						.setID('declinemarry')
						.setStyle('red')
						const acceptmarry = new MessageButton()
						.setLabel('Accept')
						.setID('acceptmarry')
						.setStyle('green')
						const letmethink = new MessageButton()
						.setLabel('Give me time!')
						.setID('letmethink')
						.setStyle('blurple')
						
						let sendmarry = new MessageEmbed()
						.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
						.setDescription(`<:ringo:867371656598257685> Hey **[${message.author.username}](https://discord.gg/gWw6zBm79J)** you just proposed to **${proposed.username}**!
						<:space:817796102761611264> <:reply:880430755338149899> You have **120** seconds to click in **Accept** or **Decline**!`)
						.setColor('#2f3136')
						.setThumbnail('https://cdn.discordapp.com/emojis/867371656598257685.png?v=1')
				
						let m = await message.channel.send({ embed: sendmarry, buttons: [acceptmarry, declinemarry, letmethink] })
						const filter = me => me.clicker.user.id == proposed.id
						const collector = m.createButtonCollector(filter, { time: 120000 })
						
						collector.on('collect', async button => {
							if (button.id === 'acceptmarry') {
								mongoose.connection.collection('marry-couples').insertMany([{ [message.author.id]: { marry: proposed.id, times: Datie, id: message.author.id } }, { [proposed.id]: { marry: message.author.id, times: Datie, id: proposed.id } }])
								collector.stop()
								
								return message.channel.send('<a:Heart:678372637231284234> **Happily married** \n Congratulations, **' +message.author.username +'** and **' +proposed.username +'** are now bound by marriage!')
							} else if (button.id === 'declinemarry') {
								collector.stop()
								
								return message.channel.send('**' +message.author.tag +'** your proposal has been declined... <:cutie:675727723624136715>')
							} else if (button.id === 'letmethink') {
								collector.stop()
								
								return message.channel.send('**'+message.author.username+'** so you have to let **' +proposed.tag +'** think about you proposal! give her/he more time!')
							}
						})

						collector.on('end', collected => {
							delete recent[message.author.id]
							delete recent[proposed.id]
							m.edit({ embed: sendmarry, buttons: [acceptmarry.setDisabled(true), declinemarry.setDisabled(true), letmethink.setDisabled(true)] })
						})
					}
				})
			})
		})
	})

	let divorce = ['divorce']
	command(client, divorce, async message => {
		await waiting(message)
		let proposed = message.mentions.members.first()
		let args = message.content.split(' ').slice(1)
		let author = message.author.id
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('marry-couples').findOne({ [author+'.id']: author }, async (error, marry) => {
				if (marry == null) marry = {}
				if (marry == undefined) marry = {}
				
				if (marry[message.author.id]) {
					let user = await client.users.fetch(marry[message.author.id].marry)
			
					const declinedivorce = new MessageButton()
					.setLabel('Decline')
					.setID('declinedivorce')
					.setStyle('green')
					const acceptdivorce = new MessageButton()
					.setLabel('Accept')
					.setID('acceptdivorce')
					.setStyle('red')
			
					let senddivorce = new MessageEmbed()
					.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
					.setDescription(`<:cuteee:817793001681584138> Hey **[${message.author.username}](https://discord.gg/gWw6zBm79J)** you really want to divorce **${user.username}**?!
					<:space:817796102761611264> <:reply:880430755338149899> You have **120** seconds to click in **Accept** or **Decline**!`)
					.setColor('#2f3136')
					.setThumbnail('https://cdn.discordapp.com/emojis/817793001681584138.png?v=1')
			
					let divorced = new MessageEmbed()
					.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
					.setDescription(`<:cuteee:817793001681584138> Hey **[${message.author.username}](https://discord.gg/gWw6zBm79J)** you have just divorced **${user.username}**?!
					<:space:817796102761611264> <:reply:880430755338149899> Congrats! Welcome to the singles clan!`)
					.setColor('#2f3136')
					.setThumbnail('https://cdn.discordapp.com/emojis/817793001681584138.png?v=1')
			
					let decdivorced = new MessageEmbed()
					.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
					.setDescription(`<:cuteee:817793001681584138> Hey **[${message.author.username}](https://discord.gg/gWw6zBm79J)** you have canceled **${user.username}**'s divorce!
					<:space:817796102761611264> <:reply:880430755338149899> You are still **${user.username}**'s companion!`)
					.setColor('#2f3136')
					.setThumbnail('https://cdn.discordapp.com/emojis/817793001681584138.png?v=1')
					
					let m = await message.channel.send({ embed: senddivorce, buttons: [acceptdivorce, declinedivorce] })
					
					const filter = me => me.clicker.user.id == message.author.id
					const collector = m.createButtonCollector(filter, { time: 120000 })
			
					collector.on('collect', async button => {
						if (button.id === 'acceptdivorce') {
							m.inlineReply({ embed: divorced })
							mongoose.connection.collection('marry-couples').deleteOne({ [marry[message.author.id].marry+'.id']: marry[message.author.id].marry })
							mongoose.connection.collection('marry-couples').deleteOne({ [author+'.id']: author })
							
							return collector.stop()
						} else if (button.id === 'declinedivorce') {
							collector.stop()
							
							return m.inlineReply({ embed: decdivorced })
						}
					})
					collector.on('end', collected => {
						m.edit({ embed: new MessageEmbed(m.embeds[0]), buttons: [acceptdivorce.setDisabled(true), declinedivorce.setDisabled(true)] })
					})
				} else {
					let notmarried = new MessageEmbed()
					.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
					.setDescription(`Hey **[${message.author.username}](https://discord.gg/gWw6zBm79J)** if you want to be **married** follow the **line** under!
					<:reply:880430755338149899> You have to **propose** for someone\'s hand and **wait** to be accepted!`)
					.setColor('#2f3136')
					.setThumbnail('https://cdn.discordapp.com/emojis/867371656598257685.png?v=1')
					return message.channel.send({ embed: notmarried })
				} 
			})
		})
	})

	let companion = ['companion', 'marry-info']
	command(client, companion, async message => {
		let proposed = message.mentions.users.first()
		if (proposed && proposed.id === client.user.id) return message.channel.send('**'+message.author.username+'** I am single just do not ask again <:crying:750050074578649220>')
		if (proposed && proposed.bot) return message.channel.send('**'+message.author.username+'** bots doesn\'t has a companion!')
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('marry-couples').findOne({ [(proposed ? proposed.id : message.author.id)+'.id']: (proposed ? proposed.id : message.author.id) }, async (error, marry) => {
				
				if (marry == null) marry = {}
				if (marry == undefined) marry = {}
				
				if (proposed) {
					if (marry[proposed.id] && marry[proposed.id].marry) {
						let married = await client.users.fetch(marry[proposed.id].marry)
						if (!married) return message.channel.send('**'+proposed.username+'** companion is <@'+married+'> since **(' + marry[proposed.id].times + ')**')
						return message.channel.send('**'+proposed.username+'** companion is **'+married.username+'** since **(' + marry[proposed.id].times + ')**')
					} else {
						return message.channel.send('**'+proposed.username+'** not married yet! propose so and be taken <:drinking:750050072707727371>')
					}
				} else {
					if (marry[message.author.id] && marry[message.author.id].marry) {
						let married = await client.users.fetch(marry[message.author.id].marry)
						if (!married) return message.channel.send('**'+message.author.username+'** your companion is <@'+married+'> since **(' + marry[message.author.id].times + ')**')
						return message.channel.send('**'+message.author.username+'** your companion is **'+married.username+'** since **(' + marry[message.author.id].times + ')**')
					} else {
						return message.channel.send('**'+message.author.username+'** you are not married yet! propose for someone or stay single <:drinking:750050072707727371>')
					}
				}	
			})
		})

	})

	let server = ['server', 'serverinfo', 'server-info']
	command(client, server, async message => {
		return message.channel.send('**'+message.author.username+'** this command is out of service!')
		let verifyL = ['None', 'Low', 'Medium', 'Hard', 'Extreme']
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		try {
		let emb = new MessageEmbed()
		.setAuthor(message.author.username, message.author.avatarURL())
		.setColor('BLUE')
		.addField('Owner', `<:crowno:870015623198027806> ${message.guild.owner.user}`, true)
		.addField('Region', `${message.guild.region} `, true)
		.addField('Members',`${message.guild.members.cache.size} `, true)
		.addField('Channels', `<:chat:815583351062003733> ${message.guild.channels.cache.filter(m => m.type === 'text').size} Text <:space:817796102761611264> <:voice_icon:815589543930495006> ${message.guild.channels.cache.filter(m => m.type === 'voice').size} Voice`, false)
		.addField('Verification', `${message.guild.verificationLevel.toLowerCase()} Verification`, false)
		.addField('Roles', `» \`${message.guild.roles.cache.size} Roles\``, false)
		.addField('\u200B', `\u200B`, true)
		.setThumbnail(message.guild.iconURL({ dynamic: true, format: 'png' }))
		.setFooter(client.user.username, client.user.avatarURL())
		.setImage(message.guild.bannerURL({ size: 1024 }) ? message.guild.bannerURL({ size: 1024 }) : 'https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
		.setTimestamp()
		message.inlineReply(emb)
	  } catch (e) {}
	})

	let random = ['random']
	command(client, random, async message => {
		await waiting(message)
		message.channel.send('<@'+message.guild.members.cache.random().id+'> is the random winner :tada:')
	})

	let discrim = ['discrim', 'discriminator']
	command(client, discrim, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		try {
		const tags = []
		client.users.cache.filter(commander => commander.discriminator === `${message.author.discriminator}`).forEach(result => {
		  if (result.bot) return
		  if (result.id == message.author.id) return
		  if (result.size > 10) return
		  tags.push(`${result.tag}`)
		})
			const emb = new MessageEmbed()
			.setAuthor(client.user.username, client.user.avatarURL)
			.setTitle('Here is your discrimnator list')
			.setDescription(`\`\`\`\n ${tags.slice(0, 10).join('\n')}\n\`\`\``)
			.setColor('#2f3136')
			.setTimestamp()
			.setFooter(message.author.username, message.author.avatarURL())
		message.channel.send(emb)
	  } catch (e) {}
	})

	let why = ['why', 'why-question']
	command(client, why, async message => {
		await waiting(message)
		try {
			const options = { url: 'https://nekos.life/api/v2/why', json: true }
			let body = await get(options)
			message.channel.send(body.why)
		} catch (e) {}
	})

	let fact = ['fact', 'random-fact']
	command(client, fact, async message => {
		await waiting(message)
		try {
			const options = { url: 'https://nekos.life/api/v2/fact', json: true }
			let body = await get(options)
			message.channel.send('<:certified:872911986529300560> '+body.fact)
	  } catch (e) {}
	})

	let emotify = 'emotify'
	command(client, emotify, async message => {
		await waiting(message)
		const mapping = { ' ': '   ', '0': ':zero:', '1': ':one:', '2': ':two:', '3': ':three:', '4': ':four:', '5': ':five:', '6': ':six:', '7': ':seven:', '8': ':eight:', '9': ':nine:', '!': ':grey_exclamation:', '?': ':grey_question:', '#': ':hash:', '*': ':asterisk:' }
	  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
		mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`
	  })
	  let args = message.content.split(' ').slice(1)
		if (args.length < 1) return message.reply('**'+message.author.username+'** please provide a valid arguments!')
	  message.channel.send(args.join(' ').split('').map(c => mapping[c] || c).join(' '))
	})

	let meme = 'meme'
	command(client, meme, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let number = Math.floor(Math.random()  * 400)
		if (number > 500) number--
		let emb = new MessageEmbed()
		.setAuthor(client.user.username, client.user.avatarURL() ,'https://discord.gg/gWw6zBm79J')
		.setImage(`https://ctk-api.herokuapp.com/meme/${number}`)
		.setFooter(message.author.username, message.author.avatarURL())
		.setTimestamp()
		.setColor('#2f3136')
		
		message.inlineReply(emb)
	})

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	// ********************************************************************************************** MODERATION **********************************************************************************************  \\
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	let rolecmd = ['role']
	command(client, rolecmd, async message => {
		let args = message.content.split(' ')
		let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
		if (!message.member.hasPermission('MANAGE_ROLES')) return
		if (!member) return message.channel.send('**'+message.author.username+'** you must mention a member in this server!')
		var args2 = message.content.split(' ').slice(2).join(' ').toLowerCase()
		var roleGetted = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args2.toLowerCase())) || message.guild.roles.cache.get(args[2])
		let invalid = []
		let array = []
		if (args2.includes(',') && args2.split(',').length !== 0) {
			for (var rolee of args2.split(',')) {
				var rolee1 = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(rolee.toLowerCase())) || message.guild.roles.cache.get(rolee)
				if (rolee1) return array.push(rolee1)
				invalid.push(rolee)
			}
		}
		if (invalid.length !== 0) message.channel.send('**'+message.author.username+'** those upcoming roles is invalid **"'+invalid.join('**, **')+'"**')
		
		if (array.length !== 0) {
			let roles = []
			array.forEach(rolex => {
				if (rolex.position > message.member.roles.highest.position && message.guild.owner.id !== message.author.id) return
				if (member.roles.cache.get(rolex.id)) {
					member.roles.remove(rolex.id)
					return roles.push('-'+rolex.name)
				}
				member.roles.add(rolex.id)
				roles.push('+'+rolex.name)
			})
			return message.channel.send('**'+message.author.username+'** I have successfully updated **'+member.user.username+'**\'s roles "**'+roles.join(', ')+'**"')
		}
		if (!roleGetted) return message.channel.send('**'+message.author.username+'** please you have to enter a valid role name or id!')
		if (roleGetted.position > message.member.roles.highest.position && message.guild.owner.id !== message.author.id) return message.channel.send('**'+message.author.username+'** you can not give roles highest than yours!')
		if (member.roles.cache.get(roleGetted.id)) {
			member.roles.remove(roleGetted)
			return message.channel.send('**'+message.author.username+'** I have successfully updated **'+member.user.username+'**\'s roles "**-'+roleGetted.name+'**"')
		}
		member.roles.add(roleGetted)
		return message.channel.send('**'+message.author.username+'** I have successfully updated **'+member.user.username+'**\'s roles "**+'+roleGetted.name+'**"')
	})

	let kick = 'kick'
	command(client, kick, async message => {
		if (!message.member.hasPermission('KICK_MEMBERS')) return
		let reason = message.content.split(' ').slice(2).join(' ')
		const u = message.guild.me
		let args = message.content.split(' ')
		const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args.slice(1).join(' ')))
		if (!args.slice(1).join(' ')) return message.channel.send('**'+message.author.username+'** Woaaah **Slow Down**, who are we kicking >:3')
		if (!member) return message.channel.send(`**${message.author.username}** couldn't find **${args.slice(1).join(' ')}** in discord <:drinking:750050072707727371>`)
		if (message.author.id == member.id) return message.channel.send(`**${message.author.username}**, why do u wanna kick yourself <a:Flyyy:770262976749633576> ?`)
		if (member.id == client.user.id) return message.channel.send(`**${message.author.username}**, okay im gonna leave now <:crying:750050074578649220>`)
		if (message.guild.owner == message.author) {
			member.kick(member, `By: ${message.author.username}`)
			return message.channel.send(`**${message.author.username}** done **${member.user.username}** has been kicked from the server! <a:Flyyy:770262976749633576>`)
		}
		if (member.roles.highest.position > u.roles.highest.position) return message.channel.send('**'+message.author.username+'** I can\'t his highest role is **higher** than me!')
		if (member.roles.highest.position == u.roles.highest.position) return message.channel.send('**'+message.author.username+'** he has my same role :(')
		if (member.roles.highest.position > message.member.roles.highest.position) return message.channel.send('**'+message.author.username+'** his highest role is **higher** than you run!')
		if (member.roles.highest.position == message.member.roles.highest.position) return message.channel.send('**'+message.author.username+'** he has ur same role :(')
	   

		member.kick(member, `By: ${message.author.username}`)
		return message.channel.send(`**${message.author.username}** done **${member.user.username}** has been kicked from the server! <a:Flyyy:770262976749633576>`)
	})


	let ban = 'ban'
	command(client, ban, async message => {
		let args = message.content.split(' ')
		if (!message.member.hasPermission('BAN_MEMBERS') && message.guild.owner !== message.author) return
		let commanded = message.mentions.members.first()
		if (!args.slice(1).join(' ')) return message.channel.send('**'+message.author.username+'** Woaaah **Slow Down**, who are we banning >:3')
		if (commanded) {
			if (message.author.id == commanded.user.id) return message.channel.send(`**${message.author.username}** why do you wanna ban yourself <a:Flyyy:770262976749633576> ?`)
			if (commanded.user.id == client.user.id) return message.channel.send(`**${message.author.username}** okay I am leaving now <:crying:750050074578649220>`)
			
			if (commanded.user.id == message.guild.owner.id) return message.channel.send('**'+message.author.username+'** I can\'t he is server owner!')
			
			if (commanded.roles.highest.position > message.guild.me.roles.highest.position) return message.channel.send('**'+message.author.username+'** I can\'t his highest role is **higher** than me!')
			if (commanded.roles.highest.position == message.guild.me.roles.highest.position) return message.channel.send('**'+message.author.username+'** he has my same role :(')

			if (commanded.roles.highest.position > message.member.roles.highest.position) return message.channel.send('**'+message.author.username+'**, his highest role is **higher** than you run!')
			if (commanded.roles.highest.position == message.member.roles.highest.position) return message.channel.send('**'+message.author.username+'**, he has ur same role :(')

			commanded.ban({ reason: `By: ${message.author.username}` })
			return message.channel.send(`**${message.author.username}** done **${commanded.user.username}** has been banned from the server! <a:Flyyy:770262976749633576>`)
		} else if (!commanded && args.slice(1).join(' ')) {
			try {
				let userr = await client.users.fetch(args.slice(1).join(' '))
				if (!userr) return message.channel.send(`**${message.author.username}** couldn't find **${args.slice(1).join(' ')}** in discord <:drinking:750050072707727371>`)
				
				if (message.author.id == userr.id) return message.channel.send(`**${message.author.username}** why do you wanna ban yourself <a:Flyyy:770262976749633576> ?`)
				if (userr.id == client.user.id) return message.channel.send(`**${message.author.username}** okay I am leaving now <:crying:750050074578649220>`)
				
				if (userr.id == message.guild.owner.id) return message.channel.send('**'+message.author.username+'** I can\'t he is server owner!')
				
				
				if (message.guild.member(userr.id).roles.highest.position > message.guild.me.roles.highest.position) return message.channel.send('**'+message.author.username+'** I can\'t his highest role is **higher** than me!')
				if (message.guild.member(userr.id).roles.highest.position == message.guild.me.roles.highest.position) return message.channel.send('**'+message.author.username+'** he has my same role :(')

				if (message.guild.member(userr.id).roles.highest.position > message.member.roles.highest.position) return message.channel.send('**'+message.author.username+'**, his highest role is **higher** than you run!')
				if (message.guild.member(userr.id).roles.highest.position == message.member.roles.highest.position) return message.channel.send('**'+message.author.username+'**, he has ur same role :(')
				
				message.channel.send(`**${message.author.username}** done **${userr.username}** has been banned from the server! <a:Flyyy:770262976749633576>`)  
				return  message.guild.members.ban(args.slice(1).join(' '))
			} catch (e) {
				return message.channel.send(`**${message.author.username}** couldn't find **${args.slice(1).join(' ')}** in discord <:drinking:750050072707727371>`)
			}
		}
	})

	let slowmode = 'slowmode'
	command(client, slowmode, async message => {
		let args = message.content.split(' ').slice(1).join(' ')
		if (!message.member.hasPermission('MANAGE_CHANNELS')) return
		if (!args || isNaN(args.replace(/s/g, '').replace(/m/g, '').replace(/h/g, ''))) return message.channel.send('**'+message.author.username+'** please provide a valid numbers of slowmode (**1s**, **1m**, **1h**)!')
		let time
		if (args.includes('s')) {
			time = parseInt(args.replace(/s/g, '').replace('-', ''))
			if (parseInt(args.replace(/h/g, '').replace('-', '')) < 0) time = 0
		}
		if (args.includes('m')) time = parseInt(args.replace(/m/g, '').replace('-', '')) * 60
		if (args.includes('h')) {
			time = parseInt(args.replace(/h/g, '').replace('-', '')) * 3600
			if (parseInt(args.replace(/h/g, '').replace('-', '')) > 6) time = 6 * 3600
		}
		if ((args.includes('m') && args.includes('s') || args.includes('s') && args.includes('h') || args.includes('m') && args.includes('h'))  || (!args.includes('m') && !args.includes('s') && !args.includes('h'))) return message.channel.send('**'+message.author.username+'**, please a valid numbers of slowmode (**1s**, **1m**, **1h**)!')
		message.channel.setRateLimitPerUser(time)
		message.channel.send('**'+message.author.username+'**, the **slowmode** has been set to **'+args.replace('s', '** secondes').replace('m', '** minutes').replace('h', '** hours'))
	})

	let unban = 'unban'
	command(client, unban, async message => {
	  
		if (!message.member.hasPermission('BAN_MEMBERS')) return
		let ban = await message.guild.fetchBans()
		let args = message.content.split(' ').slice(1).join(' ')
		try {
			if (!args) return message.channel.send('**'+message.author.username+'** try using valid value <:scared:750050067032834097>')
			if (args === 'all') {
				if (!ban.size) return message.channel.send('**'+message.author.username+'** oops no one banned <:oops:765590003694305351>')
				const ba = ban.array()
				for (let i = 0; i < ba.length; i++) {
					const c = ba[i]
					message.guild.members.unban(c.user)
				}
				return message.channel.send(`**${ban.size || '0'}** member has been unbanned <:scaaared:750050074968719411>`)
			}
			if (isNaN(args)) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			message.guild.members.unban(args).then(m => {
				return message.channel.send(`**${m.username}** has been unbanned <:scaaared:750050074968719411>`)
			}).catch(e => {
				return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			})
		} catch (e) {}
	})

	let move = 'move'
	command(client, move, async message => {
		await waiting(message)
		if (message.content.split(' ').slice(1).join(' ') == 'all') {
			if (!message.member.hasPermission('ADMINISTRATOR')) return
			if(!message.channel.permissionsFor(message.guild.me).has('MOVE_MEMBERS')) return message.channel.send('**'+message.author.username+'** I don\'t have perms <:hmmmm:765590001098293248>')
			if (message.member.voice.channel == null) return message.channel.send(`**${message.author.username}** please be in a voice channel first!`)
			message.guild.members.filter(m => m.voice.channel).forEach(m => {
				m.voice.setChannel(message.member.voice.channel.id)
			})
			return message.channel.send('**'+message.author.username+'** success! all members have been **dragged** to your voice channel!')
		}
	  
		if (!message.member.hasPermission('MOVE_MEMBERS')) return message.channel.send('**'+message.author.username+'** you must have permission for moving members <:hmmmm:765590001098293248>')
		if (message.mentions.users.size === 0) {
			return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		}
		if (message.member.voice.channel == null) return message.channel.send('**'+message.author.username+'** you must be in a voice channel to do move this user!')
		if (message.mentions.members.first().voice.channel == null) return message.channel.send('**'+message.author.username+'** sorry I can\'t because **'+ message.mentions.users.first().username+'** must be in a voice channel!')
		message.guild.members.cache.get(message.mentions.members.first().id).voice.setChannel(message.member.voice.channel.id).then(m => { return message.channel.send(`**${message.mentions.members.first().displayName}** has been moved to **${message.member.voice.channel.name}** <:looking:765589994479157248>`) })
	})

	let purge = ['purge', 'clear', 'prune', 'clean']
	command(client, purge, async message => {
		await waiting(message)
		if (!message.member.hasPermission('ADMINISTRATOR')) return
		await message.delete().catch(e => true)
		const user = message.mentions.users.first()
		const amount = !!parseInt(message.content.split(' ').slice(1)[0]) ? parseInt(message.content.split(' ').slice(1)[0]) : parseInt(message.content.split(' ').slice(1)[1])
		if (!amount) return message.channel.send('**'+message.author.username+'** please use an limit of messages!')
		if (!amount && !user) message.channel.send('**'+message.author.username+'** please use an limit of messages!')
		message.channel.messages.fetch({ limit: amount }).then(messages => {
			if (user) {
				const filterBy = user ? user.id : message.user.id
				messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount)
			}
			message.channel.bulkDelete(messages)
		})
	})

	let roleinfo = ['role-info', 'r-info']
	command(client, roleinfo, async message => {
		await waiting(message)
		if (!message.member.hasPermission('MANAGE_ROLES')) return
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let commandd = message.content.split(' ').slice(1).join(' ')
		if (!commandd) return message.channel.send(`**${message.author.username}**, please try use valid role name or id!`)
		let role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(commandd.toLowerCase())) || message.guild.roles.cache.get(commandd)
		if (!role) return message.channel.send('**'+message.author.username+'**, sorry can\'t find this role!')
		
		
		let emb = new MessageEmbed()
		emb.setColor('#2f3136')
		emb.setTimestamp()
		emb.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, }))
		emb.setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, }) ? message.guild.iconURL({ format: 'png', dynamic: true, }) : message.author.displayAvatarURL({ format: 'png', dynamic: true, }))
		emb.addField('Role', role.name, true)
		emb.addField('Create at', timereworker(role.createdAt.toUTCString()), true)
		emb.addField('Role age', timeparser(Date.now() - role.createdTimestamp)+' old')
		emb.addField('Users ['+(role.members.size || '0')+']', (role.members.size > 10 ? `${role.members.map((r) => r).slice(0, 9).join(', ')} etc..` : (role.members.size < 1) ? `empty..` : role.members.map((r) => r).join(' ')), false)
		emb.setFooter('ID: ' + role.id)
		emb.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
		let secondrole = message.guild.roles.cache.find(r => r.position ==(role.position - 1))
		let thirdrole = message.guild.roles.cache.find(r => r.position == (role.position - 2))
		let fourthrole = message.guild.roles.cache.find(r => r.position == (role.position - 3))
		
		let data = ''
		if (secondrole && !secondrole.name.includes('everyone')) data += '<:space:817796102761611264> <@&'+secondrole.id+'> - position ('+(message.guild.roles.cache.size - secondrole.position)+') \n'
		if (thirdrole && !thirdrole.name.includes('everyone')) data += '<:space:817796102761611264> <@&'+thirdrole.id+'> - position ('+(message.guild.roles.cache.size - thirdrole.position)+') \n'
		if (fourthrole && !fourthrole.name.includes('everyone')) data += '<:space:817796102761611264> <@&'+fourthrole.id+'> - position ('+(message.guild.roles.cache.size - fourthrole.position)+') \n » Those is the roles after \'**'+role.name+'**\' by position <:drinking:750050072707727371>'
		emb.addField('Next roles', data !== '' ? data : '<:space:817796102761611264> » This is the last role by roles positions <:drinking:750050072707727371>', false)
		
		emb.addField('Role position', message.guild.roles.cache.size - role.position, true)
		emb.addField('Role color', role.hexColor, true)
		
		message.inlineReply(emb)
	})

	let lock = 'lock'
	command(client, lock, async message => {
		if (!message.member.hasPermission('MANAGE_CHANNELS')) return
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'**, sorry i must have send messages permission in this server! (**'+message.guild.name+'**)')
		if(!message.channel.permissionsFor(message.guild.me).has('MANAGE_CHANNELS')) return message.channelsend(`**${message.author.username}**, sorry i must gave manage channels perm to do that!`)
		let commandd = message.content.split(' ').slice(1).join(' ')
		let role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(commandd.toLowerCase())) || message.guild.roles.cache.get(commandd)
		message.channel.createOverwrite(role ? role : message.guild.id, {
			SEND_MESSAGES: false
		})
		message.channel.send(`**${message.author.username}**, channel locked <:cutie:675727723624136715>`)
	})

	let unlock = 'unlock'
	command(client, unlock, async message => {
		if (!message.member.hasPermission('MANAGE_CHANNELS')) return
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'** sorry I must have send messages permission in this server! (**'+message.guild.name+'**)')
		if(!message.channel.permissionsFor(message.guild.me).has('MANAGE_CHANNELS')) return message.channelsend(`**${message.author.username}** sorry I must gave manage channels perm to do that!`)
		let commandd = message.content.split(' ').slice(1).join(' ')
		let role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(commandd.toLowerCase())) || message.guild.roles.cache.get(commandd)
		message.channel.createOverwrite(role ? role : message.guild.id, {
			SEND_MESSAGES: null
		})
		message.channel.send(`**${message.author.username}**, channel unlocked <:cutie:675727723624136715>`)
	})

	let roletarget = ['role-target', 'r-target']
	command(client, roletarget, async message => {
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		try {
			if (!message.member.hasPermission ('MANAGE_ROLES'))return
			let commandd = message.content.split(' ').slice(1).join(' ')
			if (!commandd) return message.channel.send(`**${message.author.username}**, please try use valid role name or id!`)
			let role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(commandd.toLowerCase())) || message.guild.roles.cache.get(commandd)
			if (!role) return message.channel.send('**'+message.author.username+'** sorry can\'t find this role!')
			const members = message.guild.members.cache.filter(m => m.roles.cache.get(role.id))
			if (members.size == 0) return message.channel.send('**'+message.author.username+'** no one taking this role at the moment!')
			const emb = new MessageEmbed()
			.setAuthor(message.author.username, message.author.avatarURL(), 'https://discord.gg/gWw6zBm79J')
			.setColor('BLUE')
			.addField('Users ['+(members.size || '0')+']', '» Those are members whose taking this role! \n'+(members.size > 10 ? members.map(m => `<@` + m.user.id + `>`).slice(0, 9).join(', ')+' etc..' : members.map(m => `<@` + m.user.id + `>`).join(', ')), false)
			.setThumbnail(message.author.avatarURL())
			.setFooter(client.user.username, client.user.avatarURL())
			.setTimestamp()
			
			message.inlineReply('**'+message.author.username+'**, taking information for **'+role.name+'**\'s role!').then(m => {
				setTimeout(() => {
					return m.edit(emb)
				}, 1000)
			})
		} catch (e) {}
	})

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	// ************************************************************************************************* FUN. *************************************************************************************************  \\
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	let ball = '8ball'
	command(client, ball, async message => {
		let args = message.content.split(' ').slice(1).join(' ')
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'**, sorry i must have send messages permission in this server! (**'+message.guild.name+'**)')
		if (!args) return message.channel.send('**'+message.author.username+'**, ask me :)')
		let replies = ['Yup.',' No.', ' I dont know.','Maybe.','I think so.','Possibly.','ofc.']
		if (message.author.id == '458997221170479124' && message.content.endsWith('*')) {
			let replies = ['Yup.','ofc.', 'Yep.']
			message.channel.send(`${replies[Math.floor(Math.random() * replies.length)]}`)
		}
		let result = Math.floor(Math.random() * replies.length)
		message.channel.send(`${replies[Math.floor(Math.random() * replies.length)]}`)
	})

	let ascii = 'ascii'
	command(client, ascii, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'**, sorry i must have send messages permission in this server! (**'+message.guild.name+'**)')
		if (!message.channel.guild) return
		let asc = ['fix','perl']
		var argsmessage = message.content.split(' ').slice(1).join(' ')
		if (!argsmessage) return message.channel.send('**'+message.author.username+'** you must inclucde a valid arguments!')
		figlet(argsmessage, function(err, dataed) {
			message.channel.send(`\`\`\`` + asc[Math.floor(Math.random() * asc.length)] + `\n${dataed}\n\`\`\``)
		})
	})

	let howgay = 'howgay'
	command(client, howgay, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'**, sorry I must have send messages permission in this server! (**'+message.guild.name+'**)')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let args = message.content.split(' ').slice(1)
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
		  if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		  if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
	  
		const howgayembed = new MessageEmbed()
		.setTitle(`🏳️‍🌈 How Gay? `)
		.setDescription(`${commander.username} is **` + randomnumber(101) + `**% gay!`)
		.setImage('https://media.tenor.com/images/9baa9cd1467cd8b33a12b353d4392441/tenor.gif')
		
	  message.inlineReply(howgayembed)
	})

	let howsimp = 'howsimp'
	command(client, howsimp, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'** sorry I must have send messages permission in this server! (**'+message.guild.name+'**)')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let args = message.content.split(' ').slice(1)
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
		  if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		  if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		
		const howsimpembed = new MessageEmbed()
		.setTitle(`simp rates machine!`)
		.setDescription(`<a:simp:817793273899778048> ${commander.username} is **` + randomnumber(101) + `**% simp!`)
		.setImage('https://cdn.discordapp.com/attachments/634854460102803456/803627199391203348/ERC_Ra8X0AAWATY.png')
		
	  message.inlineReply(howsimpembed)
	})

	let rate = 'rate'
	command(client, rate, async message => {
		
		let args = message.content.split(' ').slice(1).join(' ')
		let answers = [
			//Postive
			'💯', 'Yes', 'me likey', '👀', '😍😍', 'he\'s cool yea', 'she\'s cool yea', 'uhhhh yes', 'indede', 'would bang', 'my favorite', 'pretty good', 'music to my ears',
			'dreamy', 'Cool', 'at least it\'s not bad', 'not the best but still good', 'AMAZING', 'dude, that\'s like, awesome', `${client.emojis.cache.get('683642973040148520')}`,
			`they're cute ${client.emojis.cache.get('679345557017329664')}`, 'underrated',

			//Negative
			'how about no', 'yeah no', 'needs much improvement', 'barely ok, in short it\'s shit', '💩 basically', 'just horrible', 'never ask me to rate that again', 'overrated',
			'nobody wants to see that', 'i disapprove', 'i\'m not allowed to say', 'that\'s goodn\'t', 'oh no', 'very uhh, how do i say this without sounding rude', 'might as well throw it away'
		]

		let answer = answers[Math.floor(Math.random() * answers.length)]
		
		message.channel.send(answer+' (**'+(!args ? message.author.username : (message.mentions.users.first() ? message.mentions.users.first().username : args))+'**)')
	})

	let minesweeper = 'minesweeper'
	command(client, minesweeper, async message => {
		await waiting(message)
		const args = message.content.split(' ').slice(1)
	  
		const rows = parseInt(args[0])
		const columns = parseInt(args[1])
		const mines = parseInt(args[2])

		if (!rows) return message.channel.send('**'+message.author.username+'**, provide the number of rows!')

		if (!columns) return message.channel.send('**'+message.author.username+'**, provide the number of columns!')

		if (!mines) return message.channel.send('**'+message.author.username+'**, provide the number of mines!')

		const minesweeper = new Minesweeper({ rows, columns, mines })
		const HyPeD = minesweeper.start()

		return HyPeD ? message.inlineReply(HyPeD) : message.channel.send('**'+message.author.username+'**,you provided invalid data!')
	})

	let howlove = 'howlove'
	command(client, howlove, async message => {
		await waiting(message)
		const shipped = message.mentions.members.size === 2 ? message.mentions.members.array()[1] : message.member
		const shipper = message.mentions.members.size === 1 || message.mentions.members.size === 2 ? message.mentions.members.array()[0] : message.member
		if(message.mentions.members.size !== 2) return message.channel.send('**'+message.author.username+'**, you must mention 2 users to rate their loves to each other <:cutie:675727723624136715>')
		const first_length = Math.round(shipper.displayName.length / 2)
		const first_half = shipper.displayName.slice(0, first_length)
		const second_length = Math.round(shipped.displayName.length / 2)
		const second_half = shipped.displayName.slice(second_length)
		const final_name = first_half + second_half
		const score = Math.random() * (0, 100)
		const prog_bar = Math.ceil((Math.round(score) / 100) * 10)
		const counter = '■■'.repeat(prog_bar) + '□□'.repeat(10 - prog_bar)
		message.channel.send({ embed: {
			title: `${shipper.displayName} <a:Heart:678372637231284234> ${shipped.displayName}`,
			description: `**Love r8 machine**\n${counter}  ${prog_bar * 10}%`,
			color: 6192321,
			image: {
				url: empty 
			},
			footer: {
			  icon_url: message.author.displayAvatarURL(),
			  text: `Requested by ${message.author.tag}`
			}
		  }})
	})

	let mixnames = 'mixnames'
	command(client, mixnames, async message => {
		const shipped = message.mentions.members.size === 2 ? message.mentions.members.array()[1] : message.member
		const shipper = message.mentions.members.size === 1 || message.mentions.members.size === 2 ? message.mentions.members.array()[0] : message.member
		if(message.mentions.members.size !== 2) return message.channel.send('**'+message.author.username+'**, you must mention 2 users to rate their loves to each other <:cutie:675727723624136715>')
		const first_length = Math.round(shipper.displayName.length / 2)
		const first_half = shipper.displayName.slice(0, first_length)
		const second_length = Math.round(shipped.displayName.length / 2)
		const second_half = shipped.displayName.slice(second_length)
		const final_name = first_half + second_half
		message.channel.send(`**${message.author.username}**, Here is your mixname : **${final_name}** <:cutie:675727723624136715>`)
	})

	let penis = 'penis'
	command(client, penis, async message => {
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
	  
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
		  if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		  if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
	  
		let penis = ['==','===','====','=====','======','=======','========','=========','==========','===========']
		const peni = new MessageEmbed()
		.setTitle(`peepee size machine`)
		.setDescription(`${commander.username}'s penis \n 8` + penis[Math.floor(Math.random() * penis.length)] + `D`)
		message.inlineReply(peni)
		
	})

	let howlesbian = 'howlesbian'
	command(client, howlesbian, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let args = message.content.split(' ').slice(1)
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
		  if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		  if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
		commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		
		const howlesembed = new MessageEmbed()
		.setTitle(`🏳️‍🌈 howlesbian machine ?`)
		.setDescription(`${commander.username} is **` + randomnumber(101) + `**% lesbian!`)
		.setImage('https://media.tenor.com/images/9baa9cd1467cd8b33a12b353d4392441/tenor.gif')
		
	  message.inlineReply(howlesembed)
	})

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	// *********************************************************************************************** CHILLING ***********************************************************************************************  \\
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	let kiss = ['kiss', 'mua7']
	command(client, kiss, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://nekos.life/api/kiss', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one got kissed!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J/')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** kisses **'+(proposed && proposed.size !== 0 ? (proposed.size >= 2 ? (proposed.array()[0].username+'**, **'+proposed.array()[1].username+'**') : (proposed.first().username+'**')) : client.user.username+'**'))
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	let neko = 'neko'
	command(client, neko, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://nekos.life/api/neko', json: true })
		  
	   let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('That is a Nekooo!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** seeks for a nekos!')
			.setImage(body.neko)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	let hug = ['hug', '3n9ni']
	command(client, hug, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://nekos.life/api/hug', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one got hugged!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J/')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** hug **'+(proposed && proposed.size !== 0 ? (proposed.size >= 2 ? (proposed.array()[0].username+'**, **'+proposed.array()[1].username+'**') : (proposed.first().username+'**')) : client.user.username+'**'))
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	let pat = 'pat'
	command(client, pat, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://nekos.life/api/pat', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one got patted!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** pats **'+(proposed && proposed.size !== 0 ? (proposed.size >= 2 ? (proposed.array()[0].username+'**, **'+proposed.array()[1].username+'**') : (proposed.first().username+'**')) : client.user.username+'**'))
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	let tickle = 'tickle'
	command(client, tickle, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://nekos.life/api/v2/img/tickle', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one got a tickle!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** tickle **'+(proposed && proposed.size !== 0 ? (proposed.size >= 2 ? (proposed.array()[0].username+'**, **'+proposed.array()[1].username+'**') : (proposed.first().username+'**')) : client.user.username+'**'))
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	let poke = 'poke'
	command(client, poke, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://nekos.life/api/v2/img/poke', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one got poked!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** pokes **'+(proposed && proposed.size !== 0 ? (proposed.size >= 2 ? (proposed.array()[0].username+'**, **'+proposed.array()[1].username+'**') : (proposed.first().username+'**')) : client.user.username+'**'))
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	let cuddle = 'cuddle'
	command(client, cuddle, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://nekos.life/api/v2/img/cuddle', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one got a cuddle!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** cuddle **'+(proposed && proposed.size !== 0 ? (proposed.size >= 2 ? (proposed.array()[0].username+'**, **'+proposed.array()[1].username+'**') : (proposed.first().username+'**')) : client.user.username+'**'))
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	let slap = 'slap'
	command(client, slap, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://nekos.life/api/v2/img/slap', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one got a slapped!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** slaps **'+(proposed && proposed.size !== 0 ? (proposed.size >= 2 ? (proposed.array()[0].username+'**, **'+proposed.array()[1].username+'**') : (proposed.first().username+'**')) : client.user.username+'**'))
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	let feed = 'feed'
	command(client, feed, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://nekos.life/api/v2/img/feed', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one got a feeded!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** feeds **'+(proposed && proposed.size !== 0 ? (proposed.size >= 2 ? (proposed.array()[0].username+'**, **'+proposed.array()[1].username+'**') : (proposed.first().username+'**')) : client.user.username+'**'))
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	let blush = 'blush'
	command(client, blush, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://shiro.gg/api/images/blush', json: true })
		
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one is blushing!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** blushes becuz of **'+(proposed && proposed.size !== 0 ? (proposed.size >= 2 ? (proposed.array()[0].username+'**, **'+proposed.array()[1].username+'**') : (proposed.first().username+'**')) : client.user.username+'**'))
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	let cry = 'cry'
	command(client, cry, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://neko-love.xyz/api/v1/cry/', json: true })
		  
	   let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one is crying!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** crying becuz of **'+(proposed && proposed.size !== 0 ? (proposed.size >= 2 ? (proposed.array()[0].username+'**, **'+proposed.array()[1].username+'**') : (proposed.first().username+'**')) : client.user.username+'**'))
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	let punch = 'punch'
	command(client, punch, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://neko-love.xyz/api/v1/punch/', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one got punched!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** punch **'+(proposed && proposed.size !== 0 ? (proposed.size >= 2 ? (proposed.array()[0].username+'**, **'+proposed.array()[1].username+'**') : (proposed.first().username+'**')) : client.user.username+'**'))
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	let smug = 'smug'
	command(client, smug, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let proposed = message.mentions.users
		let body = await get({ url: 'https://nekos.life/api/v2/img/smug', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for smug!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your smug request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.inlineReply(emb)
	})

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	// ************************************************************************************************* NSFW *************************************************************************************************  \\
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	let kuni = 'kuni'
	command(client, kuni, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/kuni', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for kuni img!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your kuni request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let trap = 'trap'
	command(client, trap, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/trap', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for traps!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your trap request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let tits = 'tits'
	command(client, tits, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/tits', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for tits img!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your tits img!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let lesbian = 'lesbian'
	command(client, lesbian, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/les', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for lesbians img!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your lesbian img!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let feet = 'feet'
	command(client, feet, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/feet', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for feets!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your feet request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let yuri = 'yuri'
	command(client, yuri, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/yuri', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for yuris!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your yuri request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let solo = 'solo'
	command(client, solo, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/solo', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for solo img!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your solo request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let keta = 'keta'
	command(client, keta, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/keta', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for keta!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your keta request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let cum = 'cum'
	command(client, cum, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/cum', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for cum!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your cum request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let lewd = 'lewd'
	command(client, lewd, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/lewd', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for lewd img!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your lewd request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let nekogif = 'nekogif'
	command(client, nekogif, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/ngif', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for nekogif!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your nekogif request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let anal = 'anal'
	command(client, anal, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/anal', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for anal!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your anal request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let blowjob = 'blowjob'
	command(client, blowjob, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/blowjob', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for blowjob!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your blowjob request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let boobs = 'boobs'
	command(client, boobs, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/boobs', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for boobs!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your boobs request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let hentai = 'hentai'
	command(client, hentai, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/hentai', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for hentai!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your hentai request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	let pussy = 'pussy'
	command(client, pussy, async message => {
		await waiting(message)
		if (!message.channel.nsfw) return message.channel.send('Please go to **NSFW** channel or enable it <:cutie:675727723624136715>')
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		// if (!client.guilds.cache.get('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		// if (client.guilds.cache.get('675719509507702784') && !client.guilds.cache.get('675719509507702784').members.cache.get(message.author.id).roles.cache.has('675719509507702784')) return message.channel.send('**'+message.author.username+'**, sorry but you must be a member in support server to use this command! type **!!support** for more infos!')
		let body = await get({ url: 'https://nekos.life/api/v2/img/pussy', json: true })
		  
		let emb = new MessageEmbed()
			.setColor('#2f3136').setAuthor('Some one requested for pussy!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setDescription('<:space:817796102761611264> **'+message.author.username+'** here is your pussy request!')
			.setImage(body.url)
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
		  
		message.channel.send(emb)
	})

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	// ************************************************************************************************* RADIO *************************************************************************************************  \\
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	let list = { 'Standard': 'http://streams.ilovemusic.de/iloveradio14.mp3', 'Base-Radio.de': 'http://baseradiode.stream.laut.fm/baseradiode', 'Chill': 'http://streams.ilovemusic.de/iloveradio17.mp3', 'Dance': 'http://streams.ilovemusic.de/iloveradio2.mp3', 'Deutsch-Rap': 'http://streams.ilovemusic.de/iloveradio6.mp3', 'Greatest-hits': 'http://streams.ilovemusic.de/iloveradio16.mp3', 'Hip-hop': 'http://streams.ilovemusic.de/iloveradio3.mp3', 'Party': 'http://streams.ilovemusic.de/iloveradio14.mp3', 'Us-Rap': 'http://streams.ilovemusic.de/iloveradio13.mp3', 'X-Mas': 'http://streams.ilovemusic.de/iloveradio8.mp3', 'Greatest-hits-2': 'http://stream-mz.planetradio.co.uk/net2national.mp3', 'Absolut': 'http://icy-e-bab-02-gos.sharp-stream.com/absoluteradio.mp3', 'Absolut-70s': 'http://ais.absoluteradio.co.uk/absolute70s.mp3', 'Absolut-80s': 'http://ais.absoluteradio.co.uk/absolute80s.mp3', 'Absolut-90s': 'http://ais.absoluteradio.co.uk/absolute90s.mp3', 'Absolut-2000s': 'http://ais.absoluteradio.co.uk/absolute00s.mp3', 'Absolut-Classic-Rock': 'http://icy-e-bab-04-cr.sharp-stream.com/absoluteclassicrock.mp3', 'Top': 'http://loadbalancing.topradio.be/topradio.mp3', '88.6': 'http://radio886.fluidstream.eu/886_live.mp3', 'Kronehit': 'http://onair.krone.at/kronehit.mp3', 'NRJ': 'http://cdn.nrjaudio.fm/audio1/fr/30001/mp3_128.mp3', 'Radio-France': 'http://direct.fipradio.fr/live/fip-midfi.mp3', 'Rai': 'http://icestreaming.rai.it:80/1.mp3', 'Veronica': 'http://icestreaming.rai.it:80/2.mp3', 'ERR': 'http://icecast.err.ee:80/vikerraadio.mp3', 'Tallin': 'http://icecast.err.ee:80/raadiotallinn.mp3', 'Color-Music': 'http://icecast8.play.cz/color128.mp3', 'Helax': 'http://ice.abradio.cz:8000/helax128.mp3', 'Cesky-rozhlas': 'http://icecast6.play.cz/cro2-128.mp3', 'Spin': 'http://icecast4.play.cz/spin128.mp3', 'BB': 'http://icecast.omroep.nl/radio1-bb-mp3', '538': 'http://21223.live.streamtheworld.com/RADIO538.mp3', 'radio90': 'http://streams2.radio90.pl:8000/radio90_128kbps_stereo.mp3', 'Fama': 'http://stream2.nadaje.com:8076/,stream.mp3', 'HitRadio': 'http://hitradio-maroc.ice.infomaniak.ch/hitradio-maroc-128.mp3', 'Medradio': 'http://medradio-maroc.ice.infomaniak.ch/medradio-maroc-64.mp3', 'Medinafm': 'http://medinafm.ice.infomaniak.ch/medinafm-64.mp3', 'Chadafm': 'http://chadafm.ice.infomaniak.ch/chadafm-high.mp3', 'AnimeNexus': 'http://radio.animenexus.mx:8000/animenexus', 'kpop': 'http://listen.moe/kpop/fallback', 'vapourwave': 'http://radio.plaza.one/mp3', 'lofi': 'http://hyades.shoutca.st:8043/stream' }

	let guildvolume = {}
	let radioo = 'radio'
	command(client, radioo, async message => {
		await waiting(message)
		const args = message.content.split(' ').slice(1).join(' ')
		if (!args) return message.channel.send('**'+message.author.username+'** type **!!radio stations** for stations list!')
		
		let eemb = new MessageEmbed()
		.setColor('#2f3136')
		.setDescription('<:protection:872911854391930942> **'+message.author.username+'** sorry **music** is playing right now! \n <:space:817796102761611264>You have to **stop** it first **before** you use radio!')
		.setImage(empty)
		.setTimestamp()
		const isMusic = message.client.queue.get(message.guild.id)
		if (isMusic) return message.channel.send(eemb)
		
		const permissions = message.channel.permissionsFor(message.client.user)
		if (!permissions.has('CONNECT')) return message.channel.send('**'+message.author.username+'** I must have connect permission <:wut_:688867208402829333>')
		if (!permissions.has('SPEAK')) return message.channel.send('**'+message.author.username+'** I must have speak permission <:wut_:688867208402829333>')
		let emb = new MessageEmbed()
			.setColor('#2f3136')
			.setAuthor('Here is list of radio stations!', message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.addField('\u200B', Object.keys(list).slice(0, 20).map((lis, x) => { return '**['+(x+1)+']** ' + lis.toLowerCase() }).join('\n'), true)
			.addField('\u200B', '<:space:817796102761611264><:space:817796102761611264> <a:Flyyy:770262976749633576> <:space:817796102761611264><:space:817796102761611264>', true)
			.addField('\u200B', Object.keys(list).slice(20, 40).map((lis, x) => { return '**['+(x+21)+']** ' + lis.toLowerCase() }).join('\n'), true)
			.setThumbnail('https://cdn.discordapp.com/emojis/817814052260544532.png?v=1')
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, format: 'png' }))
			.setTimestamp() 
		
		if (args == 'stations') return message.inlineReply(emb)

		if (message.guild.me.voice.channel && message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send('<:attention:872878815523799040> **'+message.author.username+'**, you must be listening in **'+message.guild.me.voice.channel.name+'** to use that!')
		if (!message.member.voice.channel) return message.channel.send('<:attention:872878815523799040> **'+message.author.username+'** you must be in a voice channel to use this command!')
		
		if (args == 'pause') {
			message.member.voice.channel.join().then(connection => {
				connection.dispatcher.pause()
			})
			return message.inlineReply('<:pause:873241808883294230> **'+message.author.username+'**, broadcast paused!')
		}
		if (args == 'resume') {
			message.member.voice.channel.join().then(connection => {
				connection.dispatcher.resume()
			})
			return message.inlineReply('<:resume:873242561723121795> **'+message.author.username+'**, broadcast resumed!')
		}
		if (message.content.split(' ')[1] == 'volume') {
			if ((isNaN(message.content.split(' ').slice(2).join(' '))) || (parseInt(message.content.split(' ').slice(2).join(' ')) > 100) || (parseInt(message.content.split(' ').slice(2).join(' ')) < 0)) return message.channel.send('**'+message.author.username+'**, please choose a number between (\`0\`) and (\`100\`)')
			if (!message.content.split(' ').slice(2).join(' ')) return message.channel.send(`<:none:873257085448650812> **${message.author.username}**, current **volume** is (\`${guildvolume[message.guild.id] ? guildvolume[message.guild.id] : 70}\`)`)
			message.member.voice.channel.join().then(connection => {
				connection.dispatcher.setVolumeLogarithmic(parseInt(message.content.split(' ')[2]) / 100)
				guildvolume[message.guild.id] = parseInt(message.content.split(' ')[2]) / 100
			})
			return message.channel.send('<:sounds:872878814219370607> **'+message.author.username+'**, broadcast **volume** changed to (\`'+parseInt(message.content.split(' ').slice(2).join(' '))+'\`)')
		}
		if (args == 'stop') {
			message.member.voice.channel.join().then(connection => {
				connection.dispatcher.destroy()
				message.client.radio.delete(message.guild.id)
			})
			return message.inlineReply('**'+message.author.username+'**, broadcast stopped in **' + message.member.voice.channel.name+'**!')
		}
		
		let url = Object.values(list).find(x => x == list[Object.keys(list).find(x => x.toLowerCase() === args.toLowerCase())]) || Object.values(list).map(list => list)[parseInt(args.toLowerCase()) - 1]
		if (!url) return
		
		message.client.radio.set(message.guild.id, {})
		message.member.voice.channel.join().then(connection => {
			require('http').get(url, (res) => {
				connection.play(res).on('error', err => {
					client.logger.error(err)
					connection.play(res, { volume: guildvolume[message.guild.id] ? guildvolume[message.guild.id] : 0.7 })
				})
			})
			connection.voice.setSelfDeaf(true)
		})
		message.inlineReply('<:play:873244244528222278> **'+message.author.username+'** now broadcasting **'+Object.keys(list).find(key => list[key] === url)+'** in **'+message.member.voice.channel.name+'**!')
	})


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	// ************************************************************************************************* G & A *************************************************************************************************  \\
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	let penaltyy = 'penalty'
	command(client, penaltyy, async message => {
		await waiting(message)
		let cooldown = 180000
		if (pilanty[message.author.id] && pilanty[message.author.id].time) {
		   let Daily = pilanty[message.author.id].time
		   if (Daily !== null && cooldown - ((sec(pretty(Date.now(), { colonNotation: true })) * 1000) - Daily) > 0) return message.channel.send(`<:watchs:872878816706568222> **${message.author.username}**, you can play more **Penalty's game** in **${pretty(cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - Daily), { verbose: true })}**!`)
		}
	   
		let num = {}
		let moves = {}
		let x = {}
		let stat = {}
		let stop = {}
	   
		num[message.guild.id] = 0
		moves[message.guild.id] = 5
		x[message.guild.id] = 0
		stat[message.guild.id] = null
		
		const left = new MessageButton()
		.setLabel('Left')
		.setID('leftoo')
		.setStyle('blurple')
		const middle = new MessageButton()
		.setLabel('Middle')
		.setID('middloo')
		.setStyle('green')
		const right = new MessageButton()
		.setLabel('Right')
		.setID('rightoo')
		.setStyle('blurple')
	   
		
		let goalkeeper = ['<:space:817796102761611264>:levitate:<:space:817796102761611264>', '<:space:817796102761611264><:space:817796102761611264>:levitate:', ':levitate:<:space:817796102761611264><:space:817796102761611264>']
		
		if (penalcool[message.guild.id] &&  penalcool[message.guild.id].status == true) return message.channel.send('**'+message.author.username+'**, sry this command has a cooldown!')
		
		penalcool[message.guild.id] = {
		  status: true
		}
		setTimeout(() =>  delete penalcool[message.guild.id], 12000)
	   
		let m = await message.channel.send(`**${message.author.username}**, You got a **Penalty** on Soccer - Hit the ball into a goal where the goalkeeper will not capt it! To hit the ball, type **left**, **right** or **middle**. (Do not forget you have **only** __${moves[message.guild.id]}__ moves of the goal keeper if it finished you will lose!)\n:goal::goal::goal:\n${goalkeeper[0]}\n\n<:space:817796102761611264>:soccer:`, { buttons: [left, middle, right] })
		
		const collector = await m.createButtonCollector(b => b.clicker.user.id === message.author.id, { time: 12000 })
		
		var penalty = await setInterval(() => {
		  x[message.guild.id]++
		  if (x[message.guild.id] >= 3) x[message.guild.id] = 0

		  m.edit(`**${message.author.username}**, You got a **Penalty** on Soccer - Hit the ball into a goal where the goalkeeper will not capt it! To hit the ball, type **left**, **right** or **middle**. (Do not forget you have **only** __${parseInt(moves[message.guild.id]) - 1}__ moves of the goal keeper if it finished you will lose!)\n:goal::goal::goal:\n${goalkeeper[x[message.guild.id]]}\n\n<:space:817796102761611264>:soccer:<:space:817796102761611264>`, { buttons: [left, middle, right] })
		  moves[message.guild.id]--
	   }, 2000)
		
		collector.on('collect', async button => {
			if (button.id === 'middloo' && x[message.guild.id] !== 0) {
				m.edit(`**${message.author.username}**, You hit the the ball into the goal and the goalkeeper didn't capt it!\n:goal::goal::goal:\n${goalkeeper[x[message.guild.id]]}\n<:space:817796102761611264>:soccer:`, { buttons: [left.setDisabled(true), middle.setDisabled(true), right.setDisabled(true)] })
				message.channel.send(`**Soccer coach** says **${message.author.username}** well done! well done ma man! You got **$200** BONUS!`)
				delete penalcool[message.guild.id]
				stop[message.guild.id] = true
				stat[message.guild.id] = 'middle'
				clearInterval(penalty)
				addMoney(message.author.id, 200)
				collector.stop()
				return
			} else if (button.id === 'middloo' && x[message.guild.id] == 0) {
				m.edit(`**${message.author.username}**, You hit the the ball into the goal and the goalkeeper capted it! <:oops:765590003694305351>\n:goal::goal::goal:\n<:space:817796102761611264>:levitate:<:space:817796102761611264>\n<:space:817796102761611264>:soccer:`, { buttons: [left.setDisabled(true), middle.setDisabled(true), right.setDisabled(true)] })
				message.channel.send(`**Soccer coach** says **${message.author.username}** bad work! the goal keeper capt it and we lose the match because of you! bad work man!`)
				stop[message.guild.id] = true
				stat[message.guild.id] = 'middle'
				clearInterval(penalty)
				delete penalcool[message.guild.id]
				collector.stop()
				return
			} else if (button.id === 'rightoo' && x[message.guild.id] !== 1) {
				m.edit(`**${message.author.username}**, You hit the the ball into the goal and the goalkeeper didn't capt it!\n:goal::goal::goal:\n${goalkeeper[x[message.guild.id]]}\n<:space:817796102761611264><:space:817796102761611264>:soccer:`, { buttons: [left.setDisabled(true), middle.setDisabled(true), right.setDisabled(true)] })
				message.channel.send(`**Soccer coach** says **${message.author.username}** well done! well done ma man! You got **$200** BONUS!`)
				delete penalcool[message.guild.id]
				stop[message.guild.id] = true
				stat[message.guild.id] = 'right'
				clearInterval(penalty)
				addMoney(message.author.id, 200)
				collector.stop()
				return
			} else if (button.id === 'rightoo' && x[message.guild.id] == 1) {
				m.edit(`**${message.author.username}**, You hit the the ball into the goal and the goalkeeper capted it! <:oops:765590003694305351>\n:goal::goal::goal:\n<:space:817796102761611264><:space:817796102761611264>:levitate:\n<:space:817796102761611264><:space:817796102761611264>:soccer:`, { buttons: [left.setDisabled(true), middle.setDisabled(true), right.setDisabled(true)] })
				message.channel.send(`**Soccer coach** says **${message.author.username}** bad work! the goal keeper capt it and we lose the match because of you! bad work man!`)
				stop[message.guild.id] = true
				stat[message.guild.id] = 'right'
				delete penalcool[message.guild.id]
				clearInterval(penalty)
				collector.stop()
				return
			} else if (button.id === 'leftoo' && x[message.guild.id] !== 2) {
				m.edit(`**${message.author.username}**, You hit the the ball into the goal and the goalkeeper didn't capt it!\n:goal::goal::goal:\n${goalkeeper[x[message.guild.id]]}\n:soccer:<:space:817796102761611264><:space:817796102761611264>`, { buttons: [left.setDisabled(true), middle.setDisabled(true), right.setDisabled(true)] })
				message.channel.send(`**Soccer coach** says **${message.author.username}** well done! well done ma man! You got **$200** BONUS!`)
				delete penalcool[message.guild.id]
				stop[message.guild.id] = true
				stat[message.guild.id] = 'left'
				clearInterval(penalty)
				addMoney(message.author.id, 200)
				collector.stop()
				return
			} else if (button.id === 'leftoo' && x[message.guild.id] == 2) {
				m.edit(`**${message.author.username}**, You hit the the ball into the goal and the goalkeeper capted it! <:oops:765590003694305351>\n:goal::goal::goal:\n:levitate:<:space:817796102761611264><:space:817796102761611264>\n:soccer:<:space:817796102761611264><:space:817796102761611264>`, { buttons: [left.setDisabled(true), middle.setDisabled(true), right.setDisabled(true)] })
				message.channel.send(`**Soccer coach** says **${message.author.username}** bad work! the goal keeper capt it and we lose the match because of you! bad work man!`)
				stop[message.guild.id] = true
				stat[message.guild.id] = 'left'
				delete penalcool[message.guild.id]
				clearInterval(penalty)
				collector.stop()
				return
			}
		})
		
		setTimeout(() => {
			if (stop[message.guild.id] == true) return
			if (stat[message.guild.id] !== null) return
			
			stop[message.guild.id] = true
			m.edit(`**${message.author.username}**, you lose. time left! sorry better luck next time <:oops:765590003694305351>\n:goal::goal::goal:\n<:space:817796102761611264>:levitate:\n\n<:space:817796102761611264>:soccer:`, { buttons: [left.setDisabled(true), middle.setDisabled(true), right.setDisabled(true)] })
			clearInterval(penalty)
			return message.channel.send(`**${message.author.username}**, try again next time my friend!`)
		}, 10000)
		
		if (stop[message.guild.id] == true) return
		if (num[message.guild.id] == 1) {
			message.channel.send('**'+message.author.username+'**, time is passing please hit an answer!')
			num[message.guild.id] += 1
			if (num[message.guild.id] >= 4) num[message.guild.id] = 0
		}
		collector.on('end', () => {
			clearInterval(penalty)
			if (stop[message.guild.id] !== true) m.edit(m.content, { buttons: [left.setDisabled(true), middle.setDisabled(true), right.setDisabled(true)] })
			pilanty[message.author.id] = {
			  time: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000)
			}
		})
	})

	let slots = 'slots'
	command(client, slots, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'**, I must have embed links permission')
		const talkedRecently = new Set()
		let author = message.author.id
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('profiles').findOne({ [author+'.id']: author }, async (error, profile) => {
				if (profile == null) profile = {}
				if (profile == undefined) profile = {}
	 
				if (!profile[author]) {
					updateMoney(author, 0)
					return message.channel.send('**'+message.author.username+'**, you must go get coins first by typing **!!daily** for some coins <:drinking:750050072707727371>')
				}
		  
				if (talkedRecently.has(message.guild.id)) return message.channel.send('**'+message.author.username+'**, please wait a **few secondes** secondes before getting typing this again!')
				const args = parseInt(message.content.split(' ').slice(1).join(' '))
				if (!args) return message.channel.send('**'+message.author.username+'** try to use a valid bet <:oops:765590003694305351>')
				if (isNaN(args)) return message.channel.send('**'+message.author.username+'** try to use a valid bet <:oops:765590003694305351>')
				if (args <= 0) return message.channel.send('**'+message.author.username+'**, do not use **0** or negative numbers -.-')
				if (args > parseInt(profile[message.author.id].credits)) return message.channel.send('**'+message.author.username+'**, Your balance is not enough for that! <:loook:765590000326541342>')
	   
				let slots = ['💎', '💵', '💰', '💯', '🥇']
	   
				let firstslots = slots[Math.floor(Math.random() * slots.length)]
				let secondslots = slots[Math.floor(Math.random() * slots.length)]
				let thirdslots = slots[Math.floor(Math.random() * slots.length)]
	  
				let we

				if (firstslots === secondslots && secondslots === thirdslots) {
					addMoney(author, parseInt(args * 3))
					we = ':tada: Congrats, you won `$'+parseInt(args * 3)+'`!'
				} else if(firstslots === secondslots) {
					addMoney(author, parseInt(args / 2))
					we = 'You won `$'+(parseInt(args / 2))+'`!'
				} else if(secondslots === thirdslots) {
					addMoney(author, parseInt(args / 2))
					we = 'You won `$'+(parseInt(args / 2))+'`!'
				} else {
					removeMoney(author, args)
					we = 'Sadly, you just lost `$'+args+'` ... better luck next time'
				}
		
				const emb = new MessageEmbed()
				.setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
				.addField('Spinned By:', `${message.author.tag}`)
				.setColor('#2f3136')
				.setDescription('━━━━━[ 📢  SPINNING ]━━━━━')
				.addField('Status:', `None`)
				.setFooter(client.user.username, client.user.avatarURL())
				.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
				.setTimestamp()
			
				message.channel.send(emb).then(function(m) {
					setTimeout(function() {
						const emb1 = new MessageEmbed()
						.setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
						.addField('Spinned By:', `${message.author.tag}`)
						.addField('Status:', `None`)
						.setColor('#2f3136')
						.setFooter(client.user.username, client.user.avatarURL())
						.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
						.setTimestamp()
						.setDescription(`━━━━━[ ${client.emojis.cache.get('678372845977468978')}   |   ${client.emojis.cache.get('678372845977468978')}   |   ${client.emojis.cache.get('678372845977468978')} ]━━━━━`)
						m.edit(emb1)
					}, 1300)
					setTimeout(function() {
						const emb2 = new MessageEmbed()
						.setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
						.addField('Spinned By:', `${message.author.tag}`)
						.addField('Status:', `None`)
						.setColor('#2f3136')
						.setFooter(client.user.username, client.user.avatarURL())
						.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
						.setTimestamp()
						.setDescription(`━━━━━[ ${firstslots}   |   ${client.emojis.cache.get('678372845977468978')}   |   ${client.emojis.cache.get('678372845977468978')} ]━━━━━`)
						m.edit(emb2)
					}, 1300 * 2)
					setTimeout(function() {
						const emb3 = new MessageEmbed()
						.setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
						.addField('Spinned By:', `${message.author.tag}`)
						.addField('Status:', `None`)
						.setColor('#2f3136')
						.setFooter(client.user.username, client.user.avatarURL())
						.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
						.setTimestamp()
						.setDescription(`━━━━━[ ${firstslots}   |   ${secondslots}   |   ${client.emojis.cache.get('678372845977468978')} ]━━━━━`)
						m.edit(emb3)
					}, 1300 * 3)
					setTimeout(function() {
						let emb4 = new MessageEmbed()
						.setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
						.addField('Spinned By:', `${message.author.tag}`)
						.addField('Status:', `${we}`)
						.setFooter(client.user.username, client.user.avatarURL())
						.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
						.setColor('#2f3136')
						.setDescription(`━━━━━[ ${firstslots}   |   ${secondslots}   |   ${thirdslots} ]━━━━━`)
						.setTimestamp()
						m.edit(emb4)
					}, 1300 * 4)
				})
				talkedRecently.add(message.guild.id)
				setTimeout(() => {
					talkedRecently.delete(message.guild.id)
				}, 1300 * 4 + 1)
			})
		})
	})

	let credit = ['credits', 'credit', 'balance', 'bal', 'money']
	command(client, credit, async message => {
		await waiting(message)
		let mention = message.mentions.users.first()
		if (mention && mention.bot) return message.channel.send('**'+message.author.username+'**, bots do not have credits! <:looook:765589999613640754>')
		let author = message.author.id
		let args = message.content.split(' ')
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('profiles').findOne({ [author+'.id']: author }, async (error, profile) => {
				if (profile == null) profile = {}
				if (profile == undefined) profile = {}

				if (!profile[author]) {
					updateMoney(author, 0)
					return message.channel.send(`<:gennycard:802865130232479754>  **${message.author.username}**, your card balance is \`$0\`!`)
				}
				if (profile[author] && !profile[author].credits) {
					updateMoney(author, 0)
					return message.channel.send(`<:gennycard:802865130232479754>  **${message.author.username}**, your card balance is \`$0\`!`)
				}

				if (!args[2] && !mention) {
					message.channel.send(`<:gennycard:802865130232479754>  **${message.author.username}**, your card balance is \`$${profile[message.author.id].credits}\`!`)
				} else if (!args[2] && mention) {
					mongoose.connection.collection('profiles').findOne({ [mention.id+'.id']: mention.id }, async (error, profilee) => {
					if (profilee == null) profilee = {}
					if (profilee == undefined) profilee = {}
		   
					if (!profilee[mention.id]) {
						updateMoney(mention.id, 0)
						return message.channel.send(`<:gennycard:802865130232479754>  **${mention.username}**, card balance is \`$0\`!`)
					}
					message.channel.send(`<:gennycard:802865130232479754>  **${mention.username}**, card balance is \`$${profilee[mention.id].credits}\`!`)
					})
				} else if(mention && args[2]) {
					if (isNaN(args[2])) return message.channel.send(`**${message.author.username}**, bad request ma dude <:looook:765589999613640754>`)
		  
					if (parseFloat(args[2]) < 1) return message.channel.send(`<:naah:765590004130250812> **${message.author.username}**, try type a valid credit amount!`)
		  
					if (mention.id === message.author.id) return message.channel.send(`**${message.author.username}**, you only losing your credit balance <:looook:765589999613640754>`)
		  
					if (parseFloat(args[2]) > parseFloat(profile[author].credits)) return message.channel.send(`**${message.author.username}**, Your balance is not enough for that! <:loook:765590000326541342>`)
					if (args[2].includes('-')) return message.channel.send(`**${message.author.username}**, noice. negative amount do not blocks me <:looook:765589999613640754>`)
		 
					let tax = Math.floor((args[2] * 4) / 100)
					let Price = message.content.split(' ')[2]
					let resulting = Math.floor(Price - ((Price * 4) / 100))

					message.delete().catch(e => true)
					const item = speed[Math.floor(Math.random() * speed.length)]
					const attachement = new MessageAttachment(item.type)
					message.channel.send(`**${message.author.username}**, Transfer Fees \`${tax}\`, Amount :\`${resulting}\`\ntype these numbers to confirm : `, attachement).then(r => {
						const filter = m => item.answers.some(answer => answer.toLowerCase() === m.content.toLowerCase()) && m.author.id === message.author.id

						const collector = message.channel.createMessageCollector(filter, { max: 1, time: 10000, errors: ['time'] })
		  
						collector.on('collect', m => {
							removeMoney(author, parseFloat(args[2]))
							addMoney(mention.id,parseFloat(resulting == 0 ? 1 : resulting))
		  
							message.channel.send(`<:twitter:872911855822209085> **${message.author.username}**, you transferred \`$${resulting == 0 ? 1 : resulting}\` to **${mention.tag}**!`)
							collector.stop()
							m.delete().catch(e => true)
							mention.send(`**:atm: | Transfer Receipt**\`\`\`You Have Received \$${resulting == 0 ? 1 : resulting}\ From User ${message.author.username} (ID ${message.author.id})\`\`\``).catch(e => true)
							client.channels.cache.get('748195654911918226').send('**'+ message.author.tag +'** has transferred \`$'+(resulting == 0 ? 1 : resulting)+'\` to **'+mention.tag+'** __(ID '+mention.id+')__')
						})
						collector.on('end', collected => {
							r.delete().catch(e => true)
						})
					})
				}
			})
		})
	})

	Latinise.latin_map = {'Á':'A','Ă':'A','Ắ':'A','Ặ':'A','Ằ':'A','Ẳ':'A','Ẵ':'A','Ǎ':'A','Â':'A','Ấ':'A','Ậ':'A','Ầ':'A','Ẩ':'A','Ẫ':'A','Ä':'A','Ǟ':'A','Ȧ':'A','Ǡ':'A','Ạ':'A','Ȁ':'A','À':'A','Ả':'A','Ȃ':'A','Ā':'A','Ą':'A','Å':'A','Ǻ':'A','Ḁ':'A','Ⱥ':'A','Ã':'A','Ꜳ':'AA','Æ':'AE','Ǽ':'AE','Ǣ':'AE','Ꜵ':'AO','Ꜷ':'AU','Ꜹ':'AV','Ꜻ':'AV','Ꜽ':'AY','Ḃ':'B','Ḅ':'B','Ɓ':'B','Ḇ':'B','Ƀ':'B','Ƃ':'B','Ć':'C','Č':'C','Ç':'C','Ḉ':'C','Ĉ':'C','Ċ':'C','Ƈ':'C','Ȼ':'C','Ď':'D','Ḑ':'D','Ḓ':'D','Ḋ':'D','Ḍ':'D','Ɗ':'D','Ḏ':'D','ǲ':'D','ǅ':'D','Đ':'D','Ƌ':'D','Ǳ':'DZ','Ǆ':'DZ','É':'E','Ĕ':'E','Ě':'E','Ȩ':'E','Ḝ':'E','Ê':'E','Ế':'E','Ệ':'E','Ề':'E','Ể':'E','Ễ':'E','Ḙ':'E','Ë':'E','Ė':'E','Ẹ':'E','Ȅ':'E','È':'E','Ẻ':'E','Ȇ':'E','Ē':'E','Ḗ':'E','Ḕ':'E','Ę':'E','Ɇ':'E','Ẽ':'E','Ḛ':'E','Ꝫ':'ET','Ḟ':'F','Ƒ':'F','Ǵ':'G','Ğ':'G','Ǧ':'G','Ģ':'G','Ĝ':'G','Ġ':'G','Ɠ':'G','Ḡ':'G','Ǥ':'G','Ḫ':'H','Ȟ':'H','Ḩ':'H','Ĥ':'H','Ⱨ':'H','Ḧ':'H','Ḣ':'H','Ḥ':'H','Ħ':'H','Í':'I','Ĭ':'I','Ǐ':'I','Î':'I','Ï':'I','Ḯ':'I','İ':'I','Ị':'I','Ȉ':'I','Ì':'I','Ỉ':'I','Ȋ':'I','Ī':'I','Į':'I','Ɨ':'I','Ĩ':'I','Ḭ':'I','Ꝺ':'D','Ꝼ':'F','Ᵹ':'G','Ꞃ':'R','Ꞅ':'S','Ꞇ':'T','Ꝭ':'IS','Ĵ':'J','Ɉ':'J','Ḱ':'K','Ǩ':'K','Ķ':'K','Ⱪ':'K','Ꝃ':'K','Ḳ':'K','Ƙ':'K','Ḵ':'K','Ꝁ':'K','Ꝅ':'K','Ĺ':'L','Ƚ':'L','Ľ':'L','Ļ':'L','Ḽ':'L','Ḷ':'L','Ḹ':'L','Ⱡ':'L','Ꝉ':'L','Ḻ':'L','Ŀ':'L','Ɫ':'L','ǈ':'L','Ł':'L','Ǉ':'LJ','Ḿ':'M','Ṁ':'M','Ṃ':'M','Ɱ':'M','Ń':'N','Ň':'N','Ņ':'N','Ṋ':'N','Ṅ':'N','Ṇ':'N','Ǹ':'N','Ɲ':'N','Ṉ':'N','Ƞ':'N','ǋ':'N','Ñ':'N','Ǌ':'NJ','Ó':'O','Ŏ':'O','Ǒ':'O','Ô':'O','Ố':'O','Ộ':'O','Ồ':'O','Ổ':'O','Ỗ':'O','Ö':'O','Ȫ':'O','Ȯ':'O','Ȱ':'O','Ọ':'O','Ő':'O','Ȍ':'O','Ò':'O','Ỏ':'O','Ơ':'O','Ớ':'O','Ợ':'O','Ờ':'O','Ở':'O','Ỡ':'O','Ȏ':'O','Ꝋ':'O','Ꝍ':'O','Ō':'O','Ṓ':'O','Ṑ':'O','Ɵ':'O','Ǫ':'O','Ǭ':'O','Ø':'O','Ǿ':'O','Õ':'O','Ṍ':'O','Ṏ':'O','Ȭ':'O','Ƣ':'OI','Ꝏ':'OO','Ɛ':'E','Ɔ':'O','Ȣ':'OU','Ṕ':'P','Ṗ':'P','Ꝓ':'P','Ƥ':'P','Ꝕ':'P','Ᵽ':'P','Ꝑ':'P','Ꝙ':'Q','Ꝗ':'Q','Ŕ':'R','Ř':'R','Ŗ':'R','Ṙ':'R','Ṛ':'R','Ṝ':'R','Ȑ':'R','Ȓ':'R','Ṟ':'R','Ɍ':'R','Ɽ':'R','Ꜿ':'C','Ǝ':'E','Ś':'S','Ṥ':'S','Š':'S','Ṧ':'S','Ş':'S','Ŝ':'S','Ș':'S','Ṡ':'S','Ṣ':'S','Ṩ':'S','Ť':'T','Ţ':'T','Ṱ':'T','Ț':'T','Ⱦ':'T','Ṫ':'T','Ṭ':'T','Ƭ':'T','Ṯ':'T','Ʈ':'T','Ŧ':'T','Ɐ':'A','Ꞁ':'L','Ɯ':'M','Ʌ':'V','Ꜩ':'TZ','Ú':'U','Ŭ':'U','Ǔ':'U','Û':'U','Ṷ':'U','Ü':'U','Ǘ':'U','Ǚ':'U','Ǜ':'U','Ǖ':'U','Ṳ':'U','Ụ':'U','Ű':'U','Ȕ':'U','Ù':'U','Ủ':'U','Ư':'U','Ứ':'U','Ự':'U','Ừ':'U','Ử':'U','Ữ':'U','Ȗ':'U','Ū':'U','Ṻ':'U','Ų':'U','Ů':'U','Ũ':'U','Ṹ':'U','Ṵ':'U','Ꝟ':'V','Ṿ':'V','Ʋ':'V','Ṽ':'V','Ꝡ':'VY','Ẃ':'W','Ŵ':'W','Ẅ':'W','Ẇ':'W','Ẉ':'W','Ẁ':'W','Ⱳ':'W','Ẍ':'X','Ẋ':'X','Ý':'Y','Ŷ':'Y','Ÿ':'Y','Ẏ':'Y','Ỵ':'Y','Ỳ':'Y','Ƴ':'Y','Ỷ':'Y','Ỿ':'Y','Ȳ':'Y','Ɏ':'Y','Ỹ':'Y','Ź':'Z','Ž':'Z','Ẑ':'Z','Ⱬ':'Z','Ż':'Z','Ẓ':'Z','Ȥ':'Z','Ẕ':'Z','Ƶ':'Z','Ĳ':'IJ','Œ':'OE','ᴀ':'A','ᴁ':'AE','ʙ':'B','ᴃ':'B','ᴄ':'C','ᴅ':'D','ᴇ':'E','ꜰ':'F','ɢ':'G','ʛ':'G','ʜ':'H','ɪ':'I','ʁ':'R','ᴊ':'J','ᴋ':'K','ʟ':'L','ᴌ':'L','ᴍ':'M','ɴ':'N','ᴏ':'O','ɶ':'OE','ᴐ':'O','ᴕ':'OU','ᴘ':'P','ʀ':'R','ᴎ':'N','ᴙ':'R','ꜱ':'S','ᴛ':'T','ⱻ':'E','ᴚ':'R','ᴜ':'U','ᴠ':'V','ᴡ':'W','ʏ':'Y','ᴢ':'Z','á':'a','ă':'a','ắ':'a','ặ':'a','ằ':'a','ẳ':'a','ẵ':'a','ǎ':'a','â':'a','ấ':'a','ậ':'a','ầ':'a','ẩ':'a','ẫ':'a','ä':'a','ǟ':'a','ȧ':'a','ǡ':'a','ạ':'a','ȁ':'a','à':'a','ả':'a','ȃ':'a','ā':'a','ą':'a','ᶏ':'a','ẚ':'a','å':'a','ǻ':'a','ḁ':'a','ⱥ':'a','ã':'a','ꜳ':'aa','æ':'ae','ǽ':'ae','ǣ':'ae','ꜵ':'ao','ꜷ':'au','ꜹ':'av','ꜻ':'av','ꜽ':'ay','ḃ':'b','ḅ':'b','ɓ':'b','ḇ':'b','ᵬ':'b','ᶀ':'b','ƀ':'b','ƃ':'b','ɵ':'o','ć':'c','č':'c','ç':'c','ḉ':'c','ĉ':'c','ɕ':'c','ċ':'c','ƈ':'c','ȼ':'c','ď':'d','ḑ':'d','ḓ':'d','ȡ':'d','ḋ':'d','ḍ':'d','ɗ':'d','ᶑ':'d','ḏ':'d','ᵭ':'d','ᶁ':'d','đ':'d','ɖ':'d','ƌ':'d','ı':'i','ȷ':'j','ɟ':'j','ʄ':'j','ǳ':'dz','ǆ':'dz','é':'e','ĕ':'e','ě':'e','ȩ':'e','ḝ':'e','ê':'e','ế':'e','ệ':'e','ề':'e','ể':'e','ễ':'e','ḙ':'e','ë':'e','ė':'e','ẹ':'e','ȅ':'e','è':'e','ẻ':'e','ȇ':'e','ē':'e','ḗ':'e','ḕ':'e','ⱸ':'e','ę':'e','ᶒ':'e','ɇ':'e','ẽ':'e','ḛ':'e','ꝫ':'et','ḟ':'f','ƒ':'f','ᵮ':'f','ᶂ':'f','ǵ':'g','ğ':'g','ǧ':'g','ģ':'g','ĝ':'g','ġ':'g','ɠ':'g','ḡ':'g','ᶃ':'g','ǥ':'g','ḫ':'h','ȟ':'h','ḩ':'h','ĥ':'h','ⱨ':'h','ḧ':'h','ḣ':'h','ḥ':'h','ɦ':'h','ẖ':'h','ħ':'h','ƕ':'hv','í':'i','ĭ':'i','ǐ':'i','î':'i','ï':'i','ḯ':'i','ị':'i','ȉ':'i','ì':'i','ỉ':'i','ȋ':'i','ī':'i','į':'i','ᶖ':'i','ɨ':'i','ĩ':'i','ḭ':'i','ꝺ':'d','ꝼ':'f','ᵹ':'g','ꞃ':'r','ꞅ':'s','ꞇ':'t','ꝭ':'is','ǰ':'j','ĵ':'j','ʝ':'j','ɉ':'j','ḱ':'k','ǩ':'k','ķ':'k','ⱪ':'k','ꝃ':'k','ḳ':'k','ƙ':'k','ḵ':'k','ᶄ':'k','ꝁ':'k','ꝅ':'k','ĺ':'l','ƚ':'l','ɬ':'l','ľ':'l','ļ':'l','ḽ':'l','ȴ':'l','ḷ':'l','ḹ':'l','ⱡ':'l','ꝉ':'l','ḻ':'l','ŀ':'l','ɫ':'l','ᶅ':'l','ɭ':'l','ł':'l','ǉ':'lj','ſ':'s','ẜ':'s','ẛ':'s','ẝ':'s','ḿ':'m','ṁ':'m','ṃ':'m','ɱ':'m','ᵯ':'m','ᶆ':'m','ń':'n','ň':'n','ņ':'n','ṋ':'n','ȵ':'n','ṅ':'n','ṇ':'n','ǹ':'n','ɲ':'n','ṉ':'n','ƞ':'n','ᵰ':'n','ᶇ':'n','ɳ':'n','ñ':'n','ǌ':'nj','ó':'o','ŏ':'o','ǒ':'o','ô':'o','ố':'o','ộ':'o','ồ':'o','ổ':'o','ỗ':'o','ö':'o','ȫ':'o','ȯ':'o','ȱ':'o','ọ':'o','ő':'o','ȍ':'o','ò':'o','ỏ':'o','ơ':'o','ớ':'o','ợ':'o','ờ':'o','ở':'o','ỡ':'o','ȏ':'o','ꝋ':'o','ꝍ':'o','ⱺ':'o','ō':'o','ṓ':'o','ṑ':'o','ǫ':'o','ǭ':'o','ø':'o','ǿ':'o','õ':'o','ṍ':'o','ṏ':'o','ȭ':'o','ƣ':'oi','ꝏ':'oo','ɛ':'e','ᶓ':'e','ɔ':'o','ᶗ':'o','ȣ':'ou','ṕ':'p','ṗ':'p','ꝓ':'p','ƥ':'p','ᵱ':'p','ᶈ':'p','ꝕ':'p','ᵽ':'p','ꝑ':'p','ꝙ':'q','ʠ':'q','ɋ':'q','ꝗ':'q','ŕ':'r','ř':'r','ŗ':'r','ṙ':'r','ṛ':'r','ṝ':'r','ȑ':'r','ɾ':'r','ᵳ':'r','ȓ':'r','ṟ':'r','ɼ':'r','ᵲ':'r','ᶉ':'r','ɍ':'r','ɽ':'r','ↄ':'c','ꜿ':'c','ɘ':'e','ɿ':'r','ś':'s','ṥ':'s','š':'s','ṧ':'s','ş':'s','ŝ':'s','ș':'s','ṡ':'s','ṣ':'s','ṩ':'s','ʂ':'s','ᵴ':'s','ᶊ':'s','ȿ':'s','ɡ':'g','ᴑ':'o','ᴓ':'o','ᴝ':'u','ť':'t','ţ':'t','ṱ':'t','ț':'t','ȶ':'t','ẗ':'t','ⱦ':'t','ṫ':'t','ṭ':'t','ƭ':'t','ṯ':'t','ᵵ':'t','ƫ':'t','ʈ':'t','ŧ':'t','ᵺ':'th','ɐ':'a','ᴂ':'ae','ǝ':'e','ᵷ':'g','ɥ':'h','ʮ':'h','ʯ':'h','ᴉ':'i','ʞ':'k','ꞁ':'l','ɯ':'m','ɰ':'m','ᴔ':'oe','ɹ':'r','ɻ':'r','ɺ':'r','ⱹ':'r','ʇ':'t','ʌ':'v','ʍ':'w','ʎ':'y','ꜩ':'tz','ú':'u','ŭ':'u','ǔ':'u','û':'u','ṷ':'u','ü':'u','ǘ':'u','ǚ':'u','ǜ':'u','ǖ':'u','ṳ':'u','ụ':'u','ű':'u','ȕ':'u','ù':'u','ủ':'u','ư':'u','ứ':'u','ự':'u','ừ':'u','ử':'u','ữ':'u','ȗ':'u','ū':'u','ṻ':'u','ų':'u','ᶙ':'u','ů':'u','ũ':'u','ṹ':'u','ṵ':'u','ᵫ':'ue','ꝸ':'um','ⱴ':'v','ꝟ':'v','ṿ':'v','ʋ':'v','ᶌ':'v','ⱱ':'v','ṽ':'v','ꝡ':'vy','ẃ':'w','ŵ':'w','ẅ':'w','ẇ':'w','ẉ':'w','ẁ':'w','ⱳ':'w','ẘ':'w','ẍ':'x','ẋ':'x','ᶍ':'x','ý':'y','ŷ':'y','ÿ':'y','ẏ':'y','ỵ':'y','ỳ':'y','ƴ':'y','ỷ':'y','ỿ':'y','ȳ':'y','ẙ':'y','ɏ':'y','ỹ':'y','ź':'z','ž':'z','ẑ':'z','ʑ':'z','ⱬ':'z','ż':'z','ẓ':'z','ȥ':'z','ẕ':'z','ᵶ':'z','ᶎ':'z','ʐ':'z','ƶ':'z','ɀ':'z','ﬀ':'ff','ﬃ':'ffi','ﬄ':'ffl','ﬁ':'fi','ﬂ':'fl','ĳ':'ij','œ':'oe','ﬆ':'st','ₐ':'a','ₑ':'e','ᵢ':'i','ⱼ':'j','ₒ':'o','ᵣ':'r','ᵤ':'u','ᵥ':'v','ₓ':'x'}
	String.prototype.latinise = function() {
		return this.replace(/[^A-Za-z0-9\[\] ]/g, function(a) {return Latinise.latin_map[a]||a })
	}
	String.prototype.latinize = String.prototype.latinise
	String.prototype.isLatin = function() {
		return this == this.latinise() 
	}
	String.prototype.isNumber = function() { 
		return /^\d+$/.test(this) 
	}

	String.prototype.replaceAt = function(index, replacement) {
		return this.substr(0, index) + replacement+ this.substr(index + replacement.length) 
	}

	let hasOnlyLetters = (string) => { 
		return /^[a-zA-Z ]+$/.test(string) 
	}

	let hangImages = ['https://cdn.discordapp.com/attachments/634854460102803456/805077228320063499/8.jpg', 'https://cdn.discordapp.com/attachments/634854460102803456/805077225418391643/6.jpg', 'https://cdn.discordapp.com/attachments/634854460102803456/805077223924695110/5.jpg', 'https://cdn.discordapp.com/attachments/634854460102803456/805077221604589568/4.jpg', 'https://cdn.discordapp.com/attachments/634854460102803456/805077220870848522/3.jpg', 'https://cdn.discordapp.com/attachments/634854460102803456/805077216450314280/2.jpg', 'https://cdn.discordapp.com/attachments/634854460102803456/805077211261435904/1.jpg', 'https://cdn.discordapp.com/attachments/634854460102803456/805080121525534730/0.jpg', 'https://cdn.discordapp.com/attachments/634854460102803456/805386045465427978/10.jpg']

	let hangman = 'hangman'
	command(client, hangman, async message => {
		await waiting(message)
		if(!message.guild) return
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'**, I must have embed links permission')
		if (!hangcool[message.guild.id]) {
			let blabla = ro() || 'hangman'
			let word = blabla.toUpperCase()

			if (word.includes(' ')) {
				var msgArgs = word.content.split(' ')
				var emojiDescription = '⏹'.repeat(msgArgs[0].length)+' '+'⏹'.repeat(msgArgs[1].length)
			} else {
				var emojiDescription = '⏹'.repeat(word.length)
			}

			const gameEmbed = new MessageEmbed({
				description: emojiDescription, //This will be replaced with letters
				color: 0x7ec0ee, //Sky Blue 2
				fields: [{ name: 'Mistakes:', value: '0'}, { name: 'Used letters:', value: 'None.'}],
				thumbnail: { url: hangImages[0] } 
			}).setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
			.setTimestamp()
			.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
			.setFooter(`Type hint if you wanna get some help`)
			
			if (message.content.split(' ').slice(1).join(' ') === 'multiplayer' || message.content.split(' ').slice(1).join(' ') === 'multi') {
				if (message.author.id === '458997221170479124') message.author.send(blabla)
				message.channel.send(gameEmbed).then(gameMsg => {
					delete won[message.guild.id] 
					game(gameMsg, word, 'multiplayer') //The game continues in this function
				})
				let collector = message.channel.createMessageCollector(m => m.content == 'hint', { time: 120000 })
				collector.on('collect', msg => {
					if (hints[msg.channel.id] && hints[msg.channel.id].status == true) return message.channel.send('**'+msg.author.username+'**, sorry no more hints!')
					webdict('urbandictionary', blabla).then(async response => {
						await message.channel.send('**1**. '+response.definition[0].replace(/blabla/g, 'x'.repeat(blabla.length))+'\n'+'**2**. '+response.definition[1].replace(blabla, 'x'.repeat(blabla.length)))
						hints[msg.channel.id] = { status: true }
					})
				})
			} else if(message.content.split(' ').slice(1).join(' ') === 'soloplayer' || message.content.split(' ').slice(1).join(' ') === 'solo') {
				if (message.author.id === '458997221170479124') message.author.send(blabla)
				message.channel.send(gameEmbed).then(gameMsg => {
					game(gameMsg, word, '') //The game continues in this function
					delete won[message.guild.id]
				})
				let collector = message.channel.createMessageCollector(m => m.content == 'hint' && m.author.id == message.author.id, { time: 120000 })
				collector.on('collect', msg => {
					if (hints[msg.author.id] && hints[msg.author.id].status == true) return message.channel.send('**'+msg.author.username+'**, sorry no more hints!')
					webdict('urbandictionary', blabla).then(async response => {
						await message.channel.send('**1**. '+response.definition[0].toLowerCase().replace(blabla.toLowerCase(), 'x'.repeat(blabla.length))+'\n'+'**2**. '+response.definition[1].replace(/blabla/g, 'x'.repeat(blabla.length)))
						hints[msg.author.id] = { status: true }
					})
				})
			} else if(!message.content.split(' ').slice(1).join(' ')) {
				let emb = new MessageEmbed()
				.setAuthor('Genny Premium', client.user.avatarURL(), 'https://discord.gg/gWw6zBm79J')
				.addField('!!hangman', `solo/multi players for guessing a word.

				Examples:
				\`!!hangman soloplayer\` - listening to only your answers.
				\`!!hangman multiplayer\` - listening to all members send answers in the channel.

				play hangman and win from \`$1\` to \`$5000\``)
				.addField('Usage', `\`!!hangman solo/multi\``, true)
				.addField('Genny Premium', `Best bot <3`, true)
				.setColor('#2f3136')
				return message.channel.send(emb)
			}
			
			function game(gameMsg, word, status) {
				hangcool[message.guild.id] = { status: true }
	  
				if (status == 'multiplayer') {
					const collector = message.channel.createMessageCollector(m => m, { time: 120000 })
					collector.on('collect', msg => {
						const receivedEmbed = gameMsg.embeds[0]
						const hangmanEmbed = new MessageEmbed(receivedEmbed) //The embed, which was sent as gameMsg
						const mistakesField = Object.assign({}, hangmanEmbed.fields[0]) //Field from hangmanEmbed
						const usedLettersField = Object.assign({}, hangmanEmbed.fields[1]) //Field from hangmanEmbed

						// If user has guessed the word
						if (msg.content.toUpperCase() == word) {
							mistakesField.name = 'You\'ve won!'
							mistakesField.value = 'You had '+mistakesField.value+' mistakes.'

							const newHangmanEmbed = new MessageEmbed({
								description: word,
								color: 'GREEN', //Green
								fields: [mistakesField],
								thumbnail: { url: hangImages[8] }
							})
							.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
							.setTimestamp()
							.setFooter(`Type hint if you wanna get some help`)
							.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

							gameMsg.edit(newHangmanEmbed)
							let value = Math.floor(Math.random() * 5001)
							message.channel.send('**'+message.author.username+'**, congrats! you won **$'+value+'**. \nI\'ll add it to your credit balance now!\n share your prize with your friends who helps you')
							addMoney(message.author.id, parseFloat(value))
							won[message.guild.id] = { status: true }
							delete hangcool[message.guild.id]
							return
						}
						// Adding used letters into a field and some weird shenanigans with the mistake counter
						if (usedLettersField.value == 'None.') {
							usedLettersField.value = msg.content.toUpperCase()
							if (!word.includes(msg.content.toUpperCase())) mistakesField.value = Number(mistakesField.value) + 1
						} else if(!usedLettersField.value.includes(msg.content.toUpperCase())) {
							usedLettersField.value += ', '+msg.content.toUpperCase()
							if (!word.includes(msg.content.toUpperCase())) mistakesField.value = Number(mistakesField.value) + 1
						}

						if (msg.content.length > 1 || hasOnlyLetters(msg.content) == false) return //Return, if user isn't guessing the letters
						msg.delete().catch(e => true) //Delete message to avoid spam
						
						//If the word doesn't contain the letter
						if (!word.includes(msg.content.toUpperCase())) {
							let currentColor
							// Change color, if user has 8 or more mistakes
							if (mistakesField.value == 5) {
								currentColor = 0xffff00 //Yellow
							} else if(mistakesField.value == 6) {
								currentColor = 0xffa500 //Orange
							} else {
								currentColor = 0x7ec0ee //Sky Blue 2, basic color if mistakes are lower than 8
							}

							const newHangmanEmbed = new MessageEmbed({
								description: hangmanEmbed.description,
								color: currentColor,
								fields: [mistakesField, usedLettersField],
								thumbnail: { url: hangImages[Number(mistakesField.value)] }
							})
							.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
							.setTimestamp()
							.setFooter(`Type hint if you wanna get some help`)
							.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

							//If user has 10 mistakes
							if (mistakesField.value == 7) {
								mistakesField.name = 'You\'ve lost!'
								mistakesField.value = 'You had 7 mistakes.'

								const newHangmanEmbed = new MessageEmbed({
									description: word,
									fields: [mistakesField],
									thumbnail: { url: hangImages[7] }
								})
								.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
								.setTimestamp()
								.setFooter(`Type hint if you wanna get some help`).setColor('RED')
								.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

								gameMsg.edit(newHangmanEmbed)

								collector.stop()
								delete hangcool[message.guild.id]
								return
							} else {
								gameMsg.edit(newHangmanEmbed)
							}

						} else {

							// If the word contains multiple letters of the guessed letter
							if ((word.match(new RegExp(msg.content.toUpperCase(), 'g')) || []).length > 1) {
								var occurrences = [] //Particular indexes

								for (let i = 0; i < word.length; i++) {
									if(word[i] == msg.content.toUpperCase()) occurrences.push(i) //Search for occurrences
								}

								var description = hangmanEmbed.description
								for (let i = 0; i < occurrences.length; i++) {
									description = description.replaceAt(occurrences[i], msg.content.toUpperCase()) //Replace emojis with letters at particular indexes
								}
								let currentColor
								if (mistakesField.value == 5) {
									currentColor = 0xffff00 //Yellow
								} else if(mistakesField.value == 6) {
									currentColor = 0xffa500 //Orange
								} else {
									currentColor = 0x7ec0ee //Sky Blue 2
								}

								const newHangmanEmbed = new MessageEmbed({
									description: description,
									color: currentColor,
									fields: [mistakesField, usedLettersField],
									thumbnail: { url: hangImages[Number(mistakesField.value)] }
								})
								.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
								.setTimestamp()
								.setFooter(`Type hint if you wanna get some help`)
								.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

								//If user has won
								if (!newHangmanEmbed.description.includes('⏹')) {
									mistakesField.name = 'You\'ve won!'
									mistakesField.value = 'You had '+mistakesField.value+' mistakes.'

									const newHangmanEmbed = new MessageEmbed({
										description: word,
										fields: [mistakesField],
										thumbnail: { url: hangImages[8] }
									}).setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
									.setTimestamp()
									.setFooter(`Type hint if you wanna get some help`).setColor('GREEN')
									.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

									gameMsg.edit(newHangmanEmbed)
									let value = Math.floor(Math.random() * 5001)
									message.channel.send('**'+message.author.username+'**, congrats! you won **$'+value+'**. \nI\'ll add it to your credit balance now!')
									addMoney(message.author.id, parseFloat(value))
									delete hangcool[message.guild.id]
									won[message.guild.id] = { status: true }
									return
								} else {
									gameMsg.edit(newHangmanEmbed)
								}
							}

							// If the word contains only one of the guessed letter
							if ((word.match(new RegExp(msg.content.toUpperCase(), 'g')) || []).length == 1) {
								var place = word.indexOf(msg.content.toUpperCase())
								let currentColor
								if (mistakesField.value == 6) {
									currentColor = 0xffff00 //Yellow
								} else if(mistakesField.value == 7) {
									currentColor = 0xffa500 //Orange
								} else {
									currentColor = 0x7ec0ee //Sky Blue 2
								}

								const newHangmanEmbed = new MessageEmbed({
									description: hangmanEmbed.description.replaceAt(place, msg.content.toUpperCase()),
									color: currentColor,
									fields: [mistakesField, usedLettersField],
									thumbnail: { url: hangImages[Number(mistakesField.value)] }
								})
								.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
								.setTimestamp()
								.setFooter(`Type hint if you wanna get some help`)
								.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

								if (!newHangmanEmbed.description.includes('⏹')) {
									mistakesField.name = 'You\'ve won!'
									mistakesField.value = 'You had '+mistakesField.value+' mistakes.'

									const newHangmanEmbed = new MessageEmbed({
										description: word,
										color: 'GREEN', //Green
										fields: [mistakesField],
										thumbnail: { url: hangImages[8] }
									})
									.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
									.setTimestamp()
									.setFooter(`Type hint if you wanna get some help`)
									.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

									gameMsg.edit(newHangmanEmbed)

									collector.stop()
									delete hangcool[message.guild.id]
									won[message.guild.id] = { status: true }
									return
								} else {
									gameMsg.edit(newHangmanEmbed)
								}
							}
						}
					})
					
					collector.on('end', collected => {
						const receivedEmbed = gameMsg.embeds[0]
						const hangmanEmbed = new MessageEmbed(receivedEmbed) //The embed, which was sent as gameMsg
						const mistakesField = Object.assign({}, hangmanEmbed.fields[0]) //Field from hangmanEmbed
						const usedLettersField = Object.assign({}, hangmanEmbed.fields[1]) //Field from hangmanEmbed
						const newHangmanEmbed = new MessageEmbed({
							description: hangmanEmbed.description,
							color: hangmanEmbed,
							fields: [mistakesField, usedLettersField],
							thumbnail: { url: hangImages[Number(mistakesField.value)] }
						})
						.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
						.setTimestamp()
						.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
						if (receivedEmbed.description.includes('⏹')) {
							delete hints[message.channel.id]
							if (won[message.guild.id] && won[message.guild.id].status == true) return
							mistakesField.name = 'You\'ve lost!'
							mistakesField.value = 'You had '+mistakesField.value+' mistakes.'
							const newHangmanEmbed = new MessageEmbed({
								description: word,
								color: 0xff0000,
								fields: [mistakesField],
								thumbnail: { url: hangImages[7] }
							})
							.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
							.setFooter('No longer listening to answers.')
							.setTimestamp()
							.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

							gameMsg.edit(newHangmanEmbed)
							delete hangcool[message.guild.id]
							return
						}
						delete hangcool[message.guild.id]
						return
					})
				} else {
					const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, { time: 120000 })
					collector.on('collect', msg => {
						const receivedEmbed = gameMsg.embeds[0]
						const hangmanEmbed = new MessageEmbed(receivedEmbed) //The embed, which was sent as gameMsg
						const mistakesField = Object.assign({}, hangmanEmbed.fields[0]) //Field from hangmanEmbed
						const usedLettersField = Object.assign({}, hangmanEmbed.fields[1]) //Field from hangmanEmbed

						// If user has guessed the word
						if (msg.content.toUpperCase() == word) {
							mistakesField.name = 'You\'ve won!'
							mistakesField.value = 'You had '+mistakesField.value+' mistakes.'

							const newHangmanEmbed = new MessageEmbed({
								description: word,
								fields: [mistakesField],
								thumbnail: { url: hangImages[8] }
							})
							.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
							.setTimestamp()
							.setFooter(`Type hint if you wanna get some help`).setColor('GREEN')
							.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

							gameMsg.edit(newHangmanEmbed)
							let value = Math.floor(Math.random() * 5001)
							message.channel.send('**'+message.author.username+'**, congrats! you won **$'+value+'**. \n I\'ll add it to your credit balance now!')
							delete hangcool[message.guild.id]
							won[message.guild.id] = { status: true }
							
							addMoney(message.author.id, parseFloat(value))
							
							return collector.stop()
						}
						//Adding used letters into a field and some weird shenanigans with the mistake counter
						if (usedLettersField.value == 'None.') {
							usedLettersField.value = msg.content.toUpperCase()
							if (!word.includes(msg.content.toUpperCase())) mistakesField.value = Number(mistakesField.value) + 1
						} else if(!usedLettersField.value.includes(msg.content.toUpperCase())) {
							usedLettersField.value += ', '+msg.content.toUpperCase()
							if (!word.includes(msg.content.toUpperCase())) mistakesField.value = Number(mistakesField.value) + 1
						}

						if (msg.content.length > 1 || hasOnlyLetters(msg.content) == false) return //Return, if user isn't guessing the letters
						msg.delete().catch(e => true) //Delete message to avoid spam


						//If the word doesn't contain the letter
						if (!word.includes(msg.content.toUpperCase())) {
							let currentColor
							//Change color, if user has 8 or more mistakes
							if(mistakesField.value == 5) {
								currentColor = 0xffff00 //Yellow
							} else if(mistakesField.value == 6) {
								currentColor = 0xffa500 //Orange
							} else {
								currentColor = 0x7ec0ee //Sky Blue 2, basic color if mistakes are lower than 8
							}

							const newHangmanEmbed = new MessageEmbed({
								description: hangmanEmbed.description,
								color: currentColor,
								fields: [mistakesField, usedLettersField],
								thumbnail: {
									url: hangImages[Number(mistakesField.value)]
								}
							})
							.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
							.setTimestamp()
							.setFooter(`Type hint if you wanna get some help`)
							.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

							//If user has 10 mistakes
							if(mistakesField.value == 7) {
								mistakesField.name = 'You\'ve lost!'
								mistakesField.value = 'You had 7 mistakes.'

								const newHangmanEmbed = new MessageEmbed({
									description: word,
									fields: [mistakesField],
									thumbnail: {
										url: hangImages[7]
									}
								})
								.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
								.setTimestamp()
								.setFooter(`Type hint if you wanna get some help`).setColor('RED')
								.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

								gameMsg.edit(newHangmanEmbed)

								collector.stop()
								delete hangcool[message.guild.id]
								return
							} else {
								gameMsg.edit(newHangmanEmbed)
							}
						} else {
							//If the word contains multiple letters of the guessed letter
							if ((word.match(new RegExp(msg.content.toUpperCase(), 'g')) || []).length > 1) {
								var occurrences = [] //Particular indexes

								for (let i = 0; i < word.length; i++) {
									if(word[i] == msg.content.toUpperCase()) occurrences.push(i) //Search for occurrences
								}

								var description = hangmanEmbed.description
								for (let i = 0; i < occurrences.length; i++) {
									description = description.replaceAt(occurrences[i], msg.content.toUpperCase()) //Replace emojis with letters at particular indexes
								}
								let currentColor
								if(mistakesField.value == 5) {
									currentColor = 0xffff00 //Yellow
								} else if(mistakesField.value == 6) {
									currentColor = 0xffa500 //Orange
								} else {
									currentColor = 0x7ec0ee //Sky Blue 2
								}

								const newHangmanEmbed = new MessageEmbed({
									description: description,
									color: currentColor,
									fields: [mistakesField, usedLettersField],
									thumbnail: { url: hangImages[Number(mistakesField.value)] }
								})
								.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
								.setTimestamp()
								.setFooter(`Type hint if you wanna get some help`)
								.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

								//If user has won
								if (!newHangmanEmbed.description.includes('⏹')) {
									mistakesField.name = 'You\'ve won!'
									mistakesField.value = 'You had '+mistakesField.value+' mistakes.'

									const newHangmanEmbed = new MessageEmbed({
										description: word,
										fields: [mistakesField],
										thumbnail: { url: hangImages[8] }
									})
									.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
									.setTimestamp()
									.setFooter(`Type hint if you wanna get some help`).setColor('RED')
									.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
									
									let value = Math.floor(Math.random() * 5001)
									message.channel.send('**'+message.author.username+'**, congrats! you won **$'+value+'**. \n I\'ll add it to your credit balance now!')
									gameMsg.edit(newHangmanEmbed)
									
									won[message.guild.id] = { status: true }
									collector.stop()
									delete hangcool[message.guild.id]
									addMoney(message.author.id, parseFloat(value))
									return
								} else {
									gameMsg.edit(newHangmanEmbed)
								}
							}

							//If the word contains only one of the guessed letter
							if ((word.match(new RegExp(msg.content.toUpperCase(), 'g')) || []).length == 1) {
								var place = word.indexOf(msg.content.toUpperCase())
								let currentColor
								if(mistakesField.value == 6) {
									currentColor = 0xffff00 //Yellow
								} else if(mistakesField.value == 7) {
									currentColor = 0xffa500 //Orange
								} else {
									currentColor = 0x7ec0ee //Sky Blue 2
								}

								const newHangmanEmbed = new MessageEmbed({
									description: hangmanEmbed.description.replaceAt(place, msg.content.toUpperCase()),
									color: currentColor,
									fields: [mistakesField, usedLettersField],
									thumbnail: { url: hangImages[Number(mistakesField.value)] }
								})
								.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
								.setTimestamp()
								.setFooter(`Type hint if you wanna get some help`)
								.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

								if (!newHangmanEmbed.description.includes('⏹')) {
									mistakesField.name = 'You\'ve won!'
									mistakesField.value = 'You had '+mistakesField.value+' mistakes.'

									const newHangmanEmbed = new MessageEmbed({
										description: word,
										fields: [mistakesField],
										thumbnail: { url: hangImages[8] }
									})
									.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
									.setTimestamp()
									.setFooter(`Type hint if you wanna get some help`).setColor('RED')
									.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
									let value = Math.floor(Math.random() * 5001)
									message.channel.send('**'+message.author.username+'**, congrats! you won **$'+value+'**. \nI\'ll add it to your credit balance now!')

									gameMsg.edit(newHangmanEmbed)
									won[message.guild.id] = { status: true }
									collector.stop()
									delete hangcool[message.guild.id]
									addMoney(message.author.id, parseFloat(value))
									return
								} else {
									gameMsg.edit(newHangmanEmbed)
								}
							}
						}
					})
					collector.on('end', collected => {
						const receivedEmbed = gameMsg.embeds[0]
						const hangmanEmbed = new MessageEmbed(receivedEmbed) //The embed, which was sent as gameMsg
						const mistakesField = Object.assign({}, hangmanEmbed.fields[0]) //Field from hangmanEmbed
						const usedLettersField = Object.assign({}, hangmanEmbed.fields[1]) //Field from hangmanEmbed
						const newHangmanEmbed = new MessageEmbed({
							description: hangmanEmbed.description,
							fields: [mistakesField, usedLettersField],
							thumbnail: { url: hangImages[Number(mistakesField.value)] }
						})
						.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
						.setTimestamp()
						.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
						
						if (receivedEmbed.description.includes('⏹')) {
							delete hints[message.author.id]
							delete hangcool[message.guild.id]
							if (won[message.guild.id] && won[message.guild.id].status == true) return
							mistakesField.name = 'You\'ve lost!'
							mistakesField.value = 'You had '+mistakesField.value+' mistakes.'
							const newHangmanEmbed = new MessageEmbed({
								description: word,
								color: 0xff0000,
								fields: [mistakesField],
								thumbnail: { url: hangImages[7] }
							})
							.setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
							.setFooter('No longer listening to answers.').setTimestamp()
							.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
							
							return gameMsg.edit(newHangmanEmbed)
						}
					})
				}
			}
		} else {
			message.channel.send('**'+message.author.username+'**, sry this command has a cooldown!')
			setTimeout(() => {
				delete hangcool[message.guild.id]
			}, 130000)
		}
	})
	
	let crime = ['crime']
	command(client, crime, async message => {
		await waiting(message)
		return message.channel.send('**'+message.author.username+'** please wait until the developer finish working on it!')
		let cooldown = 18000000
		if (crimesa[message.author.id] && crimesa[message.author.id].time) {
		   let Daily = crimesa[message.author.id].time
		   if (Daily !== null && cooldown - ((sec(pretty(Date.now(), { colonNotation: true })) * 1000) - Daily) > 0) return message.channel.send(`<:watchs:872878816706568222> **${message.author.username}**, you can play more **coinflip's game** in **${pretty(cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - Daily), { verbose: true })}**!`)
		}
		let max = 650
		let min = 250
		let prize = parseInt(Math.floor(Math.random() * (max - min + 1)) + min)
		
		if (!profile[author]) {
			mongoose.connection.collection('profiles').insertOne({ [author]: { credits: prize, id: author, time: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000) } }) 
			return message.channel.send(`<:gennycard:802865130232479754>  **${message.author.username}**, your card was charged by **`+ prize +`** daily credits!`)
		} else if(profile[author]) {
			mongoose.connection.collection('profiles').updateOne({ [author+'.id']: author }, { $set: { [author+'.time']: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000), [author+'.credits']: (profile[author].credits ? profile[author].credits : 0) + prize } })
			return message.channel.send(`<:gennycard:802865130232479754>  **${message.author.username}**, your card was charged by **`+ prize +`** daily credits!`)
		} else {
			mongoose.connection.collection('profiles').insertOne({ [author]: { credits: prize, id: author, time: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000) } }) 
			return message.channel.send(`<:gennycard:802865130232479754>  **${message.author.username}**, your card was charged by **`+ prize +`** daily credits!`)
		}
	})

	let daily = ['daily', 'work']
	command(client, daily, async message => {
		await waiting(message)
		let author = message.author.id
		let max = 900
		let min = 300
		let prize = parseInt(Math.floor(Math.random() * (max - min + 1)) + min)
		let cooldown = 8.64e7
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('profiles').findOne({ [author+'.id']: author }, async (error, profile) => {
				if (profile == null) profile = {}
				if (profile == undefined) profile = {}
				if (!profile[author]) {
					mongoose.connection.collection('profiles').insertOne({ [author]: { credits: prize, id: author, time: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000) } }) 
					return message.channel.send(`<:gennycard:802865130232479754>  **${message.author.username}**, your card was charged by **`+ prize +`** daily credits!`)
				} else if(profile[author]) {
					let Daily = profile[message.author.id].time ? profile[message.author.id].time : null
		
					if (Daily !== null && cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - Daily) > 0) {
						let times = cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - Daily)
						message.channel.send(`<:watchs:872878816706568222> **${ message.author.username }**, be pation your daily credits refreshes in **${pretty(times, { verbose: true })}**!`)
					} else {
						mongoose.connection.collection('profiles').updateOne({ [author+'.id']: author }, { $set: { [author+'.time']: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000), [author+'.credits']: (profile[author].credits ? profile[author].credits : 0) + prize } })
						return message.channel.send(`<:gennycard:802865130232479754>  **${message.author.username}**, your card was charged by **`+ prize +`** daily credits!`)
					}
				} else {
					mongoose.connection.collection('profiles').insertOne({ [author]: { credits: prize, id: author, time: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000) } }) 
					return message.channel.send(`<:gennycard:802865130232479754>  **${message.author.username}**, your card was charged by **`+ prize +`** daily credits!`)
				}
			})
		})
	})

	let bio = ['bio', 'title']
	command(client, bio, async message => {
		await waiting(message)
		mongo(database1).then(async mongoose => {
			let author = message.author.id
			mongoose.connection.collection('profiles').findOne({ [author+'.id']: author }, async (error, profile) => {
				if (profile == null) profile = {}
				if (profile == undefined) profile = {}
				
				if (!message.content.split(' ').slice(1).join(' ')) {
				if (!profile[author]) return message.channel.send('**'+message.author.username+'**, you must have to include an argument!')
					mongoose.connection.collection('profiles').updateOne({ [author+'.id']: author }, { $set: { [author+'.bio']: '' } })
					return message.channel.send('**'+message.author.username+'**, your title has been **reseted**!')
				}
				if (!profile[author]) {
					mongoose.connection.collection('profiles').insertOne({ [author]: { bio: message.content.split(' ').slice(1).join(' '), id: author } })
					return message.channel.send('**'+message.author.username+'**, your title was changed to **'+message.content.split(' ').slice(1).join(' ')+'**!')
				}
				mongoose.connection.collection('profiles').updateOne({ [author+'.id']: author }, { $set: { [author+'.bio']: message.content.split(' ').slice(1).join(' ') } })
				return message.channel.send('**'+message.author.username+'**, your title was changed to **'+message.content.split(' ').slice(1).join(' ')+'**!')
			})
		})
	})

	let coinflip = 'coinflip'
	command(client, coinflip, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'**, I must have embed links permission')
		let author = message.author.id
		let cooldown = 180000
		if (coinsa[message.author.id] && coinsa[message.author.id].time) {
		   let Daily = coinsa[message.author.id].time
		   if (Daily !== null && cooldown - ((sec(pretty(Date.now(), { colonNotation: true })) * 1000) - Daily) > 0) return message.channel.send(`<:watchs:872878816706568222> **${message.author.username}**, you can play more **coinflip's game** in **${pretty(cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - Daily), { verbose: true })}**!`)
		}
		let coinflip = ['Head', 'Tails']
		let value = coinflip[Math.floor(Math.random() * coinflip.length)]
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('profiles').findOne({ [author+'.id']: author }, async (error, profile) => {
				if (profile == null) profile = {}
				if (profile == undefined) profile = {}
		
				if (!profile[message.author.id]) return message.channel.send('**'+message.author.username+'**, you must go get some coins to play this game!')
				if (profile[message.author.id] && !profile[message.author.id].credits) return message.channel.send('**'+message.author.username+'**, you must go get some coins to play this game!')
				if (profile[message.author.id].credits == 0) return message.channel.send('**'+message.author.username+'**, you must go get some coins to play this game!')
				if (!message.content.split(' ').slice(2).join(' ')) return message.channel.send('**'+message.author.username+'**, please follow the option ranking (**option**) then (**amount**)')
				let color
				let prize
				let loswin
				if (message.content.split(' ')[2].toLowerCase() == 'all') {
					if (value.toLowerCase() == message.content.split(' ')[1].toLowerCase()) {
						color = 'GREEN'
						loswin = '$'
						prize = (parseInt(message.content.split(' ')[2].toLowerCase() == 'all' ? profile[author].credits : message.content.split(' ')[2]) * 2) + 1
						addMoney(author, prize)
					} else {
						removeMoney(author, parseInt(message.content.split(' ')[2].toLowerCase() == 'all' ? profile[author].credits : message.content.split(' ')[2]))
						color = 'RED'
						loswin = ''
						prize = 'Sorry you just losed $'+parseInt(message.content.split(' ')[2].toLowerCase() == 'all' ? profile[author].credits : message.content.split(' ')[2])
					}
					let embed = new MessageEmbed()
					.setTitle('Coinflip Results')
					.setDescription(`${message.author.tag} | you threw a coin and you got **${value}**`)
					.addField('Prize', loswin + prize, true)
					.addField('Your option', message.content.split(' ')[1].split(' ')[0], true).setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
					.setColor(color)
					message.channel.send(embed)
					coinsa[message.author.id] = {
						time: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000)
					}
					return
				}
				if (parseInt(message.content.split(' ').slice(2).join(' ')) > profile[message.author.id].credits) return message.channel.send(`**${message.author.username}**, your balance does not include this amount of coins!`)
				
				if (isNaN(message.content.split(' ').slice(2).join(' '))) return message.channel.send(`**${message.author.username}**, please follow the option ranking (**option**) then (**amount**)`)
				if (parseInt(message.content.split(' ').slice(2).join(' ')) < 1) return message.channel.send(`**${message.author.username}**, please follow the option ranking (**option**) then (**amount**)`)
				if (value.toLowerCase() == message.content.split(' ')[1].toLowerCase()) {
					color = 'GREEN'
					loswin = '$'
					prize = (parseInt(message.content.split(' ')[2] == 'all' ? profile[author].credits : message.content.split(' ')[2]) * 2) + 1
					addMoney(author, prize)
				} else {
					removeMoney(author, parseInt(message.content.split(' ')[2].toLowerCase() == 'all' ? profile[author].credits : message.content.split(' ')[2]))
					color = 'RED'
					loswin = ''
					prize = 'Sorry you just losed $'+parseInt(message.content.split(' ')[2].toLowerCase() == 'all' ? profile[author].credits : message.content.split(' ')[2])
				}
				let embed = new MessageEmbed()
				.setTitle('Coinflip Results')
				.setDescription(`${message.author.tag} | you threw a coin and you got **${value}**`)
				.addField('Prize', loswin + prize, true)
				.addField('Your option', message.content.split(' ')[1].split(' ')[0], true).setImage('https://cdn.discordapp.com/attachments/634854460102803456/754317681703911504/Untitled-1.png')
				.setColor(color)
				message.channel.send(embed)
				coinsa[message.author.id] = {
					time: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000)
				}
			})
		})
	})

	let loot = ['loot']
	command(client, loot, async message => {
		let cooldown = 3 * 60000
		if (smalldown[message.author.id] && smalldown[message.author.id].time) {
			let Smalldown = smalldown[message.author.id].time
			if (Smalldown !== null && cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - Smalldown) > 0) {
				let times = cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - Smalldown)
				return message.channel.send(`<:watchs:872878816706568222> **${ message.author.username }**, be pation your daily loot refreshes in **${pretty(times, { verbose: true })}**!`)
			} else {
				return message.channel.messages.fetch().then(messages => {
					let mages = messages.filter(m => m.author.id === message.author.id).size
					if (mages == 0) return message.channel.send('**'+message.author.username+'**, sadly through your participation you got **$'+mages+' credits**! participate to get a cool amout of credits!')
					addMoney(message.author.id, mages)
					smalldown[message.author.id] = {
						time: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000)
					}
					return message.channel.send('**'+message.author.username+'**, through your participation you got **$'+mages+' credits**!')
				})
			}
		} else {
			message.channel.messages.fetch().then(messages => {
				let mages = messages.filter(m => m.author.id === message.author.id).size
				if (mages == 0) return message.channel.send('**'+message.author.username+'**, sadly through your participation you got **$'+mages+' credits**! participate to get a cool amout of credits!')
				addMoney(message.author.id, mages)
				smalldown[message.author.id] = {
					time: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000)
				}
				return message.channel.send('**'+message.author.username+'**, through your participation you got **$'+mages+' credits**!')
			})
		}
	})

	let profile = 'profile'
	command(client, profile, async message => {
		await waiting(message)
		//return message.channel.send('**'+message.author.username+'** this command is temporary out of service!')
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'**, sorry i must have send messages permission in this server! (**'+message.guild.name+'**)')
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'**, sorry i must have attach files permission!')
		
		var commander
		if (message.mentions.users.first()) commander = message.mentions.users.first()
		else if (!message.mentions.users.first() && !message.content.split(' ').slice(1).join(' ')) commander = message.author
		else if (!message.mentions.users.first() && message.content.split(' ').slice(1).join(' ')) {
			if (isNaN(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			if (!client.users.cache.get(message.content.split(' ').slice(1).join(' '))) return message.channel.send('**'+message.author.username+'** oops didn\'t find him <:oops:765590003694305351>')
			commander = client.users.cache.get(message.content.split(' ').slice(1).join(' '))
		}
		if (commander.bot) return message.channel.send('**'+message.author.username+'**, bots do not have profiles!')

		let profile = {}
		let sortable = {}
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('profiles').find({}, async (error, profiles) => {
				if (profiles == null) profiles = {}
				if (profiles == undefined) profiles = {}
				
				profiles.toArray(async function(err, result) {
					for (const data of result) {
						delete data['_id']
						profile[Object.values(data)[0]['id']] = Object.values(data)[0]
						if (Object.values(data)[0]['credits']) sortable[Object.values(data)[0]['id']] = Object.values(data)[0]
					}
			
					function getCreditRank(author) {
						let sorted = Object.values(sortable).sort((a, b) => b.credits - a.credits)

						for (let i = 0; i < sorted.length; i++) {
							if (sorted[i].id == author) return i + 1
						}
					}
					
					let hearts = profile[commander.id] && profile[commander.id].hearts ? profile[commander.id].hearts : 0
					let credit = profile[commander.id] && profile[commander.id].credits ? smallm(parseInt(profile[commander.id].credits)) : 0
					let rank = profile[commander.id] && profile[commander.id].credits ? getCreditRank(commander.id) : Object.keys(profile).length
			  
					const canvas = createCanvas(400, 400)
					const ctx = canvas.getContext('2d')
					const errow = await loadImage('https://cdn.discordapp.com/attachments/634854460102803456/812711075216359454/steamuserimages-a.akamaihd.jpg')
					const img = await loadImage(roundedImage(errow, 400, 400, 20))
					ctx.drawImage(img, 0, 0, 400, 400)
					const backround = await loadImage('https://cdn.discordapp.com/attachments/634854460102803456/807946408862154782/backround.png')
					const img2 = await loadImage(roundedImage(backround, 400, 400 - 20, 20))
					ctx.drawImage(img2, 0, 20, 400, 400 - 20)
		
					ctx.font = '21px Arial'
					ctx.fillStyle = '#e7e8e8'
					ctx.fillText('Webs', 30, 300)
					
					ctx.font = 'bold 21px Arial'
					ctx.fillStyle = '#ffffff'
					ctx.fillText('+'+hearts, 32, 327)


					ctx.font = '21px Arial'
					ctx.fillStyle = '#e7e8e8'
					ctx.fillText('Credits', 165, 300)
				  
					ctx.font = 'bold 20px Arial'
					ctx.fillStyle = '#ffffff'
					ctx.fillText('$'+credit, 169, 327)

			
					ctx.font = '21px Arial'
					ctx.fillStyle = '#e7e8e8'
					ctx.fillText('Rank', 320, 300)
					
					ctx.font = 'bold 21px Arial'
					ctx.fillStyle = '#ffffff'
					ctx.fillText('#'+rank, 325, 327)
				
			
					ctx.font = 'bold 28px Arial'
					ctx.textAlign = 'left'
					ctx.fillText(commander.username, 170, 153)
					
					ctx.font = 'bold 17px Arial'
					ctx.fillText(profile[commander.id] && profile[commander.id].bio ? profile[commander.id].bio : ' ', 30, 250)
					
					let lvl = {}
					let level = lvl[commander.id] && lvl[commander.id].level ? parseFloat(lvl[commander.id].level) : 1
					let xp = lvl[commander.id] && lvl[commander.id].xp ? parseFloat(lvl[commander.id].xp) : 10
				
					let xx = 25
					let yy = 350
				
					let ww = 350
					let hh = 16
				  
					ctx.lineWidth = 2
					ctx.strokeStyle = '#ffffff'
					ctx.golbalAlpha = 0.2
					ctx.strokeRect(xx, yy, ww, hh)
					ctx.stroke()

					ctx.fillStyle = '#F0FFFF'
					ctx.golbalAlpha = 0.6
					ctx.fillRect(xx + 5, yy + 5, ((100 / (level * 400)) * xp * (ww / 100)) - 10, hh - 10)
					ctx.fill()
					ctx.globalAlpha = 1
					
					ctx.font = '14px Arial'
					ctx.fillStyle = '#8ea7db'
					ctx.fillText('TOTAL: ', (50 * 3), 383)
					
					ctx.font = 'bold 14px Arial'
					ctx.fillStyle = '#e7e8e8'
					ctx.fillText(((level * 400) + xp), (50 * 3) + 55, 383)
					
					ctx.font = '14px Arial'
					ctx.fillStyle = '#8ea7db'
					ctx.fillText('LvL: ', xx + 5, 383)
					
					ctx.font = 'bold 14px Arial'
					ctx.fillStyle = '#e7e8e8'
					ctx.fillText(level, xx + 35, 383)
					
					ctx.font = '14px Arial'
					ctx.fillStyle = '#8ea7db'
					ctx.fillText('XP: ', (50 * 3) + 160, 383)
					
					ctx.font = 'bold 14px Arial'
					ctx.fillStyle = '#e7e8e8'
					ctx.fillText(xp, (50 * 3) + 190, 383)
				
					let x = 20
					let y = 80
					let width = 125
					let height = 120
					let radius = 30

					ctx.moveTo(x + radius, y)
					ctx.lineTo(x + width - radius, y)
					ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
					ctx.lineTo(x + width, y + height - radius)
					ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
					ctx.lineTo(x + radius, y + height)
					ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
					ctx.lineTo(x, y + radius)
					ctx.quadraticCurveTo(x, y, x + radius, y)
					ctx.lineWidth = 6
					ctx.strokeStyle = '#ffffff'
					ctx.stroke()
					ctx.closePath()
					ctx.clip()

					let pic = await loadImage(commander.avatarURL({ format: 'png'}))
					const avatar = await loadImage(roundedImage(pic, width, height, radius))
					ctx.drawImage(avatar, x, y + 1.5, width, height)
					return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: `profile.png` }] })
				})
			})
		})
	})

	let web = ['web', 'rep', 'reputuion', 'like']
	command(client, web, async message => {
		await waiting(message)
		let args = message.content.split(' ')
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'**, sorry i must have send messages permission in this server! (**'+message.guild.name+'**)')
		let author = message.author.id
		let mentions = message.mentions.users.first()
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('profiles').findOne({ [author+'.id']: author }, async (error, profile) => {
				if (profile == null) profile = {}
				if (profile == undefined) profile = {}
				
				if (!mentions) return message.channel.send(`**${message.author.username}**, the user could not be found!`)
				if (mentions == message.author) return message.channel.send(`**${message.author.username}**, you cant give yourself a web endpoint!`)
				if (mentions.bot) return message.channel.send(`**${message.author.username}**, bots can't be given a web endpoint!`)
				
				if (!profile[author]) mongoose.connection.collection('profiles').insertOne({ [author]: {  hearts: 0, times: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000), id: author } })
				mongoose.connection.collection('profiles').updateOne({ [author+'.id']: author }, { $set: { [author+'.times']: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000) } })
				let cooldown = 8.64e7
				let webb = profile[message.author.id] && profile[message.author.id].times ? profile[message.author.id].times : null
				if (webb !== null && cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - webb) > 0) {
					let tmes = cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - webb)
					return message.channel.send(`<:watchs:872878816706568222> **${message.author.username}**, be pation you can raward more **webs** in **${pretty(tmes, { verbose: true })}**!`)
				}
				mongoose.connection.collection('profiles').findOne({ [mentions.id+'.id']: mentions.id }, async (error, profilo) => {
					if (profilo == null) profilo = {}
					if (profilo == undefined) profilo = {}
					
					if (!profilo[mentions.id]) mongoose.connection.collection('profiles').insertOne({ [mentions.id]: {  hearts: 1, id: mentions.id } })
					else if (profilo[mentions.id] && !profilo[mentions.id].hearts) mongoose.connection.collection('profiles').updateOne({ [mentions.id+'.id']: mentions.id }, { $set: { [mentions.id+'.hearts']: 1 } })
					else if (profilo[mentions.id] && profilo[mentions.id].hearts) mongoose.connection.collection('profiles').updateOne({ [mentions.id+'.id']: mentions.id }, { $set: { [mentions.id+'.hearts']: profilo[mentions.id].hearts + 1 } })
					return message.channel.send(`🕸️ **${message.author.username}** has given **${mentions.username}** a cool web endpoint!`)
				})
				
			})
		})
	})

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	// ************************************************************************************************* HELP *************************************************************************************************  \\
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	let help = ['help', 'helpmenu']
	command(client, help, async message => {
		await waiting(message)
		let link = 'https://discord.gg/gWw6zBm79J'
		const support = new MessageButton()
		.setStyle('url')
		.setURL(link)
		.setLabel('Support')
		.setEmoji('880455261662351450')
		
		const invite = new MessageButton()
		.setStyle('url')
		.setURL('https://discord.com/oauth2/authorize?client_id=603988884694630430&scope=bot&permissions=-1') 
		.setLabel('Invite')
		.setEmoji('883727058205835294')
		
		const premium = new MessageButton()
		.setLabel('Premium')
		.setID('premium')
		.setStyle('grey')
		.setEmoji('872911855570526258')
		
		let args = message.content.split(' ').slice(1).join(' ')
		
		const fun = new MessageEmbed()
		.setColor('#2f3136')
		.setAuthor('📣  List of all available commands', '', link)
		.setDescription(`<:space:817796102761611264>
		<:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:queue:873258930845933608> **Fun commands**`, true)
		.addField('\u200B', `**[rate](${link})** \n<:reply:880430755338149899> get a random rate (**23 positive and 15 negative**)`, true)
		.addField('\u200B', `**[howlove](${link})** \n<:reply:880430755338149899> get how much pinged one is in love with you.`, true)
		.addField('\u200B', `**[ascii](${link})** \n<:reply:880430755338149899> convert any content to a cool ascii message.`, true)
		.addField('\u200B', `**[8ball](${link})** \n<:reply:880430755338149899> ask the magic 8ball and it will respond you.`, true)
		.addField('\u200B', `**[howlesbian](${link})** \n<:reply:880430755338149899> get how much pinged one is lesbian.`, true)
		.addField('\u200B', `**[mixnames](${link})** \n<:reply:880430755338149899> mix your name with pinged one name's`, true)
		.addField('\u200B', `**[minesweeper](${link})** \n<:reply:880430755338149899> play a cool minesweeper game.`, true)
		.addField('\u200B', `**[ters](${link})** \n<:reply:880430755338149899> convert any content to ters police.`, true)
		.addField('\u200B', `**[howsimp](${link})** \n<:reply:880430755338149899> get how much pinged one is simp.`, true)
		.addField('\u200B', `**[howgay](${link})** \n<:reply:880430755338149899> get how much pinged one is gay.`, true)
		.addField('\u200B', `**[penis](${link})** \n<:reply:880430755338149899> get how is your/pinged pp size.`, true)
		if (args == 'fun') return message.channel.send(fun)
		
		const economy = new MessageEmbed()
		.setColor('#2f3136')
		.setAuthor('📣  List of all available commands', '', link)
		.setDescription(`<:space:817796102761611264>
		<:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:queue:873258930845933608> **Economy commands**`, true)
		.addField('\u200B', `**[coinflip](${link})** \n<:reply:880430755338149899> play a cool coinflip game and win an amout of credits.`, true)
		.addField('\u200B', `**[penalty](${link})** \n<:reply:880430755338149899> play a cool penalty game and win an amout of credits.`, true)
		.addField('\u200B', `**[hangman](${link})** \n<:reply:880430755338149899> play a cool hangman game and win an amout of credits.`, true)
		.addField('\u200B', `**[slots](${link})** \n<:reply:880430755338149899> play a cool slots game and win an amout of credits.`, true)
		.addField('\u200B', `**[web](${link})** \n<:reply:880430755338149899> give a web/like/reputuion point to pinged one.`, true)
		.addField('\u200B', `**[bio](${link})** \n<:reply:880430755338149899> create a biographie show on your profile card.`, true)
		.addField('\u200B', `**[credits](${link})** \n<:reply:880430755338149899> check/send your credits blance.`, true)
		.addField('\u200B', `**[daily](${link})** \n<:reply:880430755338149899> get a bunch of credits daily.`, true)
		.addField('\u200B', `**[loot](${link})** \n<:reply:880430755338149899> get a random bunch of credits.`, true)
		.addField('\u200B', `**[profile](${link})** \n<:reply:880430755338149899> get a cool profile card.`, true)
		if (args == 'economy') return message.channel.send(economy)
		
		const actions = new MessageEmbed()
		.setColor('#2f3136')
		.setAuthor('📣  List of all available commands', '', link)
		.setDescription(`<:space:817796102761611264>
		<:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:queue:873258930845933608> **Actions commands**`, true)
		.addField('\u200B', `**[nekoavatar](${link})** \n<:reply:880430755338149899> get a neko attachement picture for a neko girl.`, true)
		.addField('\u200B', `**[tickle](${link})** \n<:reply:880430755338149899> get an embed gif/picture tickling the pinged one.`, true)
		.addField('\u200B', `**[cuddle](${link})** \n<:reply:880430755338149899> get an embed gif/picture cuddling the pinged one.`, true)
		.addField('\u200B', `**[blush](${link})** \n<:reply:880430755338149899> get an embed gif/picture blushing the pinged one.`, true)
		.addField('\u200B', `**[punch](${link})** \n<:reply:880430755338149899> get an embed gif/picture punching the pinged one.`, true)
		.addField('\u200B', `**[smug](${link})** \n<:reply:880430755338149899> get an embed gif/picture smugging the pinged one.`, true)
		.addField('\u200B', `**[slap](${link})** \n<:reply:880430755338149899> get an embed gif/picture slapping the pinged one.`, true)
		.addField('\u200B', `**[kiss](${link})** \n<:reply:880430755338149899> get an embed gif/picture kissing the pinged one.`, true)
		.addField('\u200B', `**[feed](${link})** \n<:reply:880430755338149899> get an embed gif/picture feeding the pinged one.`, true)
		.addField('\u200B', `**[hug](${link})** \n<:reply:880430755338149899> get an embed gif/picture hugging the pinged one.`, true)
		.addField('\u200B', `**[pat](${link})** \n<:reply:880430755338149899> get an embed gif/picture patting the pinged one.`, true)
		.addField('\u200B', `**[poke](${link})** \n<:reply:880430755338149899> get an embed gif/picture poking the pinged one.`, true)
		.addField('\u200B', `**[cry](${link})** \n<:reply:880430755338149899> get an embed gif/picture crying the pinged one.`, true)
		.addField('\u200B', `**[neko](${link})** \n<:reply:880430755338149899> get an embed picture for a neko girl.`, true)
		if (args == 'actions') return message.channel.send(actions)
		
		const music = new MessageEmbed()
		.setColor('#2f3136')
		.setAuthor('📣  List of all available commands', '', link)
		.setDescription(`<:space:817796102761611264>
		<:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:queue:873258930845933608> **Music commands**`, true)
		.addField('\u200B', `**[nowplaying](${link})** \n<:reply:880430755338149899> get all information about the current playing song.`, true)
		.addField('\u200B', `**[playlist](${link})** \n<:reply:880430755338149899> to add all of tracks in the playlist to the queue.`, true)
		.addField('\u200B', `**[shuffle](${link})** \n<:reply:880430755338149899> to shuffle the queue (**reverse songs order**)`, true)
		.addField('\u200B', `**[pruning](${link})** \n<:reply:880430755338149899> to prune bot messages after the queue finish.`, true)
		.addField('\u200B', `**[seek](${link})** \n<:reply:880430755338149899> to search and add your track to the queue.`, true)
		.addField('\u200B', `**[lyrics](${link})** \n<:reply:880430755338149899> get lyrics of the current playing song.`, true)
		.addField('\u200B', `**[resume](${link})** \n<:reply:880430755338149899> to resume the current playing song.`, true)
		.addField('\u200B', `**[play](${link})** \n<:reply:880430755338149899> to play/add your track to the queue.`, true)
		.addField('\u200B', `**[pause](${link})** \n<:reply:880430755338149899> to pause the current playing song.`, true)
		.addField('\u200B', `**[queue](${link})** \n<:reply:880430755338149899> to show all of songs in the queue.`, true)
		.addField('\u200B', `**[remove](${link})** \n<:reply:880430755338149899> to remove a song from the queue.`, true)
		.addField('\u200B', `**[skip](${link})** \n<:reply:880430755338149899> to skip the current playing song.`, true)
		.addField('\u200B', `**[loop](${link})** \n<:reply:880430755338149899> to loop all songs of the queue.`, true)
		.addField('\u200B', `**[skipto](${link})** \n<:reply:880430755338149899> to skip to gived number song.`, true)
		.addField('\u200B', `**[leave](${link})** \n<:reply:880430755338149899> to leave your voice channel.`, true)
		.addField('\u200B', `**[volume](${link})** \n<:reply:880430755338149899> to change/show the volume.`, true)
		.addField('\u200B', `**[join](${link})** \n<:reply:880430755338149899> to join your voice channel.`, true)
		.addField('\u200B', `**[stop](${link})** \n<:reply:880430755338149899> to stop all of the queue.`, true)
		if (args == 'music') return message.channel.send(music)
		
		const moderation = new MessageEmbed()
		.setColor('#2f3136')
		.setAuthor('📣  List of all available commands', '', link)
		.setDescription(`<:space:817796102761611264>
		<:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:queue:873258930845933608> **Moderation commands**`, true)
		.addField('\u200B', `**[role](${link})** \n<:reply:880430755338149899> to update any of mentioned member roles (**upcome with remove and add**)`, true)
		.addField('\u200B', `**[move all](${link})** \n<:reply:880430755338149899> to move all members who's in a voice channel to your voice channel.`, true)
		.addField('\u200B', `**[unlock](${link})** \n<:reply:880430755338149899> to unlock the current channel (**can be for specific role**)`, true)
		.addField('\u200B', `**[lock](${link})** \n<:reply:880430755338149899> to lock the current channel (**can be for specific role**)`, true)
		.addField('\u200B', `**[slowmode](${link})** \n<:reply:880430755338149899> to make a slowmode for the current channel.`, true)
		.addField('\u200B', `**[purge](${link})** \n<:reply:880430755338149899> to delete member/global the channel messages.`, true)
		.addField('\u200B', `**[unban](${link})** \n<:reply:880430755338149899> to unban pinged one and can join the server.`, true)
		.addField('\u200B', `**[move](${link})** \n<:reply:880430755338149899> to move pinged one to your voice channel.`, true)
		.addField('\u200B', `**[role-target](${link})** \n<:reply:880430755338149899> to get all of users who's in role.`, true)
		.addField('\u200B', `**[role-info](${link})** \n<:reply:880430755338149899> to get information about the role.`, true)
		.addField('\u200B', `**[kick](${link})** \n<:reply:880430755338149899> to kick pinged one out of the server.`, true)
		.addField('\u200B', `**[unban all](${link})** \n<:reply:880430755338149899> to unban all of banned members.`, true)
		.addField('\u200B', `**[ban](${link})** \n<:reply:880430755338149899> to ban pinged one out of the server.`, true)
		if (args == 'moderation') return message.channel.send(moderation)
		
		const social = new MessageEmbed()
		.setColor('#2f3136')
		.setAuthor('📣  List of all available commands', '', link)
		.setDescription(`<:space:817796102761611264>
		<:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:queue:873258930845933608> **Social commands**`, true)
		.addField('\u200B', `**[discrim](${link})** \n<:reply:880430755338149899> to get a bunch of members who has same as your discriminator.`, true)
		.addField('\u200B', `**[marry](${link})** \n<:reply:880430755338149899> to marry pinged one or know who is married with you.`, true)
		.addField('\u200B', `**[afk](${link})** \n<:reply:880430755338149899> to set a message sends to author when he mentions yo.`, true)
		.addField('\u200B', `**[mentionsnipe](${link})** \n<:reply:880430755338149899> to get all your mentionsnipes in channel.`, true)
		.addField('\u200B', `**[companion](${link})** \n<:reply:880430755338149899> to know who is your companion with you.`, true)
		.addField('\u200B', `**[server](${link})** \n<:reply:880430755338149899> to show all informations about the server.`, true)
		.addField('\u200B', `**[avatar](${link})** \n<:reply:880430755338149899> to get your/ID/server/pinged one avatar.`, true)
		.addField('\u200B', `**[banner](${link})** \n<:reply:880430755338149899> to get your/ID/server/pinged one banner.`, true)
		.addField('\u200B', `**[deletesnipe](${link})** \n<:reply:880430755338149899> to get all deletesnipes in channel.`, true)
		.addField('\u200B', `**[divorce](${link})** \n<:reply:880430755338149899> to divorce with your current companion.`, true)
		.addField('\u200B', `**[chucknorris](${link})** \n<:reply:880430755338149899> to get a random chucknorris jokes.`, true)
		.addField('\u200B', `**[random](${link})** \n<:reply:880430755338149899> to get a random member from the server.`, true)
		.addField('\u200B', `**[editsnipe](${link})** \n<:reply:880430755338149899> to get all editsnipes in channel.`, true)
		.addField('\u200B', `**[whois](${link})** \n<:reply:880430755338149899> to get your/pinged one informations.`, true)
		.addField('\u200B', `**[F](${link})** \n<:reply:880430755338149899> to get a collector and pay respects.`, true)
		.addField('\u200B', `**[remindme](${link})** \n<:reply:880430755338149899> to get a reminder in your dm.`, true)
		.addField('\u200B', `**[divorce](${link})** \n<:reply:880430755338149899> to get a random embed meme.`, true)
		.addField('\u200B', `**[why](${link})** \n<:reply:880430755338149899> to get a random why question.`, true)
		.addField('\u200B', `**[emotify](${link})** \n<:reply:880430755338149899> to emotify your message.`, true)
		.addField('\u200B', `**[fact](${link})** \n<:reply:880430755338149899> to get a random fact.`, true)
		if (args == 'social') return message.channel.send(social)
		
		const radio = new MessageEmbed()
		.setColor('#2f3136')
		.setAuthor('📣  List of all available commands', '', link)
		.setDescription(`<:space:817796102761611264>
		<:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:queue:873258930845933608> **Radio commands**`, true)
		.addField('\u200B', `**[radio stations](${link})** \n<:reply:880430755338149899> to get all of radio stations names.`, true)
		.addField('\u200B', `**[radio volume](${link})** \n<:reply:880430755338149899> to control the volume of radio.`, true)
		.addField('\u200B', `**[radio stop](${link})** \n<:reply:880430755338149899> to stop the broadcast of radio.`, true)
		.addField('\u200B', `**[radio resume](${link})** \n<:reply:880430755338149899> to resume radio broadcasting.`, true)
		.addField('\u200B', `**[radio pause](${link})** \n<:reply:880430755338149899> to pause radio broadcasting.`, true)
		.addField('\u200B', `**[radio](${link})** \n<:reply:880430755338149899> to play one of 40 stations.`, true)
		if (args == 'radio') return message.channel.send(radio)
		
		const nsfw = new MessageEmbed()
		.setColor('#2f3136')
		.setAuthor('📣  List of all available commands', '', link)
		.setDescription(`<:space:817796102761611264>
		<:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:queue:873258930845933608> **Nsfw commands**`, true)
		.addField('\u200B', `**[lesbian](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of lesbians.`, true)
		.addField('\u200B', `**[blowjob](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of blowjobs.`, true)
		.addField('\u200B', `**[nekogif](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of nekos.`, true)
		.addField('\u200B', `**[hentai](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of hentai.`, true)
		.addField('\u200B', `**[pussy](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of pussys.`, true)
		.addField('\u200B', `**[boobs](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of boobs.`, true)
		.addField('\u200B', `**[kuni](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of kunis.`, true)
		.addField('\u200B', `**[trap](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of traps.`, true)
		.addField('\u200B', `**[feet](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of feets.`, true)
		.addField('\u200B', `**[yuri](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of yuris.`, true)
		.addField('\u200B', `**[solo](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of solos.`, true)
		.addField('\u200B', `**[keta](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of ketas.`, true)
		.addField('\u200B', `**[lewd](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of lewds.`, true)
		.addField('\u200B', `**[anal](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of anals.`, true)
		.addField('\u200B', `**[tits](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of tits.`, true)
		.addField('\u200B', `**[cum](${link})** \n<:reply:880430755338149899> show an embed picture/gifs of cums.`, true)
		if (args == 'nsfw') return message.channel.send(nsfw)
		
		const images = new MessageEmbed()
		.setColor('#2f3136')
		.setAuthor('📣  List of all available commands', '', link)
		.setDescription(`<:space:817796102761611264>
		<:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:queue:873258930845933608> **Images commands**`, true)
		.addField('\u200B', `**[whodidthis](${link})** \n<:reply:880430755338149899> get a funny created whodidthis picture.`, true)
		.addField('\u200B', `**[blurpify](${link})** \n<:reply:880430755338149899> get a funny created blurpify picture.`, true)
		.addField('\u200B', `**[retarded](${link})** \n<:reply:880430755338149899> get a funny created retarded picture.`, true)
		.addField('\u200B', `**[pixelate](${link})** \n<:reply:880430755338149899> get a funny created pixelate picture.`, true)
		.addField('\u200B', `**[kitchen](${link})** \n<:reply:880430755338149899> get a funny created kitchen picture.`, true)
		.addField('\u200B', `**[dogmeme](${link})** \n<:reply:880430755338149899> get a funny created dogmeme picture.`, true)
		.addField('\u200B', `**[deepfry](${link})** \n<:reply:880430755338149899> get a funny created deepfry picture.`, true)
		.addField('\u200B', `**[trigger](${link})** \n<:reply:880430755338149899> get a funny created trigger picture.`, true)
		.addField('\u200B', `**[failure](${link})** \n<:reply:880430755338149899> get a funny created failure picture.`, true)
		.addField('\u200B', `**[wasted](${link})** \n<:reply:880430755338149899> get a funny created wasted picture.`, true)
		.addField('\u200B', `**[invert](${link})** \n<:reply:880430755338149899> get a funny created invert picture.`, true)
		.addField('\u200B', `**[lilguy](${link})** \n<:reply:880430755338149899> get a funny created lilguy picture.`, true)
		.addField('\u200B', `**[gmagik](${link})** \n<:reply:880430755338149899> get a funny created gmagik picture.`, true)
		.addField('\u200B', `**[magik](${link})** \n<:reply:880430755338149899> get a funny created magik picture.`, true)
		.addField('\u200B', `**[trash](${link})** \n<:reply:880430755338149899> get a funny created trash picture.`, true)
		.addField('\u200B', `**[spank](${link})** \n<:reply:880430755338149899> get a funny created spank picture.`, true)
		.addField('\u200B', `**[jpeg](${link})** \n<:reply:880430755338149899> get a funny created jpeg picture.`, true)
		.addField('\u200B', `**[ship](${link})** \n<:reply:880430755338149899> get a funny created ship picture.`, true)
		.addField('\u200B', `**[shit](${link})** \n<:reply:880430755338149899> get a funny created shit picture.`, true)
		.addField('\u200B', `**[egg](${link})** \n<:reply:880430755338149899> get a funny created egg picture.`, true)
		.addField('\u200B', `**[gay](${link})** \n<:reply:880430755338149899> get a funny created gay picture.`, true)
		if (args == 'images') return message.channel.send(images)
		
		if (args == 'leveling') return message.channel.send('**'+message.author.username+'**, sorry this category is temporary out of service')
		
		const emb = new MessageEmbed()
		.setAuthor('📣  List of all available commands', '', link)
		.setDescription(`<:space:817796102761611264>\n<:space:817796102761611264><:space:817796102761611264><:shop:872911855570526258> Premium ? contact **${hypedoo}** for premium subscription!`, false)
		.addField('\u200B', `**[help economy](${link})** \n<:reply:880430755338149899> show all of economy commands.`, true)
		.addField('\u200B', `**[help social](${link})** \n<:reply:880430755338149899> show all of social commands.`, true)
		.addField('\u200B', `**[help protection](${link})** \n<:reply:880430755338149899> show all of protection commands (**Soon**) <:protection:872911854391930942>`, true)
		.addField('\u200B', `**[help images](${link})** \n<:reply:880430755338149899> show all commands of image creation/generation.`, false)
		.addField('\u200B', `**[help music](${link})** \n<:reply:880430755338149899> show all of cool music commands.`, true)
		.addField('\u200B', `**[help fun](${link})** \n<:reply:880430755338149899> show all of cool fun commands.`, true)
		.addField('\u200B', `**[help actions](${link})** \n<:reply:880430755338149899> show all of actions commands.`, true)
		.addField('\u200B', `**[help moderation](${link})** \n<:reply:880430755338149899> show all of moderation/admin commands.`, false)
		.addField('\u200B', `**[help radio](${link})** \n<:reply:880430755338149899> show all of radio commands.`, true)
		.addField('\u200B', `**[help nsfw](${link})** \n<:reply:880430755338149899> show all of nsfw commands.`, true)
		.addField('\u200B', `**[help leveling](${link})** \n<:reply:880430755338149899> show all of leveling commands.`, true)
		.setColor('#2f3136')
		
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.author.send({ embed: emb, buttons: [premium, support, invite] })
		message.channel.send({ embed: emb, buttons: [premium, support, invite] })
	})

	let vote = ['vote', 'voter']
	command(client, vote, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'**, sorry i must have send messages permission in this server! (**'+message.guild.name+'**)\n Link: https://top.gg/bot/603988884694630430/vote')
		message.channel.send('https://top.gg/bot/603988884694630430/vote')
	})

	let invite = ['invite', 'inviter']
	command(client, invite, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'**, sorry i must have send messages permission in this server! (**'+message.guild.name+'**)')
		message.channel.send('https://discord.com/oauth2/authorize?client_id=603988884694630430&scope=bot&permissions=-1')
	})

	let support = 'support'
	command(client, support, async message => {
		await waiting(message)
		try {
			message.author.send('Here it is **Genny Premium** support server ` discord.gg/gWw6zBm79J ` have a great time!')
			message.channel.send('**'+message.author.username+'**, check your direct messages!')
		} catch (e) {
			message.channel.send('**'+message.author.username+'**, please open your dm first!')
		}
	})

	let ping = ['ping', 'botspeed']
	command(client, ping, async message => {
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'**, sorry i must have send messages permission in this server! (**'+message.guild.name+'**)')
		message.channel.send('Pong...').then(msg => {
			msg.edit('<a:ping:675744022756720643>' + 'Discord API' + '<a:ping:675744022756720643>' + `\`\`\`javascript\nTime taken: ${msg.createdTimestamp - message.createdTimestamp} ms.\nDiscord API: ${Math.round(client.ws.ping)} ms.\`\`\``)
		})
	})
	
	let blacklisters = ['298230144357761032', '716011596467404852', '902172403285774367', '541234063701442581', '458997221170479124', '764067398507692063', '805216713935159306', '597630544720691202', '805552868391256094', '735876056656904236', '764447645673455616']

	let info = ['info', 'information']
	command(client, info, async message => {
		if (!blacklisters.includes(message.author.id)) return
		const bot = new MessageEmbed()
		.setAuthor(client.user.username, client.user.avatarURL())
		.setThumbnail(client.user.avatarURL())
		.setColor('#2f3136')
		.addField('Ping', `${Date.now() - message.createdTimestamp}` + ' ms', true)
		.addField('Servers', `${client.guilds.cache.size}`, true)
		.addField('Owner', `<@458997221170479124>`, true)
		.addField('l helper dyalna', `<@541234063701442581>`, true)
		.setImage(empty)
		.setFooter(message.author.username, message.author.avatarURL())
		.setTimestamp()
		message.channel.send(bot)
	})

	let blacklist = ['b', 'blacklist']
	command(client, blacklist, async message => {
		if (!blacklisters.includes(message.author.id)) return
		let commander = message.mentions.users.first() ? message.mentions.users.first() : (client.users.cache.find(m => m.tag == message.content.split(' ').slice(1).join(' ')))
		if (!commander) return message.channel.send('**'+message.author.username+'**, unknown member!')
		if (blacklisters.includes(commander.id)) return message.channel.send('**'+message.author.username+'**, you can\'t blacklist staffs')
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('blacklists').findOne({ [commander.id+'.id']: commander.id }, async (error, blacklist) => {
				if (blacklist == null) blacklist = {}
				if (blacklist == undefined) blacklist = {}
			
				if (blacklist[commander.id]) return message.channel.send('**'+commander.username+'** is already blacklisted')
				mongoose.connection.collection('blacklists').insertOne({ [commander.id]: { time: Datie, id: commander.id } })
				message.channel.send('**'+message.author.username+'** success **'+commander.username+'** has been blacklisted in (**'+Datie+'**)')
			})
		})
		client.channels.cache.get('888434397085315143').send('**'+message.author.username+'** just blacklisted <@'+commander.id+'> **('+commander.username+')**')
	})

	let unblacklist = ['w', 'whitelist']
	command(client, unblacklist, async message => {
		if (!blacklisters.includes(message.author.id)) return
		let commander = message.mentions.users.first() ? message.mentions.users.first() : (client.users.cache.find(m => m.tag == message.content.split(' ').slice(1).join(' ')) ? client.users.cache.find(m => m.tag == message.content.split(' ').slice(1).join(' ')) : client.users.cache.get(message.content.split(' ').slice(1).join(' ')))
		if (!commander) return message.channel.send('**'+message.author.username+'**, unknown member!')
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('blacklists').findOne({ [commander.id+'.id']: commander.id }, async (error, blacklist) => {
				if (blacklist == null) blacklist = {}
				if (blacklist == undefined) blacklist = {}
			
				if (!blacklist[commander.id]) return message.channel.send('**'+commander.username+'** is not blacklisted')
				mongoose.connection.collection('blacklists').deleteOne({ [commander.id+'.id']: commander.id })
				message.channel.send('**'+message.author.username+'** success **'+commander.username+'** has been unblacklisted in (**'+Datie+'**)')
			})
		})
		client.channels.cache.get('888434397085315143').send('**'+message.author.username+'** just unblacklisted <@'+commander.id+'> **('+commander.username+')**')
	})

	let blacklistcheck = ['bcheck', 'blacklistcheck']
	command(client, blacklistcheck, async message => {
		if (!blacklisters.includes(message.author.id)) return
		let commander = message.mentions.users.first() ? message.mentions.users.first() : (client.users.cache.find(m => m.tag == message.content.split(' ').slice(1).join(' ')) ? client.users.cache.find(m => m.tag == message.content.split(' ').slice(1).join(' ')) : client.users.cache.get(message.content.split(' ').slice(1).join(' ')))
		if (!commander) return message.channel.send('**'+message.author.username+'**, unknown member!')
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('blacklists').findOne({ [commander.id+'.id']: commander.id }, async (error, blacklist) => {
				if (blacklist == null) blacklist = {}
				if (blacklist == undefined) blacklist = {}
			
				if (blacklist[commander.id]) return message.channel.send('**'+commander.username+'** is blacklisted since (**'+blacklist[commander.id].time+'**)')
				else message.channel.send('**'+message.author.username+'** mister **'+commander.username+'** is not blacklisted!')
			})
		})
	})

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	// ************************************************************************************************ PREMIUM ************************************************************************************************  \\
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	let promoters = ['458997221170479124', '428692060619407370', '812783460627251211']
	let promote = ['promote', 'gift']
	command(client, promote, async message => {
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'**, I must have embed links permission')
		if (!promoters.includes(message.author.id)) return
		const accept = new MessageButton()
		.setLabel('Accept')
		.setID('accept')

		const decline = new MessageButton()
		.setLabel('Decline')
		.setID('decline')
		
		let emb = new MessageEmbed()
		.setAuthor('You\'ve been gifted a subscription!', '','https://discord.gg/gWw6zBm79J')
		.setColor('#2f3136')
		.setThumbnail('https://cdn.discordapp.com/emojis/875827617331310602.png')
		.setFooter('Expires in 3 minutes', 'https://cdn.discordapp.com/emojis/817796102761611264.png?v=1')
		.setTimestamp()
		
		let filter
		if (!message.mentions.users.first()) {
			filter = button => true 
			emb.setDescription(`<:shop:872911855570526258> **${hypedoo}** has gifted you Promotion for **1 week**!\n\n<:space:817796102761611264> `)
			position = true
		} else {
			clicker[message.mentions.users.first().id] = true
			filter = button => button.clicker.user.id == message.mentions.users.first().id
			emb.setDescription(`<:shop:872911855570526258> **${hypedoo}** has gifted **${message.mentions.users.first().username}** Promotion for **1 week**!\n\n<:space:817796102761611264> `)
		}
		let channel
		let args = message.content.split(' ').slice(1).join(' ')
		if (!args) channel = message.channel
		else channel = client.channels.cache.get(args)
		if (!channel) channel = message.channel
		let m = await channel.send({
		buttons: [accept.setStyle('green'), decline.setStyle('red')],
			embed: emb
		})
		
		const collector = m.createButtonCollector(filter, { time: 180000 })
		collector.on('collect', async button => {
			if (button.id === 'accept') {
				collector.stop()
				let author = button.clicker.user.id
				mongo(database1).then(async mongoose => {
					mongoose.connection.collection('premiums').findOne({ [author+'.id']: author }, async (error, premium) => {
						if (premium == null) premium = {}
						if (premium == undefined) premium = {}
		  
						if (!premium[author]) return mongoose.connection.collection('premiums').insertOne({ [author]: { subs: 0, time: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000), id: author } })
						mongoose.connection.collection('premiums').updateOne({ [author+'.id']: author }, { $set: { [author+'.subs']: parseInt(premium[author].subs) + 1, } }) 
					})
				})
				let emb = new MessageEmbed()
				.setAuthor('You\'ve been gifted a subscription!', '','https://discord.gg/gWw6zBm79J')
				.setDescription(`Hmmm, it seems someone already claimed this gift!\n\n<:space:817796102761611264>\n<:space:817796102761611264> `)
				.setColor('#2f3136')
				.setThumbnail('https://cdn.discordapp.com/emojis/875827617331310602.png')
				m.edit({
					buttons: [accept.setStyle('grey').setDisabled(true), decline.setStyle('grey').setDisabled(true)],
					embed: emb
				})
				channel.send('**'+button.clicker.user.username+'**, you claimed a promotion gift for **1 week**! enjoy the premium plan! type (`!!premium help`) for P-commands!')
			} else if (button.id === 'decline') {
				m.delete().catch(e => true)
				collector.stop()
				channel.send('**'+button.clicker.user.username+'**, declined the gift promotion <:drinking:750050072707727371>')
			}
		})
		setTimeout(() => {
			m.delete().catch(e => true)
		}, 180000)
		collector.on('end', () => {
			if (position == true) return position = null
			if (message.mentions.users.first()) delete clicker[message.mentions.users.first().id]
		})
	})
	
	let demote = ['demote']
	command(client, demote, async message => {
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'**, I must have embed links permission')
		if (!promoters.includes(message.author.id)) return
		const accept = new MessageButton()
		.setLabel('Accept')
		.setID('accept')

		const decline = new MessageButton()
		.setLabel('Decline')
		.setID('decline')
		
		filter = button => button.clicker.user.id == message.author.id
		
		let mention = message.mentions.users.first()
		if (!mention) return message.channel.send('**'+message.author.username+'**, please mention who do you wanna clear his premium plan!')
		let m = await message.channel.send('**'+message.author.username+'**, are you sure about the decision of demonting **'+mention.tag+'** for some reasons ?!', { buttons: [accept.setStyle('green'), decline.setStyle('red')] })
		
		const collector = m.createButtonCollector(filter, { time: 180000 })
		collector.on('collect', async button => {
			if (button.id === 'accept') {
				collector.stop()
				let author = button.clicker.user.id
				mongo(database1).then(async mongoose => {
					mongoose.connection.collection('premiums').findOne({ [mention.id+'.id']: mention.id }, async (error, premium) => {
						if (premium == null) premium = {}
						if (premium == undefined) premium = {}
		  
						if (!premium[mention.id]) return message.channel.send('**'+mention.username+'** is not promoted to be demoted!')
						mongoose.connection.collection('premiums').deleteOne({ [mention.id+'.id']: mention.id })
					})
				})
				m.edit(m.content, { buttons: [accept.setStyle('grey').setDisabled(true), decline.setStyle('grey').setDisabled(true)] })
				message.channel.send('**'+button.clicker.user.username+'**, you just demoted **'+message.mentions.users.first().tag+'** by owner decision (**Your decision**)')
			} else if (button.id === 'decline') {
				m.delete().catch(e => true)
				collector.stop()
				channel.send('**'+button.clicker.user.username+'**, you cancelled the demote for **'+message.mentions.users.first().tag+'** and he thanking you for forgiveness!')
			}
		})
		collector.on('end', () => {
			m.edit(m.content, { buttons: [accept.setStyle('grey').setDisabled(true), decline.setStyle('grey').setDisabled(true)] })
		})
	})

	let premium = 'premium'
	command(client, premium, async message => {
		await waiting(message)
		let args = message.content.split(' ').slice(1).join(' ')
		let author = message.author.id
		let mentioned = message.mentions.users.first()
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('premiums').findOne({ [author+'.id']: author }, async (error, premium) => {
				if (premium == null) premium = {}
				if (premium == undefined) premium = {}
				
				if (!premium[author]) return message.channel.send('<:shop:872911855570526258> **'+message.author.username+'**, you have not the premium plan to use this command! please contact **'+hypedoo+'** if you wanna get one!')
			
				let cooldown = 8.64e7 * 7
				let timeleft = premium[message.author.id].time ? premium[message.author.id].time : null
				if (timeleft !== null && cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - timeleft) > 0) {
					let times = cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - timeleft)
					if (!args) return message.channel.send('**'+message.author.username+'**, your premium plan end in **'+pretty(times, { verbose: true })+'**')

					if (args == 'inventory') return message.channel.send('**'+message.author.username+'**, you have **'+premium[author].subs+' subscriptions** left in your inventory!')
					if (message.content.split(' ')[1] == 'move') {
						if (!mentioned) return message.channel.send('**'+message.author.username+'**, please use a valid parameters! as an example !!premium move **@HyPeD**')
						mongoose.connection.collection('premiums').findOne({ [mentioned.id+'.id']: mentioned.id }, async (error, premiums) => {
							if (premiums == null) premiums = {}
							if (premiums == undefined) premiums = {}
							
							if (!premium[mentioned.id]) {
								mongoose.connection.collection('premiums').insertOne({ [mentioned.id]: { time: timeleft, id: mentioned.id } })
								if (premium[author].subs < 1) mongoose.connection.collection('premiums').deleteOne({ [author+'.id']: author })
								mongoose.connection.collection('premiums').updateOne({ [author+'.id']: author }, { $set: { [author+'.subs']: parseInt(premium[author].subs) - 1, [author+'.time']: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000) } })
								return message.channel.send('**'+message.author.username+'**, your current premium plan has been moved to **'+mentioned.tag+'**!')
							} else {
								if (premium[author].subs < 1) return message.channel.send('**'+message.author.username+'**, you can\'t move your current plan because you don\'t have other subscriptions in your inventory!')
								mongoose.connection.collection('premiums').updateOne({ [mentioned.id+'.id']: mentioned.id }, { $set: { [mentioned.id+'.subs']: parseInt(premium[mentioned.id].subs) + 1 } })
								mongoose.connection.collection('premiums').updateOne({ [author+'.id']: author }, { $set: { [author+'.subs']: parseInt(premium[author].subs) - 1, [author+'.time']: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000) } })
								return message.channel.send('**'+message.author.username+'**, your current premium plan has been moved to **'+mentioned.tag+'**!')
							}
						})
					}
					
					let emb = new MessageEmbed()
					.setAuthor(message.author.username, message.author.avatarURL(), 'https://discord.gg/gWw6zBm79J/')
					.addField('Commands', '\`!!force-marry\`, \`!!force-divorce\`, ~~\`!!call\`~~, ~~\`!!say\`~~, \`!!premium inventory\`, \`!!premium move\`', true)
					.addField('<:chat:815583351062003733> Perks', '~~\`Double XP\`~~, ~~\`Fast response\`~~, ~~\`Doubled Credits (Generator)\`~~', false)
					.addField('<:voice_icon:815589543930495006> Perks', '~~\`Double XP\`~~, ~~\`Voice commands (!!call, !!say)\`~~', true)
					.setImage(empty)
					.setColor('#2f3136')
					
					if (args == 'help') return message.channel.send('**'+message.author.username+'** sorry we are still working on it! valid commands is `!!force-marry` and `!!force-divorce` have fun!')
				}
				
				if (premium[author].subs > 1) {
					let times = cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - (timeleft == null ? Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000) : timeleft))
					mongoose.connection.collection('premiums').updateOne({ [author+'.id']: author }, { $set: { [author+'.subs']: (parseInt(premium[author].subs) - 1), [author+'.time']: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000) } })
					return message.channel.send('**'+message.author.username+'**, your premium plan end in **'+pretty(times, { verbose: true })+'**')
				}
				if (premium[author].subs < 1) {
					mongoose.connection.collection('premiums').deleteOne({ [author+'.id']: author })
					return message.channel.send('**'+message.author.username+'**, your premium plan is ended!')
				}
				message.channel.send('<:shop:872911855570526258> **'+message.author.username+'**, you have not the premium plan to use this command! please contact **'+hypedoo+'** if you wanna get one!')
			})
		})
	})

	let forcemarry = 'force-marry'
	command(client, forcemarry, async message => {
		await waiting(message)
		mongo(database1).then(async mongoose => {
			let author = message.author.id
			mongoose.connection.collection('premiums').findOne({ [author+'.id']: author }, async (error, premium) => {
				if (premium == null) premium = {}
				if (premium == undefined) premium = {}
				
				if (!premium[author]) return message.channel.send('<:shop:872911855570526258> **'+message.author.username+'**, you have not the premium plan to use this command! please contact **'+hypedoo+'** if you wanna get one!')
				let cooldown = 8.64e7 * 7
				let timeleft = premium[message.author.id].time
				let times = cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - timeleft)
				if (timeleft !== null && cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - timeleft) < 0) {
					if (premium[author].subs < 1 || premium[author].subs == NaN) {
						mongoose.connection.collection('premiums').deleteOne({ [author+'.id']: author })
						return message.channel.send('**'+message.author.username+'** your premium plan is ended!')
					} else {
						mongoose.connection.collection('premiums').updateOne({ [author+'.id']: author }, { $set: { [author+'.subs']: (parseInt(premium[author].subs) - 1), [author+'.time']: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000) } })
					}
				}
				
				const shipped = message.mentions.users.size === 2 ? message.mentions.users.array()[1] : message.author
				const shipper = message.mentions.users.size === 1 || message.mentions.users.size === 2 ? message.mentions.users.array()[0] : message.author
				if (message.mentions.users.size !== 2) return message.channel.send('**'+message.author.username+'** you need to mention 2 users to be marry them <:cutie:675727723624136715>')
				
				if (!ratelimitm[message.author.id]) ratelimitm[message.author.id] = 0
				if (ratelimitm[message.author.id] == 5) return message.channel.send('**'+message.author.username+'** you have been ratelimited for abuse 5 times!')
				mongoose.connection.collection('marry-couples').findOne({ [shipped.id+'.id']: shipped.id }, async (error, marry) => {
				mongoose.connection.collection('marry-couples').findOne({ [shipper.id+'.id']: shipper.id }, async (error, pmarry) => {
					if (marry == null) marry = {}
					if (marry == undefined) marry = {}
					if (pmarry == null) pmarry = {}
					if (pmarry == undefined) pmarry = {}
					
					if (shipped.bot) return message.channel.send('**'+message.author.username+'** not the bots...  <:cutie:675727723624136715>')
					if (shipper.bot) return message.channel.send('**'+message.author.username+'** not the bots...  <:cutie:675727723624136715>')
				
					mongoose.connection.collection('marry-couples').deleteOne({ [shipped.id+'.id']: shipped.id })
					mongoose.connection.collection('marry-couples').deleteOne({ [shipper.id+'.id']: shipper.id })
					if (marry[shipped.id]) mongoose.connection.collection('marry-couples').deleteOne({ [marry[shipped.id].marry+'.id']: marry[shipped.id].marry })
					if (marry[shipper.id]) mongoose.connection.collection('marry-couples').deleteOne({ [marry[shipper.id].marry+'.id']: marry[shipper.id].marry })
					message.channel.send('<a:Heart:678372637231284234> **Happily married** \n Congratulations, **'+shipper.username +'** and **'+shipped.username +'** are now bound by marriage!')
					setTimeout(() => { mongoose.connection.collection('marry-couples').insertMany([{ [shipped.id ]: { marry: shipper.id, times: Datie, id: shipped.id } }, { [shipper.id]: { marry: shipped.id, times: Datie, id: shipper.id } }]) }, 1000)
				})
				})
				ratelimitm[message.author.id]++
				setTimeout(() => ratelimitm[message.author.id]--, 5 * 60 * 1000)
			})
		})
	})

	let forcedivorce = 'force-divorce'
	command(client, forcedivorce, async message => {
		await waiting(message)
		mongo(database1).then(async mongoose => {
			let author = message.author.id
			mongoose.connection.collection('premiums').findOne({ [author+'.id']: author }, async (error, premium) => {
				if (premium == null) premium = {}
				if (premium == undefined) premium = {}
				
				if (!premium[author]) return message.channel.send('<:shop:872911855570526258> **'+message.author.username+'**, you have not the premium plan to use this command! please contact **'+hypedoo+'** if you wanna get one!')
				let cooldown = 8.64e7 * 7
				let timeleft = premium[message.author.id].time
				let times = cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - timeleft)
				if (timeleft !== null && cooldown - ((sec(pretty(Date.now(), {colonNotation: true})) * 1000) - timeleft) < 0) {
					if (premium[author].subs < 1 || premium[author].subs == NaN) {
						mongoose.connection.collection('premiums').deleteOne({ [author+'.id']: author })
						return message.channel.send('**'+message.author.username+'** your premium plan is ended!')
					} else {
						mongoose.connection.collection('premiums').updateOne({ [author+'.id']: author }, { $set: { [author+'.subs']: (parseInt(premium[author].subs) - 1), [author+'.time']: Math.floor(sec(pretty(Date.now(), {colonNotation: true})) * 1000) } })
					}
				}
				if (!message.mentions.members.first()) return message.channel.send('**'+message.author.username+'** you must mention some one <:cutie:675727723624136715>')
				
				if (!ratelimitd[message.author.id]) ratelimitd[message.author.id] = 0
				if (ratelimitd[message.author.id] == 5) return message.channel.send('**'+message.author.username+'** you have been ratelimited for abuse 5 times!')
				mongoose.connection.collection('marry-couples').findOne({ [message.mentions.members.first().id+'.id']: message.mentions.members.first().id }, async (error, marry) => {
					if (marry == null) marry = {}
					if (marry == undefined) marry = {}
				
					if (!marry[message.mentions.members.first().id]) {
						mongoose.connection.collection('marry-couples').deleteOne([{ [message.mentions.members.first().id+'.id']: message.mentions.members.first().id } ])
						return message.channel.send('**'+message.mentions.users.first().username +'** HeHe single now <:cutie:675727723624136715>')
					}
					mongoose.connection.collection('marry-couples').deleteOne({ [message.mentions.members.first().id+'.id']: message.mentions.members.first().id })
					mongoose.connection.collection('marry-couples').deleteOne({ [marry[message.mentions.members.first().id].marry+'.id']: marry[message.mentions.members.first().id].marry })
					return message.channel.send('**'+message.mentions.users.first().username +'** HeHe single now <:cutie:675727723624136715>')
				})
				ratelimitd[message.author.id]++
				setTimeout(() => ratelimitd[message.author.id]--, 5 * 60 * 1000)
			})
		})
	})

	let call = 'call'
	command(client, call, async message => {
		return message.channel.send('**'+message.author.username+'** not loaded yet!')
		await waiting(message)
		let args = message.content.split(' ').slice(1).join(' ')
		if (!args) return message.channel.send('**'+message.author.username+'** please use a valid parameters! as an example !!call (\`member\`) (\`server id\`) (\`voice\`, \`chat\`)')
	})

	// let drop = 'drop'
	// command(client, drop, async message => {
		
	// })

	let banner = 'banner'
	command(client, banner, async message => {
		await waiting(message)
		let args = message.content.split(' ')
		let member = message.mentions.users.first()
		try {
			
			if (args.slice(1).join(' ') == 'server') {
				if (!message.guild.bannerURL()) return message.channel.send('**'+message.author.username+'** this server doesn\'t have a banner!')
				const embed = new MessageEmbed()
				.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 1024 }), message.guild.bannerURL({ dynamic: true, size: 1024 }))
				.setColor('#51545b')
				.setDescription('**[Banner link]('+message.guild.bannerURL({ dynamic: true, size: 1024 })+')** \n <:reply:880430755338149899>click to get **'+message.guild.name+'**\'s banner link!')
				.setImage(`${message.guild.bannerURL({ dynamic: true, size: 1024 })}`)
				.setFooter('Requested by '+message.author.tag, message.author.avatarURL())
				return message.channel.send(embed)
			}
			
			let commander = message.author
			if (member) commander = member
			else if(args.slice(1).join(' ') && !member) commander = await client.users.fetch(args.slice(1).join(' '))
				
			let body = await get({ url: 'https://discord.com/api/users/'+commander.id, json: true, headers: { 'Authorization': `Bot ${client.token}` } })
			const { banner, accent_color } = body
			if (banner) {
				const extention = banner.startsWith('a_') ? 'gif' : 'png'
				const url = 'https://cdn.discordapp.com/banners/'+commander.id+'/'+banner+'.'+extention+'?size=2048'
				const emb = new MessageEmbed()
				.setAuthor(commander.tag, commander.avatarURL(), url)
				.setDescription('**[Banner link]('+url+')** \n <:reply:880430755338149899>click to get **'+commander.username+'**\'s banner link!')
				.setColor('#51545b')
				.setImage(url)
				.setFooter('Requested by '+message.author.tag, message.author.avatarURL())
				return message.channel.send(emb)
			} else return message.channel.send('**'+message.author.username+'** this user has not a banner!')
		} catch (e) {
			message.channel.send(`**${message.author.username}**, couldn't find **${args.slice(1).join(' ')}** in discord <:drinking:750050072707727371>`)
		}
	})

	let avatar = 'avatar'
	command(client, avatar, async message => {
		await waiting(message)
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
		let args = message.content.split(' ')
		let member = message.mentions.users.first()
		try {
			if (args.slice(1).join(' ') == 'server') {
				if (!message.guild.iconURL()) return message.channel.send('**'+message.author.username+'** this server doesn\'t have a icon!')
				const embed = new MessageEmbed()
				.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }), message.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }))
				.setDescription('**[Icon link]('+message.guild.iconURL({ dynamic: true, size: 1024, format: 'png' })+')** \n <:reply:880430755338149899>click to get **'+message.guild.name+'**\'s icon link!')
				.setColor('#51545b')
				.setImage(`${message.guild.iconURL({ dynamic: true, size: 1024, format: 'png' })}`)
				.setFooter('Requested by '+message.author.tag, message.author.avatarURL())
				return message.channel.send(embed)
			}
			
			let commander = message.author
			if (member) commander = member
			else if(args.slice(1).join(' ') && !member) commander = await client.users.fetch(args.slice(1).join(' '))
			
			const emb = new MessageEmbed()
				.setAuthor(commander.tag, commander.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }), commander.displayAvatarURL({ dynamic: true, size: 1024 }))
				.setDescription('**[Avatar link]('+commander.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' })+')** \n <:reply:880430755338149899>click to get **'+commander.username+'**\'s avatar link!')
				.setColor('#51545b')
				.setImage(`${commander.avatarURL({ dynamic: true, size: 1024, format: 'png' }) || commander.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' })}`)
				.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
				return message.channel.send(emb)
		} catch (e) {
			message.channel.send(`**${message.author.username}** couldn't find **${args.slice(1).join(' ')}** in discord <:drinking:750050072707727371>`)
		}
	})

	let set = 'set'
	command(client, set, async message => {
		if (message.author.id !== '458997221170479124') return
		
		if (message.attachments.size == 0) return message.channel.send('dir shi image azin')
		else {
			let buff = await jimp.read(message.attachments.first().url)
			let res = await buff.getBufferAsync(jimp.MIME_PNG)
			client.guilds.cache.get('675719509507702784').setIcon(res)
			client.user.setAvatar(res)
			message.channel.send('done sf ra changed')
		}
	})
	
	let levels = ['rank', 'level']
	command(client, levels, async message => {
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'**, sorry I must have send messages permission in this server! (**'+message.guild.name+'**)')
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('**'+message.author.username+'**, sorry I must have attach files permission!')
		
		const member = message.mentions.members.first() ? message.mentions.members.first().user : message.author
		if (member.bot) return message.channel.send('**'+message.author.username+'**, bots do not have profiles!')
        mongo(database1).then(async mongoose => {
			mongoose.connection.collection('setups').findOne({ [message.guild.id+'.id']: message.guild.id }, async (error, setups) => {
			mongoose.connection.collection('levels').findOne({ [message.guild.id+'.id']: message.guild.id }, async (error, level) => {
			mongoose.connection.collection('vclevels').findOne({ [message.guild.id+'.id']: message.guild.id }, async (error, voice_level) => {
				if (setups == null) setups = {}
				if (setups == undefined) setups = {}
				if (level == null) level = {}
				if (level == undefined) level = {}
				if (voice_level == null) voice_level = {}
				if (voice_level == undefined) voice_level = {}
				
				if (!setups[message.guild.id]) return message.channel.send('**'+message.author.username+'** this server must be registered first! use **!!setup** and try again!')
			
				function levelRank(commander, guild) {
					let value = Object.values(level[guild]).sort((a, b) => b.level - a.level)
					value.sort((a, b) => b.xp - a.xp)
					if (level[guild] && !level[guild][commander]) {
						return value.length
					}
					for (let i = 0; i < value.length; i++) {
						if (value[i].id == commander) return i + 1
					}
				}
				
				function voiceRank(commander, guild) {
					let value = Object.values(voice_level[guild]).sort((a, b) => b.voice - a.voice)
					value.sort((a, b) => b.voiceXp - a.voiceXp)
					if (voice_level[guild] && !voice_level[guild][commander]) {
						return value.length
					}
					for (let i = 0; i < value.length; i++) {
						if (value[i].id == commander) return i + 1
					}
				}
				
				const canvas = createCanvas(1200, 350)
				const ctx = canvas.getContext('2d')
				const backround = await loadImage('https://cdn.discordapp.com/attachments/634854460102803456/812378050451996692/10710366.png')
				ctx.drawImage(backround, 0, 0, canvas.width, canvas.height)
				const errow = await loadImage('https://cdn.discordapp.com/attachments/634854460102803456/764815107192127508/Untitled.png')
				let ow = await loadImage(roundedImage(errow, 1165, 320, 30))
				ctx.drawImage(ow, 20, 20, 1165, 320)

				let lvl = level[message.guild.id] && level[message.guild.id][message.author.id] ? level[message.guild.id][message.author.id].level : 1
				let xp = level[message.guild.id] && level[message.guild.id][message.author.id] ? level[message.guild.id][message.author.id].xp : 10
			
				let xx = 450
				let yy = 255
				
				let ww = 600
				let hh = 26
					
				ctx.beginPath()
				ctx.lineWidth = 2
				ctx.strokeStyle = '#ffffff'
				ctx.golbalAlpha = 0.2
				ctx.strokeRect(xx, yy, ww, hh)
				ctx.stroke()

				ctx.fillStyle = '#F0FFFF'
				ctx.golbalAlpha = 0.6
				ctx.fillRect(xx + 5, yy + 5,(parseInt((100 / (lvl * 400)) * xp * (ww / 100)) - 10) <= parseInt(ww) ? ((parseInt((100 / (lvl * 400)) * xp * (ww / 100)) - 10) > 5 ? (parseInt((100 / (lvl * 400)) * xp * (ww / 100)) - 10 ) : 6) : parseInt(ww), hh - 10)
				ctx.fill()
				ctx.globalAlpha = 1
				
				ctx.font = '30px Arial'
				ctx.fillStyle = '#ffffff'
				ctx.fillText(`${smallm(xp)} / ${smallm(lvl * 400)}`, 725, 240)
				
				ctx.font = 'bold 30px Arial'
				ctx.fillStyle = '#ffffff'
				ctx.fillText(`XP:`, 665, 240)
				
				ctx.font = '30px Arial'
				ctx.fillStyle = '#ffffff'
				ctx.fillText(level[message.guild.id] ? '#'+smallm(levelRank(member.id, message.guild.id)) : '#1', 550, 240)
				
				ctx.font = 'bold 30px Arial'
				ctx.fillStyle = '#ffffff'
				ctx.fillText(`Rank:`, 450, 240)
				
				ctx.font = 'bold 30px Arial'
				ctx.fillStyle = '#ffffff'
				ctx.fillText(`LeveL:`, 900, 240)
				
				ctx.font = '30px Arial'
				ctx.fillStyle = '#ffffff'
				ctx.fillText(lvl - 1, 1025, 240)
				
				///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
				let voicelevel = voice_level[message.guild.id] && voice_level[message.guild.id][member.id] ? voice_level[message.guild.id][member.id].voice : 1
				let voicexp = voice_level[message.guild.id] && voice_level[message.guild.id][member.id] ? voice_level[message.guild.id][member.id].voiceXp : 10
				
				let yyy = 150
				
				ctx.lineWidth = 2
				ctx.strokeStyle = '#ffffff'
				ctx.golbalAlpha = 0.2
				ctx.strokeRect(xx, yyy, ww, hh)
				ctx.stroke()

				ctx.fillStyle = '#F0FFFF'
				ctx.golbalAlpha = 0.6
				ctx.fillRect(xx + 5, yyy + 5, (parseInt((100 / (voicelevel * 400)) * voicexp * (ww / 100)) - 10) <= parseInt(ww) ? ((parseInt((100 / (voicelevel * 400)) * voicexp * (ww / 100)) - 10) > 5 ? (parseInt((100 / (voicelevel * 400)) * voicexp * (ww / 100)) - 10 ) : 6) : parseInt(ww), hh - 10)
				ctx.fill()
				ctx.globalAlpha = 1

				ctx.font = '30px Arial'
				ctx.fillStyle = '#ffffff'
				ctx.fillText(`${smallm(voicexp)} / ${smallm(voicelevel * 400)}`, 725, 140)
				
				ctx.font = 'bold 30px Arial'
				ctx.fillStyle = '#ffffff'
				ctx.fillText(`XP:`, 665, 140)
				
				ctx.font = '30px Arial'
				ctx.fillStyle = '#ffffff'
				ctx.fillText(voice_level[message.guild.id] ? '#'+smallm(voiceRank(member.id, message.guild.id)) : '#1', 550, 140)
				
				ctx.font = 'bold 30px Arial'
				ctx.fillStyle = '#ffffff'
				ctx.fillText(`Rank:`, 450, 140)
				
				ctx.font = 'bold 30px Arial'
				ctx.fillStyle = '#ffffff'
				ctx.fillText(`LeveL:`, 900, 140)
				
				ctx.font = '30px Arial'
				ctx.fillStyle = '#ffffff'
				ctx.fillText(voicelevel - 1, 1025, 140)
				
				const b1 = await loadImage('https://cdn.discordapp.com/emojis/872878814940758016.png?v=1')
				ctx.drawImage(b1, 1100, 227, 60, 57)
				const b2 = await loadImage('https://cdn.discordapp.com/emojis/872911856115806268.png?v=1')
				ctx.drawImage(b2, 1100, 120, 60, 60)
				
				ctx.font = '50px Arial'  
				ctx.textAlign = 'left'
				ctx.fillText(member.username, 570, 80)
				
				let x = 40
				let y = 50
				let width = 250
				let height = 250
				let radius = 30

				ctx.moveTo(x + radius, y)
				ctx.lineTo(x + width - radius, y)
				ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
				ctx.lineTo(x + width, y + height - radius)
				ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
				ctx.lineTo(x + radius, y + height)
				ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
				ctx.lineTo(x, y + radius)
				ctx.quadraticCurveTo(x, y, x + radius, y)
				ctx.lineWidth = 6
				ctx.strokeStyle = '#ffffff'
				ctx.stroke()
				ctx.closePath()
				ctx.clip()
				
				let pic = await loadImage(member.avatarURL({ format: 'png'}))
				const avatar = await loadImage(roundedImage(pic, 250, 250, 30))
				ctx.drawImage(avatar, x, y + 1.5, 250, 250)
				message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: `level.png` }] })
			})
			})
			})
		})
	})
	
	let setup = ['setup']
	command(client, setup, async message => {
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('setups').findOne({ [message.guild.id+'.id']: message.guild.id }, async (error, setup) => {
				if (setup == null) setup = {}
				if (setup == undefined) setup = {}
				
				if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**'+message.author.username+'** sorry, you must have administrator to use this command!')
				
				const decline = new MessageButton()
				.setLabel('Decline')
				.setID('decline')
				.setStyle('red')
				const accept = new MessageButton()
				.setLabel('Accept')
				.setID('accept')
				.setStyle('green')
				
				if (setup[message.guild.id]) return message.channel.send('**'+message.author.username+'** this server is already registered! try use configs to configure the level system!')
				let m = await message.channel.send('**'+message.author.username+'** are you sure about level system setup!\nYou have **120 seconds** to click **Accept** or **Decline**!', { buttons: [accept, decline] })
				const filter = me => me.clicker.user.id == message.author.id
				const collector = m.createButtonCollector(filter, { time: 120000 })
				
				collector.on('collect', async button => {
					if (button.id === 'accept') {
						mongoose.connection.collection('setups').insertOne({ [message.guild.id]: { id: message.guild.id, text: 'off' } })
						collector.stop()
						setup[message.guild.id] = { text: 'off' }
						return message.channel.send('**'+message.author.username+'** thank for using our level system! we wish that our system make your server greater! **(don\'t forget to use text notify when levels up!)**')
					} else if (button.id === 'decline') {
						collector.stop()
						return message.channel.send('**'+message.author.username+'** thank you anyway! we wish you use our level system in an other time!')
					}
				})
			
				collector.on('end', collected => {
					m.edit(m.content, { buttons: [accept.setDisabled(true), decline.setDisabled(true)] })
				})
			})
		})
	})
	
	let leaderboard = ['lb', 'top', 'leaderboard']
	command(client, leaderboard, message => {
		let guild = message.guild.id
		if (message.author.bot) return
		
		if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'**, sorry i must have send messages permission in this server! (**'+message.guild.name+'**)');
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'**, i must have embed links permission');
		mongo(database1).then(async mongoose => {
			if (message.content.split(' ')[1] && (message.content.split(' ')[1].toLowerCase() == 'credits' || message.content.split(' ')[1].toLowerCase() == 'balance'|| message.content.split(' ')[1].toLowerCase() == 'cash' || message.content.split(' ')[1].toLowerCase() == '-credits' || message.content.split(' ')[1].toLowerCase() == '-balance'|| message.content.split(' ')[1].toLowerCase() == '-cash')) {
				return message.channel.send('**'+message.author.username+'** this parameters is under work!')
				const maxright = new MessageButton()
				.setID('maxright')
				.setEmoji('871500410060435507')
				const right = new MessageButton()
				.setID('right')
				.setEmoji('871500441656127508')
				const left = new MessageButton()
				.setID('left')
				.setEmoji('871500441509318656')
				const maxleft = new MessageButton()
				.setID('maxleft')
				.setEmoji('871500441920339998')
				const deletee = new MessageButton()
				.setID('deletee')
				.setEmoji('871500443019247656')
				.setStyle('red')
				
				let emb = new MessageEmbed()
				.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
				.setColor('#2f3136')
				.addField('Deleted Message', (result['message'] == '' ? '\u200b' : result['message']))
				.setThumbnail(message.author.avatarURL({ dynamic: true }))
				.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
				.setImage(result['img'])
				.setFooter(`Page ${counter + 1}/${maxpage}`)
				.setTimestamp()
			
				let infoo = await message.channel.send({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), deletee, right.setStyle('blurple'), maxright.setStyle('blurple')], embed: emb })
				const filter = button => button.clicker.user.id == message.author.id
				const collector = infoo.createButtonCollector(filter, { time: 120000 })
				collector.on('collect', async button => {
					if (button.id === 'maxright') {
						
						counter = deletesnipes[message.channel.id].length - 1
						let resultt = deletesnipes[message.channel.id][deletesnipes[message.channel.id].length - 1]
						let user = client.users.cache.get(resultt['author'])
						
						emb = new MessageEmbed()
						.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
						.setColor('#2f3136')
						.addField('Deleted Message', (resultt['message'] == '' ? '\u200b' : resultt['message']))
						.setThumbnail(message.author.avatarURL({ dynamic: true }))
						.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
						.setImage(resultt['img'])
						.setFooter(`Page ${counter + 1}/${maxpage}`)
						.setTimestamp()
						infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), deletee, right.setStyle('blurple').setDisabled(true), maxright.setStyle('blurple').setDisabled(true)], embed: emb })
					} else if (button.id === 'maxleft') {
						
						counter = 0
						let resultt = deletesnipes[message.channel.id][0]
						let user = client.users.cache.get(resultt['author'])
						
						emb = new MessageEmbed()
						.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
						.setColor('#2f3136')
						.addField('Deleted Message', (resultt['message'] == '' ? '\u200b' : resultt['message']))
						.setThumbnail(message.author.avatarURL({ dynamic: true }))
						.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
						.setImage(resultt['img'])
						.setFooter(`Page ${counter + 1}/${maxpage}`)
						.setTimestamp()
						infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), deletee, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: emb })
					} else if (button.id === 'left') {
						
						counter--
						if (counter <= 0) counter = 0
						let resultt = deletesnipes[message.channel.id][counter]
						let user = client.users.cache.get(resultt['author'])
						
						emb = new MessageEmbed()
						.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
						.setColor('#2f3136')
						.addField('Deleted Message', (resultt['message'] == '' ? '\u200b' : resultt['message']))
						.setThumbnail(message.author.avatarURL({ dynamic: true }))
						.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
						.setImage(resultt['img'])
						.setFooter(`Page ${counter + 1}/${maxpage}`)
						.setTimestamp()
						if (counter <= 0) return infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), deletee, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: emb })
						infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), deletee, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: emb })
					} else if (button.id === 'right') {
						
						counter++
						if ((counter + 1) >= maxpage) counter = maxpage - 1
						let resultt = deletesnipes[message.channel.id][counter]
						let user = client.users.cache.get(resultt['author'])
						
						emb = new MessageEmbed()
						.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
						.setColor('#2f3136')
						.addField('Deleted Message', (resultt['message'] == '' ? '\u200b' : resultt['message']))
						.setThumbnail(message.author.avatarURL({ dynamic: true }))
						.setFooter('Requested by '+message.author.username, message.author.avatarURL({ dynamic: true }))
						.setImage(resultt['img'])
						.setFooter(`Page ${counter + 1}/${maxpage}`)
						.setTimestamp()
						if ((counter + 1) >= maxpage) return infoo.edit({ buttons: [maxleft.setDisabled(false), left.setDisabled(false), deletee, right.setDisabled(true), maxright.setStyle('blurple').setDisabled(true)], embed: emb })
						infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), deletee, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: emb })
					}
					if (button.id === 'deletee') {
						button.message.channel.send('**'+button.clicker.user.username+'** you just stopped buttons listeners!')
						return collector.stop()
					}
				})
				collector.on('end', () => {
					infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), deletee.setDisabled(true), right.setStyle('blurple').setDisabled(true), maxright.setStyle('blurple').setDisabled(true)], embed: emb })
				})
			}
			mongoose.connection.collection('levels').findOne({ [guild+'.id']: guild }, async (error, level) => {
			mongoose.connection.collection('vclevels').findOne({ [guild+'.id']: guild }, async (error, voice_level) => {
			mongoose.connection.collection('setups').findOne({ [message.guild.id+'.id']: message.guild.id }, async (error, setups) => {
				if (level == null) level = {}
				if (setups == null) setups = {}
				if (level == undefined) level = {}
				if (setups == undefined) setups = {}
				if (voice_level == null) voice_level = {}
				if (voice_level == undefined) voice_level = {}
			
				if (!setups[message.guild.id]) return message.channel.send('**'+message.author.username+'** this server must be registered first! use **!!setup** and try again!')
			
				if (level[guild]) delete level[guild]['id']
				if (voice_level[guild]) delete voice_level[guild]['id']
			
				if (level) delete level['_id']
				if (voice_level) delete voice_level['_id']
				
				let link = 'https://discord.gg/gWw6zBm79J'
				
				const maxright = new MessageButton()
				.setID('maxright')
				.setEmoji('871500410060435507')
				const right = new MessageButton()
				.setID('right')
				.setEmoji('871500441656127508')
				
				const text = new MessageButton()
				.setID('text')
				.setLabel('Text')
				.setStyle('green')
				.setEmoji('872878814940758016')
				const voice = new MessageButton()
				.setID('voice')
				.setLabel('Voice')
				.setStyle('green')
				.setEmoji('872911856115806268')
				
				const left = new MessageButton()
				.setID('left')
				.setEmoji('871500441509318656')
				const maxleft = new MessageButton()
				.setID('maxleft')
				.setEmoji('871500441920339998')
				
				let type
				let ranks
				let levels
				let maxPage
				let bu = voice
				
				let nocontent = ''
				let currentPage = 0
			
				let emb = new MessageEmbed()
				.setTitle('Leaderboard - '+message.guild.name)
				.setThumbnail('https://cdn.discordapp.com/attachments/634854460102803456/764872787940605962/548484.png')
				.setDescription('<a:level:815582320214933567> The following members have demonstrated an exceptional participation in this community!')
				.setColor('#2f3136')
				.setTimestamp()
			
				if (Object.values(level).length !== 0) {
					ranks = parseInt(currentPage == 0 ? currentPage + 1 : (currentPage == 1 ? (currentPage * 10) + 1 : currentPage * 10))
					levels = Object.values(level[guild]).sort((a, b) => parseFloat(b.level+'.'+b.xp) - parseFloat(a.level+'.'+a.xp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
					for (const dataa of levels) {
						let user = await client.users.fetch(dataa.id)
						nocontent += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+level[guild][dataa.id].level+', **XP**: '+level[guild][dataa.id].xp+' )\n'
					}
					let max = Object.values(level[guild]).length <= 10 ? 1 : (String(Object.values(level[guild]).length).endsWith('0') == true ? parseInt(Object.values(level[guild]).length) / 10 : (parseInt(Object.values(level[guild]).length) / 10) + 1)
					maxPage = max >= 50 ? 50 : parseInt(max)
					emb.setFooter(`Page ${currentPage + 1}/${maxPage}`)
					emb.addField('<:chat:815583351062003733> Chat Leaderboard', '\n'+nocontent.replace(message.author.username+' ( **Level**: '+level[guild][message.author.id].level+' )', '**'+message.author.username+' ( Level: '+level[guild][message.author.id].level+' )'+'**'), true)
				}
			
				if (Object.values(level).length == 0 && Object.values(voice_level).length == 0) return message.channel.send({ embed: emb.addField('\u200b', `**[${message.author.tag}](${link})** \n<:reply:880430755338149899> Sorry but no body participating in this server **(chat & voice participation)**\n<:space:817796102761611264>`).setFooter(`Page 1/1`), buttons:[maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), voice.setDisabled(true), right.setStyle('blurple').setDisabled(true), maxright.setStyle('blurple').setDisabled(true)] })
			
				if (Object.values(level).length == 0) emb.addField('\u200b', `**[${message.author.tag}](${link})** \n<:reply:880430755338149899> Sorry but no body participating in this server **(chat participation)**`)
				else if (Object.values(voice_level).length == 0) voice.setDisabled(true)
				let infoo = await message.channel.send({ embed: emb, buttons:[maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), Object.values(voice_level).length == 0 ? voice.setDisabled(true) : voice, right.setStyle('blurple'), maxright.setStyle('blurple')] })
				if (Object.values(level[guild]).length <= 10) infoo.edit({ embed: emb, buttons:[maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), voice, right.setStyle('blurple').setDisabled(true), maxright.setStyle('blurple').setDisabled(true)] })
				const filter = button => button.clicker.user.id == message.author.id
				const collector = infoo.createButtonCollector(filter, { time: 120000 })
				collector.on('collect', async button => {
					if (button.id === 'maxright') {
						currentPage = maxPage - 1
						let content = ''
					
						ranks = parseInt(currentPage == 0 ? currentPage + 1 : (currentPage == 1 ? (currentPage * 10) + 1 : currentPage * 10))
						let vv
						let vv2
				  
						let embed = new MessageEmbed()
						.setTitle('Leaderboard - '+message.guild.name)
						.setThumbnail('https://cdn.discordapp.com/attachments/634854460102803456/764872787940605962/548484.png')
						.setDescription('<a:level:815582320214933567> The following members have demonstrated an exceptional participation in this community!')
						.setFooter(`Page ${currentPage + 1}/${maxPage}`)
						.setColor('#2f3136')
						.setTimestamp()
				  
						if (!type) type = level
						if (type == level) {
							levels = Object.values(level[guild]).sort((a, b) => parseFloat(b.level+'.'+b.xp) - parseFloat(a.level+'.'+a.xp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
							for (const dataa of levels) {
								let user = await client.users.fetch(dataa.id)
								content += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+level[guild][dataa.id].level+', **XP**: '+level[guild][dataa.id].xp+' ) \n'
							}
						} else if (type == voice_level) {
							levels = Object.values(voice_level[guild]).sort((a, b) => parseFloat(b.voice+'.'+b.voiceXp) - parseFloat(a.voice+'.'+a.voiceXp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
							for (const dataa of levels) {
								let user = await client.users.fetch(dataa.id)
								content += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+voice_level[guild][dataa.id].voice+', **XP**: '+voice_level[guild][dataa.id].voiceXp+' ) \n'
							}
						}
						
						if (type == level) embed.addField('<:chat:815583351062003733> Chat Leaderboard', '\n'+content.replace(message.author.username+' ( **Level**: '+level[guild][message.author.id].level+' )', '**'+message.author.username+' ( Level: '+level[guild][message.author.id].level+' )'+'**'), true)
						else embed.addField('<:voice_icon:815589543930495006> Voice Leaderboard', '\n'+content.replace(message.author.username+' ( **Level**: '+voice_level[guild][message.author.id].voice+' )', '**'+message.author.username+' ( Level: '+voice_level[guild][message.author.id].voice+' )'+'**'), true)
						
						infoo.edit({ embed: embed, buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), bu, right.setStyle('blurple').setDisabled(true), maxright.setStyle('blurple').setDisabled(true)] })
					} else if (button.id === 'maxleft') {
						currentPage = 0
						
						let content = ''
				  
						ranks = parseInt(currentPage == 0 ? currentPage + 1 : (currentPage == 1 ? (currentPage * 10) + 1 : currentPage * 10))
						let vv
						let vv2
				  
						let embed = new MessageEmbed()
						.setTitle('Leaderboard - '+message.guild.name)
						.setThumbnail('https://cdn.discordapp.com/attachments/634854460102803456/764872787940605962/548484.png')
						.setDescription('<a:level:815582320214933567> The following members have demonstrated an exceptional participation in this community!')
						.setFooter(`Page ${currentPage + 1}/${maxPage}`)
						.setColor('#2f3136')
						.setTimestamp()
				  
						if (!type) type = level
						if (type == level) { 
							levels = Object.values(level[guild]).sort((a, b) => parseFloat(b.level+'.'+b.xp) - parseFloat(a.level+'.'+a.xp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
							for (const dataa of levels) {
								let user = await client.users.fetch(dataa.id)
								content += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+level[guild][dataa.id].level+', **XP**: '+level[guild][dataa.id].xp+' ) \n'
							}
						} else if (type == voice_level) {
							levels = Object.values(voice_level[guild]).sort((a, b) => parseFloat(b.voice+'.'+b.voiceXp) - parseFloat(a.voice+'.'+a.voiceXp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
							for (const dataa of levels) {
								let user = await client.users.fetch(dataa.id)
								content += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+voice_level[guild][dataa.id].voice+', **XP**: '+voice_level[guild][dataa.id].voiceXp+' ) \n'
							}
						}
				  
						if (type == level) embed.addField('<:chat:815583351062003733> Chat Leaderboard', '\n'+content.replace(message.author.username+' ( **Level**: '+level[guild][message.author.id].level+' )', '**'+message.author.username+' ( Level: '+level[guild][message.author.id].level+' )'+'**'), true)
						else embed.addField('<:voice_icon:815589543930495006> Voice Leaderboard', '\n'+content.replace(message.author.username+' ( **Level**: '+voice_level[guild][message.author.id].voice+' )', '**'+message.author.username+' ( Level: '+voice_level[guild][message.author.id].voice+' )'+'**'), true)
				  
						infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), bu, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: embed })
					} else if (button.id === 'left') {
						currentPage--
						if (currentPage <= 0) currentPage = 0

						let content = ''
					  
						ranks = parseInt(currentPage == 0 ? currentPage + 1 : (currentPage == 1 ? (currentPage * 10) + 1 : currentPage * 10))
						let vv
						let vv2
					  
						let embed = new MessageEmbed()
						.setTitle('Leaderboard - '+message.guild.name)
						.setThumbnail('https://cdn.discordapp.com/attachments/634854460102803456/764872787940605962/548484.png')
						.setDescription('<a:level:815582320214933567> The following members have demonstrated an exceptional participation in this community!')
						.setFooter(`Page ${currentPage + 1}/${maxPage}`)
						.setColor('#2f3136')
						.setTimestamp()
				  
						if (!type) type = level
						if (type == level) { 
							levels = Object.values(level[guild]).sort((a, b) => parseFloat(b.level+'.'+b.xp) - parseFloat(a.level+'.'+a.xp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
							for (const dataa of levels) {
								let user = await client.users.fetch(dataa.id)
								content += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+level[guild][dataa.id].level+', **XP**: '+level[guild][dataa.id].xp+' ) \n'
							}
						} else if (type == voice_level) {
							levels = Object.values(voice_level[guild]).sort((a, b) => parseFloat(b.voice+'.'+b.voiceXp) - parseFloat(a.voice+'.'+a.voiceXp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
							for (const dataa of levels) {
								let user = await client.users.fetch(dataa.id)
								content += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+voice_level[guild][dataa.id].voice+', **XP**: '+voice_level[guild][dataa.id].voiceXp+' ) \n'
							}
						}
				  
						if (type == level) embed.addField('<:chat:815583351062003733> Chat Leaderboard', '\n'+content.replace(message.author.username+' ( **Level**: '+level[guild][message.author.id].level+' )', '**'+message.author.username+' ( Level: '+level[guild][message.author.id].level+' )'+'**'), true)
						else embed.addField('<:voice_icon:815589543930495006> Voice Leaderboard', '\n'+content.replace(message.author.username+' ( **Level**: '+voice_level[guild][message.author.id].voice+' )', '**'+message.author.username+' ( Level: '+voice_level[guild][message.author.id].voice+' )'+'**'), true)
				  
						if (currentPage <= 0) return infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), bu, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: embed })
						infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), bu, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: embed })
					} else if (button.id === 'right') {
						currentPage++
						if ((currentPage + 1) >= maxPage) currentPage = maxPage - 1

						let content = ''
				  
						ranks = parseInt(currentPage == 0 ? currentPage + 1 : (currentPage == 1 ? (currentPage * 10) + 1 : currentPage * 10))
						let vv
						let vv2
				  
						let embed = new MessageEmbed()
						.setTitle('Leaderboard - '+message.guild.name)
						.setThumbnail('https://cdn.discordapp.com/attachments/634854460102803456/764872787940605962/548484.png')
						.setDescription('<a:level:815582320214933567> The following members have demonstrated an exceptional participation in this community!')
						.setFooter(`Page ${currentPage + 1}/${maxPage}`)
						.setColor('#2f3136')
						.setTimestamp()
				  
						if (!type) type = level
						if (type == level) { 
							levels = Object.values(level[guild]).sort((a, b) => parseFloat(b.level+'.'+b.xp) - parseFloat(a.level+'.'+a.xp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
							for (const dataa of levels) {
								let user = await client.users.fetch(dataa.id)
								content += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+level[guild][dataa.id].level+', **XP**: '+level[guild][dataa.id].xp+' ) \n'
							}
						} else if (type == voice_level) {
							levels = Object.values(voice_level[guild]).sort((a, b) => parseFloat(b.voice+'.'+b.voiceXp) - parseFloat(a.voice+'.'+a.voiceXp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
							for (const dataa of levels) {
								let user = await client.users.fetch(dataa.id)
								content += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+voice_level[guild][dataa.id].voice+', **XP**: '+voice_level[guild][dataa.id].voiceXp+' ) \n'
							}
						}
				  
						if (type == level) embed.addField('<:chat:815583351062003733> Chat Leaderboard', '\n'+content.replace(message.author.username+' ( **Level**: '+level[guild][message.author.id].level+' )', '**'+message.author.username+' ( Level: '+level[guild][message.author.id].level+' )'+'**'), true)
						else embed.addField('<:voice_icon:815589543930495006> Voice Leaderboard', '\n'+content.replace(message.author.username+' ( **Level**: '+voice_level[guild][message.author.id].voice+' )', '**'+message.author.username+' ( Level: '+voice_level[guild][message.author.id].voice+' )'+'**'), true)
				  
						if ((currentPage + 1) >= maxPage) return infoo.edit({ buttons: [maxleft.setDisabled(false), left.setDisabled(false), bu, right.setDisabled(true), maxright.setStyle('blurple').setDisabled(true)], embed: embed })
						infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(false), left.setStyle('blurple').setDisabled(false), bu, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: embed })
					} else if (button.id === 'voice') {
						currentPage = 0
				  
						type = voice_level
						bu = text
				  
						let content = ''
				  
						ranks = parseInt(currentPage == 0 ? currentPage + 1 : (currentPage == 1 ? (currentPage * 10) + 1 : currentPage * 10))
						let vv
						let vv2
				  
						let embed = new MessageEmbed()
						.setTitle('Leaderboard - '+message.guild.name)
						.setThumbnail('https://cdn.discordapp.com/attachments/634854460102803456/764872787940605962/548484.png')
						.setDescription('<a:level:815582320214933567> The following members have demonstrated an exceptional participation in this community!')
						.setFooter(`Page ${currentPage + 1}/${maxPage}`)
						.setColor('#2f3136')
						.setTimestamp()
				  
						if (type == level) { 
							levels = Object.values(level[guild]).sort((a, b) => parseFloat(b.level+'.'+b.xp) - parseFloat(a.level+'.'+a.xp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
							for (const dataa of levels) {
								let user = await client.users.fetch(dataa.id)
								content += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+level[guild][dataa.id].level+', **XP**: '+level[guild][dataa.id].xp+' ) \n'
							}
						} else if (type == voice_level) {
							levels = Object.values(voice_level[guild]).sort((a, b) => parseFloat(b.voice+'.'+b.voiceXp) - parseFloat(a.voice+'.'+a.voiceXp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
							for (const dataa of levels) {
								let user = await client.users.fetch(dataa.id)
								content += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+voice_level[guild][dataa.id].voice+', **XP**: '+voice_level[guild][dataa.id].voiceXp+' ) \n'
							}
						}
				  
						if (type == level) embed.addField('<:chat:815583351062003733> Chat Leaderboard', '\n'+content.replace(message.author.username+' ( **Level**: '+level[guild][message.author.id].level+' )', '**'+message.author.username+' ( Level: '+level[guild][message.author.id].level+' )'+'**'), true)
						else embed.addField('<:voice_icon:815589543930495006> Voice Leaderboard', '\n'+content.replace(message.author.username+' ( **Level**: '+voice_level[guild][message.author.id].voice+' )', '**'+message.author.username+' ( Level: '+voice_level[guild][message.author.id].voice+' )'+'**'), true)
						
						infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), bu, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: embed })
					} else if (button.id === 'text') {
						currentPage = 0
				  
						type = level
						bu = voice
				  
						let content = ''
				  
						ranks = parseInt(currentPage == 0 ? currentPage + 1 : (currentPage == 1 ? (currentPage * 10) + 1 : currentPage * 10))
						let vv
						let vv2
				  
						let embed = new MessageEmbed()
						.setTitle('Leaderboard - '+message.guild.name)
						.setThumbnail('https://cdn.discordapp.com/attachments/634854460102803456/764872787940605962/548484.png')
						.setDescription('<a:level:815582320214933567> The following members have demonstrated an exceptional participation in this community!')
						.setFooter(`Page ${currentPage + 1}/${maxPage}`)
						.setColor('#2f3136')
						.setTimestamp()
						
						if (type == level) { 
							levels = Object.values(level[guild]).sort((a, b) => parseFloat(b.level+'.'+b.xp) - parseFloat(a.level+'.'+a.xp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
							for (const dataa of levels) {
								let user = await client.users.fetch(dataa.id)
								content += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+level[guild][dataa.id].level+', **XP**: '+level[guild][dataa.id].xp+' ) \n'
							}
						} else if (type == voice_level) {
							levels = Object.values(voice_level[guild]).sort((a, b) => parseFloat(b.voice+'.'+b.voiceXp) - parseFloat(a.voice+'.'+a.voiceXp)).slice((currentPage == 0 ? currentPage : currentPage * 10), (currentPage == 0 ? currentPage + 10 : (currentPage * 10) + 10))
							for (const dataa of levels) {
								let user = await client.users.fetch(dataa.id)
								content += '**#'+(ranks++)+'**. '+user.username+' ( **Level**: '+voice_level[guild][dataa.id].voice+', **XP**: '+voice_level[guild][dataa.id].voiceXp+' ) \n'
							}
						}
				  
						if (type == level) embed.addField('<:chat:815583351062003733> Chat Leaderboard', '\n'+content.replace(message.author.username+' ( **Level**: '+level[guild][message.author.id].level+' )', '**'+message.author.username+' ( Level: '+level[guild][message.author.id].level+' )'+'**'), true)
						else embed.addField('<:voice_icon:815589543930495006> Voice Leaderboard', '\n'+content.replace(message.author.username+' ( **Level**: '+voice_level[guild][message.author.id].voice+' )', '**'+message.author.username+' ( Level: '+voice_level[guild][message.author.id].voice+' )'+'**'), true)
						infoo.edit({ buttons: [maxleft.setStyle('blurple').setDisabled(true), left.setStyle('blurple').setDisabled(true), bu, right.setStyle('blurple').setDisabled(false), maxright.setStyle('blurple').setDisabled(false)], embed: embed })
					}
				})
				collector.on('end', () => {
					infoo.edit({ buttons: [maxleft.setStyle('grey').setDisabled(true), left.setStyle('grey').setDisabled(true), bu.setDisabled(true), right.setStyle('grey').setDisabled(true), maxright.setStyle('grey').setDisabled(true)], embed: emb })
				})
			})
			})
			})
		})
	})
	
	let probot = ['probot']
	command(client, probot, async message => {
		let args = message.content.split(' ')
		let mention = message.mentions.users.first()
		if (!args) return message.channel.send('**'+message.author.username+'** please specify the type (**profile**) or (**rank**)')
		
		if (args[1] == 'profile') {
			let base = await jimp.read('https://api.probot.io/profile/'+(mention ? mention.id : message.author.id))
			let error, res = await base.getBufferAsync(jimp.MIME_PNG)
			return message.channel.send({ files: [{ attachment: res, name: `HyPeD.png` }] })
		}
		if (args[1] == 'rank') {
			let base = await jimp.read('https://api.probot.io/rank/'+message.guild.id+'/'+(mention ? mention.id : message.author.id))
			let error, res = await base.getBufferAsync(jimp.MIME_PNG)
			return message.channel.send({ files: [{ attachment: res, name: `HyPeD.png` }] })
		} else message.channel.send('**'+message.author.username+'** please the type must be (**profile**) or (**rank**)')
	})
	
	let maki = ['maki']
	command(client, maki, async message => {
		let args = message.content.split(' ')
		if (!args) return message.channel.send('**'+message.author.username+'** please specify the type (**level**), (**voice**), (**balance**), (**reputation**)')
		
		if (args[1] == 'level') {
			let base = await jimp.read('https://maki.gg/leaderboard/'+message.guild.id+'/level.png')
			let error, res = await base.getBufferAsync(jimp.MIME_PNG)
			if (error) return message.channel.send('**'+message.author.username+'** maki.gg must be in this server!')
			return message.channel.send({ files: [{ attachment: res, name: `HyPeD.png` }] })
		} else if (args[1] == 'voice') {
			let base = await jimp.read('https://maki.gg/leaderboard/'+message.guild.id+'/voice.png')
			let error, res = await base.getBufferAsync(jimp.MIME_PNG)
			if (error) return message.channel.send('**'+message.author.username+'** maki.gg must be in this server!')
			return message.channel.send({ files: [{ attachment: res, name: `HyPeD.png` }] })
		} else if (args[1] == 'balance') {
			let base = await jimp.read('https://maki.gg/leaderboard/'+message.guild.id+'/balance.png')
			let error, res = await base.getBufferAsync(jimp.MIME_PNG)
			if (error) return message.channel.send('**'+message.author.username+'** maki.gg must be in this server!')
			return message.channel.send({ files: [{ attachment: res, name: `HyPeD.png` }] })
		} else if (args[1] == 'reputation') {
			let base = await jimp.read('https://maki.gg/leaderboard/'+message.guild.id+'/reputation.png')
			let error, res = await base.getBufferAsync(jimp.MIME_PNG)
			if (error) return message.channel.send('**'+message.author.username+'** maki.gg must be in this server!')
			return message.channel.send({ files: [{ attachment: res, name: `HyPeD.png` }] })
		}
		else message.channel.send('**'+message.author.username+'** please the type must be (**level**), (**voice**), (**balance**), (**reputation**)')
	})
	
	let ttt = ['ttt','xo','tictactoe']
	command(client, ttt, async message => {
		
	})
	
})

let counter2 = {}
let counterm2 = {}
client.on('voiceStateUpdate', async (oldState, newState) => {
	// if (newState.member.user.id == '298230144357761032') {
	// if (newState.channel && newState.member.voice.deaf) newState.member.voice.setChannel(null)
	// }
	if (oldState.channel && !newState.channel) {
		if (oldState.guild.id !== '846445531961753600') return
		const entry = await oldState.guild.fetchAuditLogs({ type: 'MEMBER_DISCONNECT' }).then(audit => audit.entries.first())
		if (entry.executor && entry.executor.id == client.user.id) return
		if (entry.executor) {
			if (!counter2[oldState.guild.id]) counter2[oldState.guild.id] = {}
			if (!counter2[oldState.guild.id][entry.executor.id]) counter2[oldState.guild.id][entry.executor.id] = 0
			if (entry.createdTimestamp >= (Date.now() - 1000)) {
				if (entry.extra.count == counter2[oldState.guild.id][entry.executor.id]) return
				let username = client.users.cache.get(entry.executor.id)
				let channel = client.channels.cache.get('921824130851029072')
				if (!channel) return
				counter2[oldState.guild.id][entry.executor.id]++
				return channel.send('<@'+entry.executor.id+'> has just disconnected <@'+oldState.member.user.id+'> in **#'+oldState.channel.name+'**\n** **')
			}
			if (entry.extra.count > counter2[oldState.guild.id][entry.executor.id]) {
				let username = client.users.cache.get(entry.executor.id)
				let channel = client.channels.cache.get('921824130851029072')
				if (!channel) return
				counter2[oldState.guild.id][entry.executor.id] = entry.extra.count
				return channel.send('<@'+entry.executor.id+'> has just disconnected <@'+oldState.member.user.id+'> in **#'+oldState.channel.name+'** times (**'+entry.extra.count+'**)\n** **')
			}
		}
	}
	if (oldState.channel && newState.channel) {
		if (oldState.channel.id == newState.channel.id) return
		if (oldState.guild.id !== '846445531961753600') return
		const entry = await oldState.guild.fetchAuditLogs({ type: 'MEMBER_MOVE' }).then(audit => audit.entries.first())
		if (entry.executor && entry.executor.id == client.user.id) return
		if (entry.executor && entry.createdTimestamp >= (Date.now() - 1000)) {
			if (entry.extra.count == counterm2[entry.executor.id]) return
			let username = client.users.cache.get(entry.executor.id)
			let channel = client.channels.cache.get('921824130851029072')
			if (!channel) return
			if (!counterm2[entry.executor.id]) counterm2[entry.executor.id] = 0
			counterm2[entry.executor.id]++
			channel.send('<@'+entry.executor.id+'> has just moved <@'+newState.member.user.id+'> from **#'+oldState.channel.name+'** to **#'+newState.channel.name+'**\n** **')
		}
	}
})

let counter = {}
let counterm = {}
client.on('voiceStateUpdate', async (oldState, newState) => {
	if (oldState.channel && !newState.channel) {
		if (oldState.guild.id !== '892446628756193320') return
		const entry = await oldState.guild.fetchAuditLogs({ type: 'MEMBER_DISCONNECT' }).then(audit => audit.entries.first())
		if (entry.executor && entry.executor.id == client.user.id) return
		if (entry.executor) {
			if (oldState.member.user.id !== '458997221170479124') return
			if (!counter[oldState.guild.id]) counter[oldState.guild.id] = {}
			if (!counter[oldState.guild.id][entry.executor.id]) counter[oldState.guild.id][entry.executor.id] = 0
			let mem = oldState.guild.members.cache.get(entry.executor.id)
			if (entry.createdTimestamp >= (Date.now() - 1000)) {
				if (entry.extra.count == counter[oldState.guild.id][entry.executor.id]) return
				counter[oldState.guild.id][entry.executor.id]++
				if (mem.voice) return mem.voice.setChannel(null)
			}
			if (entry.extra.count > counter[oldState.guild.id][entry.executor.id]) {
				counter[oldState.guild.id][entry.executor.id] = entry.extra.count
				if (mem.voice) return mem.voice.setChannel(null)
			}
		}
	}
	
	if (oldState.channel && !newState.channel) {
		if (oldState.guild.id !== '727257189940592670') return
		const entry = await oldState.guild.fetchAuditLogs({ type: 'MEMBER_DISCONNECT' }).then(audit => audit.entries.first())
		if (entry.executor && entry.executor.id == client.user.id) return
		if (entry.executor) {
			if (!counter[oldState.guild.id]) counter[oldState.guild.id] = {}
			if (!counter[oldState.guild.id][entry.executor.id]) counter[oldState.guild.id][entry.executor.id] = 0
			if (entry.createdTimestamp >= (Date.now() - 1000)) {
				if (entry.extra.count == counter[oldState.guild.id][entry.executor.id]) return
				let username = client.users.cache.get(entry.executor.id)
				let channel = client.channels.cache.get('887139237437255730')
				if (!channel) return
				counter[oldState.guild.id][entry.executor.id]++
				return channel.send('<@'+entry.executor.id+'> has just disconnected <@'+oldState.member.user.id+'> in **#'+oldState.channel.name+'**\n** **')
			}
			if (entry.extra.count > counter[oldState.guild.id][entry.executor.id]) {
				let username = client.users.cache.get(entry.executor.id)
				let channel = client.channels.cache.get('887139237437255730')
				if (!channel) return
				counter[oldState.guild.id][entry.executor.id] = entry.extra.count
				return channel.send('<@'+entry.executor.id+'> has just disconnected <@'+oldState.member.user.id+'> in **#'+oldState.channel.name+'** times (**'+entry.extra.count+'**)\n** **')
			}
		}
	}
	if (oldState.channel && newState.channel) {
		if (oldState.channel.id == newState.channel.id) return
		if (newState.guild.id !== '727257189940592670') return
		const entry = await newState.guild.fetchAuditLogs({ type: 'MEMBER_MOVE' }).then(audit => audit.entries.first())
		if (entry.executor && entry.executor.id == client.user.id) return
		if (entry.executor) {
			if (!counterm[newState.guild.id]) counterm[newState.guild.id] = {}
			if (!counterm[newState.guild.id][entry.executor.id]) counterm[newState.guild.id][entry.executor.id] = 0
			if (entry.createdTimestamp >= (Date.now() - 1000)) {
				if (entry.extra.count == counterm[newState.guild.id][entry.executor.id]) return
				let username = client.users.cache.get(entry.executor.id)
				let channel = client.channels.cache.get('920764958076182588')
				if (!channel) return console.log('Unknown channel!')
				counterm[newState.guild.id][entry.executor.id]++
				return channel.send('<@'+entry.executor.id+'> has just moved <@'+newState.member.user.id+'> from **#'+oldState.channel.name+'** to **#'+newState.channel.name+'**\n** **')
			}
			if (entry.extra.count > counterm[newState.guild.id][entry.executor.id]) {
				let username = client.users.cache.get(entry.executor.id)
				let channel = client.channels.cache.get('920764958076182588')
				if (!channel) return console.log('Unknown channel!')
				counterm[newState.guild.id][entry.executor.id]++
				return channel.send('<@'+entry.executor.id+'> has just moved <@'+newState.member.user.id+'> from **#'+oldState.channel.name+'** to **#'+newState.channel.name+'** times (**'+entry.extra.count+'**)\n** **')
			}
		}
	}
})

client.on('voiceStateUpdate', async function(oldState, newState) {
	if (newState.member.user.id !== client.user.id) return
	if (oldState.member.user.id !== client.user.id) return
	let queue = client.queue.get(newState.guild.id)
	if (!queue) return
	if (newState.guild.me.voice && newState.guild.me.voice.mute) {
		if (queue.playing) {
			queue.playing = false
			queue.connection.dispatcher.pause(true)
			return queue.textChannel.send('<:pause:873241808883294230> Paused **'+queue.songs[0].title+'**')
		}
	} else if (newState.guild.me.voice && !newState.guild.me.voice.mute) {
		if (!queue.playing) {
			queue.playing = true
			queue.connection.dispatcher.resume()
			return queue.textChannel.send('<:resume:873242561723121795> Resuming **'+queue.songs[0].title+'**')
		}
	}
})

mongo(database1).then(async mongoose => {
	mongoose.connection.collection('setups').find({}, async (error, setups) => {
		if (setups == null) setups = {}
		if (setups == undefined) setups = {}

		setups.toArray(async function(err, result) {
			for (const data of result) {
				delete data['_id']
				setup[Object.values(data)[0]['id']] = Object.values(data)[0]
			}
		})
		
		client.on('voiceStateUpdate', async function(oldState, newState) {
			if (newState.member.user.bot) return
			if (oldState.member.user.bot) return
			
			if (!setup[newState.guild.id]) return
			
			if (!oldState.channel && newState.channel) {
				var addXP = setInterval(async function () {
					firstvcarray[newState.guild.id].push(newState.id)
					if (!newState.channel) {
						clearInterval(addXP)
					}
				}, 15000)
			}
			if (!firstvcarray[newState.guild.id]) firstvcarray[newState.guild.id] = []
			if (firstvcarray[newState.guild.id].length >= 50) {
				mongo(database1).then(async mongoose => {
					mongoose.connection.collection('vclevels').findOne({ [newState.guild.id+'.id']: newState.guild.id }, async (error, vclevel) => {
						if (vclevel == null) vclevel = {}
						if (vclevel == undefined) vclevel = {}
			  
						if (!vclevel[newState.guild.id]) {
							vclevel[newState.guild.id] = { id: newState.guild.id }
							mongoose.connection.collection('vclevels').insertOne({ [newState.guild.id]: { id: newState.guild.id } })
						}
						var promises = firstvcarray[newState.guild.id].map(function (commander) {
							let max = 13
							let min = 3
							let ran = parseInt(Math.floor(Math.random() * (max - min + 1)) + min)
							if (!vclevel[newState.guild.id][commander]) {
								vclevel[newState.guild.id][commander] = { voiceXp: ran, voice: 1, id: commander }
							} else if (vclevel[newState.guild.id][commander]) {

								const levels = vclevel[newState.guild.id][commander].voice
								const xps = vclevel[newState.guild.id][commander].voiceXp + ran
							  
								if (parseInt(xps) >= parseInt(levels) * 400) {
									vclevel[newState.guild.id][commander] = { voiceXp: 0, voice: levels + 1, id: commander }
								} else {
									vclevel[newState.guild.id][commander] = { voiceXp: xps, voice: levels, id: commander }
								}
							}
						})
						Promise.all(promises).then(function () {
							mongoose.connection.collection('vclevels').updateOne({ [newState.guild.id+'.id']: newState.guild.id }, { $set: { [newState.guild.id]: vclevel[newState.guild.id] } })
							firstvcarray[newState.guild.id] = []
						})
					})
				})
			}
			
			setTimeout(() => {
				if (firstvcarray[newState.guild.id].length !== 0) {
					mongo(database1).then(async mongoose => {
					mongoose.connection.collection('vclevels').findOne({ [newState.guild.id+'.id']: newState.guild.id }, async (error, vclevel) => {
						if (vclevel == null) vclevel = {}
						if (vclevel == undefined) vclevel = {}
			  
						if (!vclevel[newState.guild.id]) {
							vclevel[newState.guild.id] = { id: newState.guild.id }
							mongoose.connection.collection('vclevels').insertOne({ [newState.guild.id]: { id: newState.guild.id } })
						}
						var promises = firstvcarray[newState.guild.id].map(function (commander) {
							let max = 13
							let min = 3
							let ran = parseInt(Math.floor(Math.random() * (max - min + 1)) + min)
							if (!vclevel[newState.guild.id][commander]) {
								vclevel[newState.guild.id][commander] = { voiceXp: ran, voice: 1, id: commander }
							} else if (vclevel[newState.guild.id][commander]) {

								const levels = vclevel[newState.guild.id][commander].voice
								const xps = vclevel[newState.guild.id][commander].voiceXp + ran
							  
								if (parseInt(xps) >= parseInt(levels) * 400) {
									vclevel[newState.guild.id][commander] = { voiceXp: 0, voice: levels + 1, id: commander }
								} else {
									vclevel[newState.guild.id][commander] = { voiceXp: xps, voice: levels, id: commander }
								}
							}
						})
						Promise.all(promises).then(function () {
							mongoose.connection.collection('vclevels').updateOne({ [newState.guild.id+'.id']: newState.guild.id }, { $set: { [newState.guild.id]: vclevel[newState.guild.id] } })
							firstvcarray[newState.guild.id] = []
						})
					})
				})
				}
			}, 10000)
		})
		
		client.on('message', async message => {
			if (!message.guild) return
			if (message.author.bot) return
			
			// shit things
			
			let content = {
				message: trim(message.content, 1024),
				author: message.author.id,
				url: message.url
			}
			
			if (message.mentions.users.first()) {
				if (!mcounter[message.mentions.users.first().id]) mcounter[message.mentions.users.first().id] = {}
				if (!mcounter[message.mentions.users.first().id][message.guild.id]) mcounter[message.mentions.users.first().id][message.guild.id] = 0
				if (!mentionsnipes[message.mentions.users.first().id]) mentionsnipes[message.mentions.users.first().id] = {}
				if (!mentionsnipes[message.mentions.users.first().id][message.guild.id]) mentionsnipes[message.mentions.users.first().id][message.guild.id] = []
				if (mentionsnipes[message.mentions.users.first().id][message.guild.id].length >= 10) {
					if (mcounter[message.mentions.users.first().id][message.guild.id] >= 10) mcounter[message.mentions.users.first().id][message.guild.id] = 0
					mentionsnipes[message.mentions.users.first().id][message.guild.id][mcounter[message.mentions.users.first().id][message.guild.id]] = content
					mcounter[message.mentions.users.first().id][message.guild.id]++
				} else {
					mentionsnipes[message.mentions.users.first().id][message.guild.id].push(content)
				}
			}
			
			if (message.content == 'aji hna') {
				if (message.author.id !== '458997221170479124') return message.channel.send('comment ? \n shtk b7ala wlfti dwi m3aya')
				message.channel.send(':dog: haw haw haw')
			} else if(message.content.startsWith('bobi attack')) {
				if (message.author.id !== '458997221170479124') return message.channel.send('comment ? \n shtk b7ala wlfti t3yt m3aya')
				message.channel.send(':dog2: 3awwawawaw')
			} else if(message.content.startsWith('assit')) {
				if (message.author.id !== '458997221170479124') return message.channel.send('nn assit gha nta hhh')
				message.channel.send(':service_dog: ')
			} else if(message.content.toLowerCase() == 'hyped') {
				message.inlineReply('https://tenor.com/view/thanos-floating-infinity-war-marvel-gif-11392785')
			} else if(message.content.toLowerCase() == 'shadow') {
				message.inlineReply('https://cdn.discordapp.com/attachments/823637905729388554/935611092355412029/1635529533569.jpg')
			} else if(message.content.toLowerCase() == 'm9lama') {
				message.inlineReply('akbar baz fl3alam')
			} else if(message.content.toLowerCase() == 'hassan') {
				message.inlineReply('https://tenor.com/view/kiss-sexy-bye-hey-hi-gif-15318962')
			} else if(message.content.toLowerCase() == 'neko') {
				message.inlineReply('https://cdn.discordapp.com/attachments/933093349160779876/936213594780082196/IMG_20220127_115808.jpg')
			} else if(message.content.toLowerCase() == 'salma') {
				message.inlineReply('https://tenor.com/view/ekko-jinx-gif-23873645')
			} else if(message.content.toLowerCase() == 'nimo') {
				message.inlineReply('https://cdn.discordapp.com/attachments/823637905729388554/935611092355412029/1635529533569.jpg')
			} else if(message.content.toLowerCase() == 'imagine') {
				message.inlineReply('https://tenor.com/view/lion-king-lion-animal-windy-gif-16642021')
			} else if (message.mentions.users.first() == client.user && message.content.includes('kayna wla la')) {
				if (message.author.id !== '458997221170479124') return message.channel.send('nn hhhh')
				message.channel.send('kaynaa <:hehe:750050074591232250>')
			}
			if (message.content.startsWith(prefix)) {
				if (!message.channel.permissionsFor(message.guild.me).has('USE_EXTERNAL_EMOJIS')) message.channel.send('**'+message.author.username+'** Warning ❗❗ \n\n Please server admins must give me permission for using **External Emojis** because of some commands! (**required ❗**)')
				if (!message.channel.permissionsFor(message.guild.me).has('USE_EXTERNAL_EMOJIS')) client.channels.cache.get('717763226078543954').send('**'+message.guild.name+'** using **Genny Premium** without permission **External Emojis**!')
			}
			if (message.mentions.users.first() == client.user && message.content.split(' ')[1] == 'prefix') message.channel.send('**'+message.author.username+'** my current prefix is **'+prefix+'**')
			if (message.content.split(' ')[0].toLowerCase() == prefix+'remindme') {
				let time = message.content.split('-time')[1] ? require('ms')(message.content.split('-time')[1].replace(' ', '')) : null
				let text = message.content.split(' ').slice(1).join(' ').split(' -time')[0]
				await waiting(message)
				if (!text) return message.channel.send('**'+message.author.username+'** the reminder is empty <:scared:750050067032834097>')
				else if (!time) return message.channel.send('**'+message.author.username+'** please give me a `-time` argument! (Example: `-time 1h`) <:scared:750050067032834097>')
				else if (!isNaN(time) && time < require('ms')('10s')) return message.channel.send('**'+message.author.username+'** thats not a joke -.-! (Minimum: 10 seconds)')
				message.channel.send('<:clocks:873247210412834886> **'+message.author.username+'** I\'ll remind you of \`'+text+'\` in **'+require('ms')(time, { long: true })+'**!')
				setTimeout(() => message.author.send(`**:tada: Reminder!**\nYou asked me to remind you of: ${text}\nAt: ${message.createdAt}\n*Asked on: ${message.guild.name}*`), time)
			}
			if (afk[message.author.id] && message.content.split(' ')[0] !== prefix + 'afk') {
				delete afk[message.author.id]
				message.channel.send('Heeeey **'+message.author.username+'** welcome back <:looook:765589999613640754>')
			}
			if (message.mentions.users.first() && afk[message.mentions.users.first().id]) {
				if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('**'+message.author.username+'** I must have embed links permission')
				if (afk[message.mentions.users.first().id].reason === true) return message.channel.send('**'+message.author.username+'** I am sorry but **'+message.mentions.users.first().username+'** is **AFK** right now!')
				message.channel.send('**'+message.author.username+'** I am sorry but **'+message.mentions.users.first().username+'** is **AFK** right now for **'+afk[message.mentions.users.first().id].reason+'**!')
			}
			if (message.content.split(' ')[0] === prefix + 'afk') {
				if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send('**'+message.author.username+'** sorry I must have send messages permission in this server! (**'+message.guild.name+'**)')
				if (afk[message.author.id]) return
				let args = message.content.split(' ').slice(1)
				if (!args.join(' ')) {
					afk[message.author.id] = {
						reason: true
					}
					message.delete().catch(e => true)
					message.channel.send('**'+message.author.username+'** is **AFK** now. don\'t disturb him <:oops:765590003694305351>')
				} else {
					message.delete().catch(e => true)
					afk[message.author.id] = {
						reason: args.join(' ')
					}
					message.channel.send('**'+message.author.username+'** is **AFK** for **'+args.join(' ')+'** <:oops:765590003694305351>')
				}
			}
			
			if (!setup[message.guild.id]) return
      
			// a cooldown for guild (member)
			if (!commanderwait[message.guild.id]) commanderwait[message.guild.id] = {}
      
			if (leveled.length !== 0) {
				var promises = leveled.map(async function (lvl) {
					let sendauthor = await client.users.fetch(lvl[0].id)
					let guild = lvl[1].guild
					let leveel = lvl[0].level
					let channell = lvl[1].channel
					let author = sendauthor.username
				  
					if (setup[guild.id] && setup[guild.id].text == 'off') return
					// checking if channel setup is a DM type
					if (setup[guild.id] && setup[guild.id].channel == 'dm') {
						// checking if there is a message setup
						if (setup[guild.id] && !setup[guild.id].message) return sendauthor.send('**'+author+'** you have just reached (**'+(leveel)+'**)! congrats!').catch(e => console.log(e.message))
						else return sendauthor.send(setup[guild.id].message.replace(/%level%/g, leveel).replace(/%user%/g, sendauthor).replace(/%username%/g, author).replace(/%usertag%/g, sendauthor.tag)).catch(e => console.log(e))
					} else if(setup[guild.id] && setup[guild.id].channel) {
						let channel = client.channels.cache.get(setup[guild.id].channel)
						// checking if there is a message setup
						if (setup[guild.id] && !setup[guild.id].message) {
							// checking if the channel is invalid
							if (!channel) return channell.send('**'+author+'** you have just reached (**'+(leveel)+'**)! congrats!')
							return channel.send('**'+author+'** you have just reached (**'+(leveel)+'**)! congrats!')
						} else {
							// checking if the channel is invalid
							if (!channel) return channell.send(setup[guild.id].message.replace(/%level%/g, leveel).replace(/%user%/g, sendauthor).replace(/%username%/g, author).replace(/%usertag%/g, sendauthor.tag))
							return channel.send(setup[guild.id].message.replace(/%level%/g, leveel).replace(/%user%/g, sendauthor).replace(/%username%/g, author).replace(/%usertag%/g, sendauthor.tag))
						}
					} else {
						if (setup[guild.id] && !setup[guild.id].message) return channell.send('**'+author+'** you have just reached (**'+(leveel)+'**)! congrats!')
						else return channell.send(setup[guild.id].message.replace(/%level%/g, leveel).replace(/%user%/g, sendauthor).replace(/%username%/g, author).replace(/%usertag%/g, sendauthor.tag))
					}
				})
				Promise.all(promises).then(function () {
					leveled = []
				})
			}
      
			// stop the user to not be levled again
			if (commanderwait[message.guild.id][message.author.id] == true) return
      
			if (!firstarray[message.guild.id]) firstarray[message.guild.id] = []
      
			firstarray[message.guild.id].push(message.author.id)
      
			// leveling peopole and cleaning arrays
			if (firstarray[message.guild.id].length >= 50) {
				mongo(database1).then(async mongoose => {
					mongoose.connection.collection('levels').findOne({ [message.guild.id+'.id']: message.guild.id }, async (error, level) => {
						if (level == null) level = {}
						if (level == undefined) level = {}
			  
						if (!level[message.guild.id]) {
							level[message.guild.id] = { id: message.guild.id }
							mongoose.connection.collection('levels').insertOne({ [message.guild.id]: { id: message.guild.id } })
						}
						var promises = firstarray[message.guild.id].map(function (commander) {
							let max = 13
							let min = 3
							let ran = parseInt(Math.floor(Math.random() * (max - min + 1)) + min)
							if (!level[message.guild.id][commander]) {
								level[message.guild.id][commander] = { xp: ran, level: 1, id: commander }
							} else if (level[message.guild.id][commander]) {

								const levels = level[message.guild.id][commander].level
								const xps = level[message.guild.id][commander].xp + ran
							  
								if (parseInt(xps) >= parseInt(levels) * 400) {
									level[message.guild.id][commander] = { xp: 0, level: levels + 1, id: commander }
									leveled.push([ level[message.guild.id][commander], { channel: message.channel, guild: message.guild } ])
								} else {
									level[message.guild.id][commander] = { xp: xps, level: levels, id: commander }
								}
							}
						})
						Promise.all(promises).then(function () {
							mongoose.connection.collection('levels').updateOne({ [message.guild.id+'.id']: message.guild.id }, { $set: { [message.guild.id]: level[message.guild.id] } })

							firstarray[message.guild.id] = []
						})
					})
				})
			}
			
			setTimeout(() => {
				if (firstarray[message.guild.id].length !== 0) {
					mongo(database1).then(async mongoose => {
						mongoose.connection.collection('levels').findOne({ [message.guild.id+'.id']: message.guild.id }, async (error, level) => {
							if (level == null) level = {}
							if (level == undefined) level = {}

							if (!level[message.guild.id]) {
								level[message.guild.id] = { id: message.guild.id }
								mongoose.connection.collection('levels').insertOne({ [message.guild.id]: { id: message.guild.id } })
							}
							var promises = firstarray[message.guild.id].map(function (commander) {
								let max = 13
								let min = 3
								let ran = parseInt(Math.floor(Math.random() * (max - min + 1)) + min)
								if (!level[message.guild.id][commander]) {
									level[message.guild.id][commander] = { xp: ran, level: 1, id: commander }
								} else if (level[message.guild.id][commander]) {

									const levels = level[message.guild.id][commander].level
									const xps = level[message.guild.id][commander].xp + ran

									if (parseInt(xps) >= parseInt(levels) * 400) {
										level[message.guild.id][commander] = { xp: 0, level: levels + 1, id: commander }
										leveled.push([ level[message.guild.id][commander], { channel: message.channel, guild: message.guild } ])
									} else {
										level[message.guild.id][commander] = { xp: xps, level: levels, id: commander }
									}
								}
							})
							Promise.all(promises).then(function () {
								mongoose.connection.collection('levels').updateOne({ [message.guild.id+'.id']: message.guild.id }, { $set: { [message.guild.id]: level[message.guild.id] } })
								firstarray[message.guild.id] = []
							})
						})
					})
				}
			}, 10000)
			
			commanderwait[message.guild.id][message.author.id] = true
			setTimeout(() => { delete commanderwait[message.guild.id][message.author.id] }, 6000)
		})
	})
})


client.on('message', async message => {
	const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`)
	if (!prefixRegex.test(message.content)) return

	const [, matchedPrefix] = message.content.match(prefixRegex)

	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)
	
	const commandName = args.shift().toLowerCase()
	const commands = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))
	if (commands) {
		await waiting(message)
		if (message.author.id !== '458997221170479124') client.channels.cache.get('717763226078543954').send('**'+message.author.tag +'** running **!!'+commandName+'** in **('+message.guild.name+')**'+(message.content.split(' ').slice(1).join(' ') ? '\n<:space:817796102761611264>arguments: '+message.content.split(' ').slice(1).join(' ') : ''))
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('blacklists').findOne({ [message.author.id+'.id']: message.author.id }, async (error, blacklist) => {
				if (blacklist == null) blacklist = {}
				if (blacklist == undefined) blacklist = {}
					
				if (blacklist[message.author.id] && command !== prefix+'help' && command !== prefix+'bcheck' && command !== prefix+'blacklistcheck') {
					message.channel.send('**'+message.author.username+'** you are not able to use commands any more! because have been blacklisted!')
					return message.channel.send('**'+message.author.username+'** contact **'+hypedoo+'** for blacklist appeal!')
				}
		
				let eemb = new MessageEmbed()
				.setColor('#2f3136')
				.setDescription('<:protection:872911854391930942> **'+message.author.username+'** sorry **radio** is playing right now! \n <:space:817796102761611264>You have to **stop** it first **before** you use music!')
				.setImage(empty)
				.setTimestamp()
				const isRadio = message.client.radio.get(message.guild.id)
				if (isRadio) return message.channel.send(eemb)
				commands.execute(message, args, client)
				message.client.music.set(message.guild.id, {})
			})
		})
	}
})

client.on('clickButton', b => {
	b.reply.defer()
	if (b.id == 'show time') {
		let author = b.clicker.user.id
		mongo(database1).then(async mongoose => {
			mongoose.connection.collection('marry-couples').findOne({ [author+'.id']: author }, async (error, marry) => {
				if (marry == null) marry = {}
				if (marry == undefined) marry = {}
				
				let notmarried = new MessageEmbed()
				.setAuthor(b.clicker.user.tag, b.clicker.user.avatarURL({ dynamic: true }), 'https://discord.gg/gWw6zBm79J')
				.setDescription(`Hey **[${b.clicker.user.username}](https://discord.gg/gWw6zBm79J)** if you want to be **married** follow the **line** under!
				<:reply:880430755338149899> You have to **propose** for someone\'s hand and **wait** to be accepted!`)
				.setColor('#2f3136')
				.setThumbnail('https://cdn.discordapp.com/emojis/867371656598257685.png?v=1')
				
				if (!marry[author]) return b.message.channel.send(notmarried)
				
				let user = await client.users.fetch(marry[author].marry)
				if (!user) user = '<@'+marry[author].marry+'>'
				return b.message.channel.send('<:clocks:873247210412834886> **'+b.clicker.user.username+'** and **'+(user.username ? user.username : user)+'** was married since **('+marry[author].times+')**')
			})
		})
	}
	if (b.id === 'premium') {
		return b.message.channel.send('<:shop:872911855570526258> **'+b.clicker.user.username+'** for premium plans! please contact **'+hypedoo+'** if you wanna get some!')
	}
})

client.on('guildCreate', async guild => {
	let add = client.channels.cache.get(guild.channels.cache.filter(cutie => cutie.permissionsFor(client.user).has('SEND_MESSAGES') && cutie.type === 'text').map(pie => pie.id)[0])
	if (!add) return
	add.send('Hi there, I\'m **Genny Premium** Thanks for adding me to your server. \n\n Do \`!!help\` to get a list of commands, and if you are looking for music run \`!!play\` and happy lestning! \n If you need help, or find a bug: Join our support server at https://discord.gg/gWw6zBm79J')
})

client.on('guildCreate', guild => {
	let channel = client.channels.cache.get('770962103506829342')
	let embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle(`? \`${client.user.username}\` Join New Server.`)
    .addField('? Server/ID:', `» \`${guild.name}\` | \`(ID: ${guild.id})\``)
    .addField('? Server Owner:', `» ${guild.owner}`)
    .addField('? Member Count:', `» \`${guild.memberCount}\``).setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
    .addField('? Servers Counter:', `» \`${client.guilds.cache.size}\``)
	if (!channel) return
	channel.send(embed)
})

client.on('guildDelete', guild => {
	let channel = client.channels.cache.get('675743198009622531')
	let embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle(`\`${client.user.username}\` Leave New Server.`)
    .addField('? Server/ID:', `» \`${guild.name}\` | \`(ID: ${guild.id})\``)
    .addField('? Server Owner:', `» ${guild.owner}`)
    .addField('? Member Count:', `» \`${guild.memberCount}\``).setImage('https://media.discordapp.net/attachments/634854460102803456/803970383761244201/Genny_style.png')
    .addField('? Servers Counter:', `» \`${client.guilds.cache.size}\``)
	if (!channel) return
	channel.send(embed)
})

const Topgg = require('@top-gg/sdk')

const webhook = new Topgg.Webhook(dblm)

const express = require('express')

const app = express()

app.post('/dblwebhook', webhook.listener(vote => {
	let channel = client.channels.cache.get('880777974834675722')
	if (channel) return channel.send('=> '+vote.user+' just voted for us!')
}))

// const { AutoPoster } = require('topgg-autoposter')
// const dbl = AutoPoster(dblc, client)

// dbl.on('posted', () => {
//	 console.log('Posted stats to Top.gg!')
// })

let ecounter = {}
let dcounter = {}
client.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.embeds[0]) return
	if (newMessage.embeds[0]) return
	if (newMessage.author.bot) return
	if (oldMessage.author.bot) return
	if (newMessage.content == oldMessage.content) return
	if (!ecounter[oldMessage.channel.id]) ecounter[oldMessage.channel.id] = 0
	if (!editsnipes[oldMessage.channel.id]) editsnipes[oldMessage.channel.id] = []
	
	let content = {
		oldMsg: trim(oldMessage.content, 1024),
		author: oldMessage.author.id,
		newMsg: trim(newMessage.content, 1024)
	}
	if (editsnipes[oldMessage.channel.id].length >= 10) {
		if (ecounter[oldMessage.channel.id] >= 10) ecounter[oldMessage.channel.id] = 0
		editsnipes[oldMessage.channel.id][ecounter[oldMessage.channel.id]] = content
		ecounter[oldMessage.channel.id]++
	} else {
		editsnipes[oldMessage.channel.id].push(content)
	}
})

client.on('messageDelete', message => {
	if (message.embeds[0]) return
	if (message.author.bot) return
	if (message.content == '' && !message.attachments.first()) return
	
	if (!dcounter[message.channel.id]) dcounter[message.channel.id] = 0
	if (!deletesnipes[message.channel.id]) deletesnipes[message.channel.id] = []
	
	let content = {
		message: trim(message.content, 1024),
		author: message.author.id,
		img: message.attachments.first() ? message.attachments.first().proxyURL : empty
	}
	
	if (deletesnipes[message.channel.id].length >= 10) {
		if (dcounter[message.channel.id] >= 10) dcounter[message.channel.id] = 0
		deletesnipes[message.channel.id][dcounter[message.channel.id]] = content
		dcounter[message.channel.id]++
	} else {
		deletesnipes[message.channel.id].push(content)
	}
})

client.on('error', (err) => {
   console.log(err.message)
})

client.login(token)
