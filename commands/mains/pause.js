module.exports = {
    name: `pause`,
    description: `To pause the player`,
    usage: `[prefix]pause`,


    run: async(client, message, args) => {

        const player = client.manager.players.get(message.guild.id);
        const channel = message.member.voice.channel;

        if (!player) return message.channel.send("Pause?! There seems to be nothing playing")

        if (!channel) return message.channel.send("Join the channel first")

        if (channel.id !== player.voiceChannel) return message.channel.send("You need to join the same voice channel")

        if (!player.playing) return message.channel.send("Player already paused")

        await player.pause(true)
        message.channel.send("Player Paused ⏸")

    }
}