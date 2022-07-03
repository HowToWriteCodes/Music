const play = require("./play");

module.exports = {
    name: "volume",
    usage: "[prefix]volume",
    description: "To increase/descrease the volume",

    run: async(client, message, args) => {
        var player = client.manager.players.get(message.guild.id);
        var channel = message.member.voice.channel;

        if (!player) return message.channel.send("Nothing playing")

        if (!channel) return message.channel.send("Join the channel first")

        if (channel.id !== player.voiceChannel) return message.channel.send("You need to join the same voice channel")

        if (!args.length) return message.channel.send(`Current Volume: \`${player.volume}\``);

        if (isNaN(args[0])) return message.channel.send("Please provide valid arguments")

        if (args[0] > 0 && args[0] < 200) {
            player.setVolume(Number(args[0]))
            return message.channel.send(`Volume set to: \`${player.volume}\``)
        } else {
            player.setVolume(100)
            return message.channel.send(`Volume set to: \`${player.volume}\``)
        }
    }
}