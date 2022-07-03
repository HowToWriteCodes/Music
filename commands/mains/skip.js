module.exports = {
    name: "skip",
    usage: "[prefix]skip",
    description: "To skip the current playing song",

    run: async(client, message, args) => {

        var player = client.manager.players.get(message.guild.id);
        var channel = message.member.voice.channel;

        if (!player) return message.channel.send("Nothing playing")

        if (!channel) return message.channel.send("Join the voice channel first");

        if (channel.id !== player.voiceChannel) return message.channel.send("Join the same channel");

        if (!player.queue.current) return message.channel.send("Nothing playing")

        var title = player.queue.current.title;
        player.stop();
        return message.channel.send(`Skipped \`${title}\``);

    }
}