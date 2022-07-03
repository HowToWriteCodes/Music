module.exports = {
    name: "eval",

    run: async(client, message, args) => {

        try {
            var res = eval(args.join(" "))
            message.channel.send(`Result:\n \`\`\`${res}\`\`\` \n Type: \`\`\`${typeof res}\`\`\``)
        } catch (er) {
            console.log(er);
        }
    }
}