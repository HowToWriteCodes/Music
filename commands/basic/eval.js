module.exports = {
    name: "eval",

    run: async(client, message, args) => {
        message.reply(eval(args.join(" ")));
    }
}