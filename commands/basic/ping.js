module.exports = {
    name: "ping",

    run: async(client, message) => {
        message.reply(`Ping: ${client.ws.ping} ms`)
    }
}