module.exports = {
    name: `resume`,
    usage: `[prefix]resume`,
    description: `Used to resume the paused player`,

    run: async(client, message, args) => {
        var player = client.manager.players.get(message.guild.id);
        var channel = message.member.voice.channel;

        if (!player) return message.channel.send("Nothing playing to resume")

        if (!channel) return message.channel.send("Join the channel first")

        if (channel.id !== player.voiceChannel) return message.channel.send("You need to join the same voice channel")

        if (player.playing) return message.channel.send("The player is not paused")

        player.pause(false)
        message.channel.send("Resumed")
    }
}