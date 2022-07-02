module.exports = {
    name: `stop`,
    usage: `[prefix]stop`,
    description: `Used to destroy the player`,

    run: async(client, message, args) => {
        var player = client.manager.players.get(message.guild.id);
        var channel = message.member.voice.channel;

        if (!player) return message.channel.send("Nothing playing");

        if (!channel) return message.channel.send("Join the channel first");

        if (channel.id !== player.voiceChannel) return message.channel.send("Join the same voice channel")

        player.destroy();
        message.channel.send("Stopped");

    }
}