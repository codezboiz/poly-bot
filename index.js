const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require('ms');
const cheerio = require('cheerio');
const request = require('request');

const ytdl = require('ytdl-core');

const token = 'NjYwMjc2MDU3ODAyMjc2ODg0.Xio0cw.otg8f823I7TSiVcFQSAk35x4J3Y';

const PREFIX = '*';

var version = '1.0.0';

bot.on('ready', () => {
    console.log('Time to game!!!');
    bot.user.setActivity('https://playcanv.as/p/MjB8sdWn/', {type: 'PLAYING'}).catch(console.error);
});

bot.on('message', message => {
    if (message.content == 'YEET') {
        message.channel.send('YEEEEEEEEEEEEET');
    }
    if (message.content == 'Hello') {
        message.channel.send('Hey there!');
    }
    if (message.content == 'help') {
        message.channel.send('If you need some help, call the suicide hotline here! 1-800-273-8255');
    }
    if (message.content == 'PolyBrawl') {
        message.channel.send('https://playcanvas.com/project/620521/overview/polybrawl-pe');
    }
    if (message.content == 'Ryan is gay') {
        message.channel.send('He sure is!');
    }
    if (message.content == 'Sylis is gay') {
        message.channel.send('No, u');
    }
    if (!message.content.startsWith(PREFIX)) {
        return;
    }
    const parts = message.content.split(' ').map(s => s.trim()).filter(s => s);
    const command = parts[0].substr(PREFIX.length);
    if (!command) {
        return;
    }
        if (command == 'clear') {
            if (!message.member.roles.find(r => r.name === "Admin")) return message.channel.send('You don\'t have the permission "Admin"!');
            if (!args[1]) return message.reply('Please define second argument (How much messages?)')
            message.channel.bulkDelete(args[1]);
        }
        if (command == 'yeet') {
            message.channel.send('YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEET');
        }
        if (command == 'mute') {
            if (!message.member.roles.find(r => r.name === "Admin")) return message.channel.send('You don\'t have the permission "Admin"!');
            let person = message.guild.member(message.mentions.users.first())
            if (!person) return message.reply("Couldn't find that user!");
            let mainrole = message.guild.roles.find(role => role.name === "Member");
            if(!mainrole) return message.reply("Couldn't find member rule!");
            let muterole = message.guild.roles.find(role => role.name === "Mute");
            if(!muterole) return message.reply("Couldn't find mute rule!");
            let time = args[1];
            if (!time){
                return message.reply("You didn't specify a time!");
            }
            person.removeRole(mainrole.id);
            person.addRole(muterole.id);
            message.channel.send(`@${person.user.tag} has now been muted ${ms(ms(time))}`);
            setTimeout(function(){
                person.addRole(mainrole.id);
                person.removeRole(muterole.id);
                message.channel.send(`@${person.user.tag} has now been unmuted!`);
            }, ms(time))
        }
        if (command == 'kick') {
            if (!message.member.roles.find(r => r.name === "Admin")) return message.channel.send('You don\'t have the permission "Admin"!');
            const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.kick("You did something wrong, you got kicked!").then(() => {
                        message.reply(`Sucessfully kicked ${user.tag}`);
                    }).catch(err =>{
                        message.reply('I was not able to kick the member :(');
                        console.log(err);
                    })
                } else {
                    message.reply('This user either doesn\'t exist or isn\'t in this server!');
                }
            } else {
                message.reply('Specify a user!');
            }
        }
        if (command == 'ban') {
                if (!message.member.roles.find(r => r.name === "Admin")) return message.channel.send('You don\'t have the permission "Admin"!');
                const buser = message.mentions.users.first();
                if (buser) {
                    const member = message.guild.member(buser);
                    if (member) {
                        member.ban({reason: 'Did something against the rules...'}).then(() => {
                            message.reply(`The user, ${buser.tag} was sucsefully banned!`);
                        })
                    } else {
                        message.reply('This user either doesn\'t exist or isn\'t in this server!');
                    }
                } else {
                    message.reply('Specify a user!');
                }
        }
        if (command == 'image') {
                var options = {
                    url: "http://results.dogpile.com/serp?qc=images&q=" + 'cursedimage',
                    method: "GET",
                    headers: {
                        "Accept": "text/html",
                        "User-Agent": "Chrome"
                    }
                }
                request(options, function(error, response, responseBody) {
                    if (error) {
                        return;
                    }
                    $ = cheerio.load(responseBody);
                    var links = $(".image a.link");
                    var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
                    console.log(urls);
                    if(!urls.length){
                        return;
                    }
                    message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
                });
        }
        if (command == 'help') {
                const embed = new Discord.RichEmbed()
                .setTitle('Commands')
                .addField('yeet', 'Says yeet, \'cause we love to YEET')
                .addField('kick {username}', 'Kicks the selected user')
                .addField('ban {username}', 'Bans the selected user')
                .addField('image {type}', 'Sends a random image')
                .addField('mute {username} {time}', 'Makes it the selected user can\'t talk for a selected amount of time')
                .addField('clear {number}', 'Clears the selected amount of messages')
                .addField('polybrawl', 'Sends a link to PolyBrawl!');
                message.channel.sendEmbed(embed);
        }
        if (command == 'polybrawl') {
            message.channel.send('https://playcanvas.com/project/620521/overview/polybrawl-pe');
        }
});

bot.login(token);