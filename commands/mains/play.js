module.exports = {
    name: "play",
    run: async(client, message, args) => {


        const channel = message.member.voice.channel;

        if (!channel) return message.channel.send("Join a voice channel first");
        if (!args.length) return message.channel.send("Please provide URL or a name to search");

        /*@DETECTING PLAYER*/
        var player = client.manager.players.get(message.guild.id);

        if (!player) {
            player = await message.client.manager.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                selfDeafen: true,
            });
        }

        if (player && player.node && !player.node.connected) await player.node.connect();

        if (channel.id !== player.voiceChannel) return message.channel.send("You need to join the same voice channel")



        const search = args.join(' ');
        let reso

        try {
            res = await player.search(search, message.author)
            switch (res.loadType) {
                case 'LOAD_FAILED':
                    player.destroy();
                    throw res.exception;

                case 'TRACK_LOADED':
                    qsong();
                    return;

                case 'PLAYLIST_LOADED':
                    qplaylist();
                    return;

                case 'SEARCH_RESULT':
                    qsearch();
                    return;
            }
        } catch (er) {
            return console.log(er);
        }

        //QUEUING SONGS
        async function qsong() {
            if (!res.tracks[0]) {
                return message.channel.send("Unable to find the requested song").then(msg => {
                    setTimeout(() => {
                        msg.delete().catch(() => {})
                    }, 3000)
                })

            }

            if (player.state !== "CONNECTED") {
                player.set("message", message);
                player.set("author", message.author);
                player.connect();
                player.queue.add(res.tracks[0]);
                player.play();
                player.pause(false);
            } else if (!player.queue || !player.queue.current) {
                player.queue.add(res.tracks[0]);
                player.play();
                player.pause(false);
            } else {
                player.queue.add(res.tracks[0]);
            }
            message.channel.send("Queued " + "`" + `${res.tracks[0].title}` + "`");
        }


        //QUEUING PLAYLIST
        async function qplaylist() {
            if (!res.tracks)
                return message.channel.send("Unable to find requested playlist").then(msg => {
                    setTimeout(() => {
                        msg.delete().catch(() => {})
                    }, 3000)
                })
            if (player.state !== "CONNECTED") {
                player.set("message", message)
                player.set("author", message.author)
                player.connect();
                player.queue.add(res.tracks);
                player.play();
                player.pause(false);
            } else if (!player.queue || !player.queue.current) {
                player.queue.add(res.tracks);
                player.play();
                player.pause(false);
            } else {
                player.queue.add(res.tracks);
            }
            message.channel.send("Queued " + "`" + `${res.playlist.name}` + "`" + " containing " + "`" + `${res.tracks.length} songs` + "`");
        }

        //SEARCHING SONG
        async function qsearch() {
            const results = res.tracks.slice(0, 1);

            if (!res.tracks[0]) {
                return message.channel.send("Unable to find the requested song").then(msg => {
                    setTimeout(() => {
                        msg.delete().catch(() => {})
                    }, 3000)
                })

            }

            if (player.state !== "CONNECTED") {
                player.set("message", message);
                player.set("author", message.author);
                player.connect();
                player.queue.add(res.tracks[0]);
                player.play();
                player.pause(false);
            } else if (!player.queue || !player.queue.current) {
                player.queue.add(res.tracks[0]);
                player.play();
                player.pause(false);
            } else {
                player.queue.add(res.tracks[0]);
            }
            message.channel.send("Queued " + "`" + `${res.tracks[0].title}` + "`");
        }
    }
}