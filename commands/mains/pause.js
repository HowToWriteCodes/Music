module.exports = {
    name: `pause`,
    description: `To pause the player`,
    usage: `[prefix]pause`,


    run: async(client, message, args) => {
        const player = client.manager.players.get(message.guild.id);
        var pause = '⏸';
        const channel = message.member.voice.channel;

        if (!player)
            return message.channel.send("Pause?! There seems to be nothing playing")

        if (!channel)
            return message.channel.send("Join the channel first")

        if (!player.playing)
            return message.channel.send("Player already paused")

        await player.pause(true)
            .then(() => message.react(pause));

    }

}