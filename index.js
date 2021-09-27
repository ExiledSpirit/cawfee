const Discord = require('discord.js');
const config = require ('./config.json');
const https = require('https');

const client = new Discord.Client();

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.login(config.BOT_TOKEN);

const acceptedCommands = {
    teste(message) {
        message.reply("Testado");
    },
    query(message) {
        const options = {
            hostname: 'http://api.fungenerators.com',
            port: 443,
            path: '/fact/search?query=Weasel',
            method: 'GET'
        }
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            
            res.on('data', d => {
                message.reply(`${d.contents.fact}`);
            })
        })
        
        req.on('error', error => {
            console.error(error)
        })
        
        req.end()
    }
}

function onMessageHandler(message) {
    if (message.author.bot) return;

    if (message.content.substring(0, 1) === '-') {
        var args = message.content.substring(1).split(' ');
        var command = args[0];
        console.log(args);
        const commandFunction = acceptedCommands[command];
        if (commandFunction) {
            commandFunction(message);
            return;
        }
    }
    console.log(`* Unknown command`);
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}