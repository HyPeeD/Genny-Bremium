module.exports = {
  canModifyQueue(member, send) {
    const { channel } = member.voice;
    const botChannel = member.guild.me.voice.channel;

    if (channel !== botChannel) {
      send.send(':no_entry_sign: You must be listening in **'+member.guild.me.voice.channel.name+"** to use that!").catch(console.error);
      return false;
    }

    return true;
  }
};
