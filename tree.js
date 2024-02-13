const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
// });

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));


client.on('message', message => {
    console.log(message.from);
    console.log(message.body);
    if(message.from!=='@c.us'||'@g.us') {
        client.sendMessage('@g.us', message.body);
        console.log('Relayed to the group:',message.body);
    }
});