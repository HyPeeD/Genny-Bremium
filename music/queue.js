const { MessageEmbed, splitMessage, escapeMarkdown } = require('discord.js')

module.exports = {
  name: 'queue',
  aliases: ['q'],
  description: 'Show the music queue and now playing.',
  execute(message, client) {
    const queue = message.client.queue.get(message.guild.id)
    if (!queue) return message.channel.send('**'+message.author.username+'**, sorry no songs playing in this server!')

    const description = queue.songs.map((song, index) => `\n **[${index + 1}]**. ${escapeMarkdown(song.title)}`)

    let queueEmbed = new MessageEmbed()
    .setAuthor(message.client.user.username, message.client.user.avatarURL(), 'https://youtube.com/')
    .setDescription('<:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:space:817796102761611264><:queue:873258930845933608> Server Queue'+description)
    .setColor('#2f3136')
    .setFooter(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setTimestamp()

    const splitDescription = splitMessage(description, {
		maxLength: 2048,
		char: '\n',
		prepend: '',
		append: ''
    })

    splitDescription.forEach(async (m) => {
		queueEmbed.setDescription(m)
		message.channel.send(queueEmbed)
    })
  }
}