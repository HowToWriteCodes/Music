const { Client, Collection, Intents } = require(`discord.js`);
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const { readdirSync } = require(`fs`);
const { Manager } = require(`erela.js`);
const secrets = require(`./config.json`);
client.commands = new Collection();


//PULLING COMMANDS
try {
    readdirSync("./commands").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
        for (const file of commands) {
            const command = require(`./commands/${dir}/${file}`);
            if (command.name)
                client.commands.set(command.name, command);
            else
                console.log("Failed to load command");
        }
    })
} catch (er) {
    console.log("Error: " + er);
}
//PULLING COMMANDS

const nodes = [{
    host: "Lavalink.officialnikhil.repl.co",
    password: "maybeiwasboring",
    port: 443,
    secure: true,
}];

client.manager = new Manager({
        nodes,
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id);
            if (guild)
                guild.shard.send(payload);
        }
    })
    .on("nodeConnect", node => {
        console.log("Connected " + node.options.identifier);
    })
    .on("nodeError", (node, error) => {
        console.log(error)
        console.log("An error occured " + node.options.identifier);
    })

client.once('ready', () => {
    client.manager.init(client.user.id);
    console.log("Client started ");

})

client.on("raw", ust => {
    client.manager.updateVoiceState(ust);
})

client.on("messageCreate", async message => {
    if (!message.content.startsWith("!") || message.author.bot || !message.guild) return;

    const [name, ...args] = message.content.slice(1).split(/\s+/g);

    const command = client.commands.get(name);
    if (!command) return;

    try {
        command.run(client, message, args);
    } catch (err) {
        message.reply("An unexpected error occured " + err.message);
    }
})


client.login(secrets.token);