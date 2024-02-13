import qrcode from 'qrcode-terminal';
// import { ChatGPTAPIBrowser } from 'chatgpt'

// const { Client, LocalAuth } = require('whatsapp-web.js');
import wb from 'whatsapp-web.js';
const { Client, LocalAuth, MessageMedia } =wb;
import cp from "child_process";
const { exec } =cp;
import { v4 as uuidv4 } from 'uuid';




const client = new Client({
    
    puppeteer:{
    	executablePath: '/opt/google/chrome/google-chrome',
    },
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Client is ready!');
});

console.log('hello');

// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
// });

	// use puppeteer to bypass cloudflare (headful because of captchas)
// const api = new ChatGPTAPIBrowser({
// 	email: '',
// 	password: '',
// 	isGoogleLogin: true
// })

// await api.initSession()

client.initialize();
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

async function rec(){
	client.on('message', message => {
		console.log(message.from);
		console.log(message.body);


		// if(message.from==='') { //reply with audio
		// 	(async () => {
		// 		const fileName = uuidv4();
		// 		const outputFilePath = `tmp/${fileName}.opus`;

		// 		const msg='echo "' + message.body + '" | piper --model /home/skd/Downloads/piper/en-us-danny-low.onnx --output_file '+outputFilePath;
		// 		console.log(msg);
				
		// 		exec(msg);
		// 		await sleep(5000);
		//         const media = MessageMedia.fromFilePath(outputFilePath);
		//     	client.sendMessage(message.from,media);	
		// 	})();
		// }

		if(message.from==='') { 
			(async () => {
				var response = await api.sendMessage(message.body);
				console.log("sending message");
				await sleep(2000);
				console.log(response);
				console.log(response.response);
				client.sendMessage(message.from,response.response);
			})();
		}
	});

}

rec()










 