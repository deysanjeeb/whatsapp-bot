import wb from 'whatsapp-web.js';
const { Client, LocalAuth } =wb;
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
 
async function rec(){
	client.on('message', message => {
		console.log(message.from);
		console.log(message.body);
    });

}

rec()