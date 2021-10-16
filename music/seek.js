const { MessageEmbed } = require("discord.js");
const { YOUTUBE_API_KEY } = require("../config.json");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
	name: "search",
	description: "Search and select videos to play",
	async execute(message, args, client) {
		if (!args.length) return message.channel.send('**'+message.author.username+'** you must include a valid arguments!')
		if (message.channel.activeCollector) return message.channel.send(`**${message.author.username},** sorry but a message collector is already active in this channel. <:Gennys_love_me:683642974172872734>`)
		if (!message.member.voice.channel) return message.channel.send('<:attention:872878815523799040> **'+message.author.username+'** you must be in a voice channel to use this command!')

		const search = args.join(" ")

		let resultsEmbed = new MessageEmbed()
		  .setAuthor(message.client.user.username, message.client.user.avatarURL(), "https://youtube.com/")
		  .setDescription(`**Song Selection** Type the number of the song <:Gennys_aww:683643069140041755> \n\n ${search}`)
		  .setColor("#2f3136")
		  .setFooter(message.author.username, message.author.avatarURL())
		  .setTimestamp()

		try {
			const results = await youtube.searchVideos(search, 10)
			results.map((video, index) => resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`))

			var resultsMessage = await message.channel.send(resultsEmbed);

			function filter(msg) {
				const pattern = /(^[1-9][0-9]{0,1}$)/g;
				return pattern.test(msg.content) && parseInt(msg.content.match(pattern)[0]) <= 10;
			}

			message.channel.activeCollector = true;
			const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] });
			const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;

			message.channel.activeCollector = false;
			message.client.commands.get("play").execute(message, [choice]);
			resultsMessage.delete().catch(console.error);
		} catch (error) {
			console.error(error);
			message.channel.activeCollector = false;
		}
	  }
}