module.exports = {
    name: "loop",
    usage: "[prefix]loop <queue/track>",
    description: "Used to loop the track or queue",

    run: async(client, message, args) => {
        var channel = message.member.voice.channel;
        var player = client.manager.players.get(message.guild.id);
        var loopstate;

        if (!player) return message.channel.send("Nothing playing")

        if (!channel) return message.channel.send("Join the channel first")

        if (channel.id !== player.voiceChannel) return message.channel.send("Join the same channel first")

        if (!args[0]) {
            player.setQueueRepeat(!player.queueRepeat);
            loopstate = player.queueRepeat ? "Enabled" : "Disabled";
            return message.channel.send(`${loopstate} repeating the queue`);
        }

        if (args[0].toLowerCase() === "song" || args[0].toLowerCase() === "track") {
            if (player.queueRepeat) player.setQueueRepeat(false)
            player.setTrackRepeat(!player.trackRepeat);
            loopstate = player.trackRepeat ? "Enabled" : "Disabled";
            return message.channel.send(`${loopstate} srepeating the track`);
        } else if (args[0].toLowerCase() === "queue") {
            if (player.trackRepeat) player.setTrackRepeat(false);
            player.setQueueRepeat(!player.queueRepeat);
            loopstate = player.queueRepeat ? "Enabled" : "Disabled";
            return message.channel.send(`${loopstate} repeating the queue`);
        } else
            return message.channel.send("Invalid Arguments");

    }
}