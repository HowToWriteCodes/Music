module.exports = {
    name: "eval",

    run: async(client, message, args) => {
        message.reply("Result: " + eval(args.join(" ")));
    }
}