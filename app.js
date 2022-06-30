const makeWASocket = require('@adiwajshing/baileys').default;
const { DisconnectReason, useMultiFileAuthState } = require('@adiwajshing/baileys');
const fs = require('fs');

const numbers = fs.readFileSync('numbers.txt', 'utf-8').split('\n');

const writeValidNumbers = (async = (content) => {
  fs.writeFile('validNumbers.txt', content, (err) => {
    if (err) console.log(err);
    else {
      console.log('File written successfully');
    }
  });
});

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

  const sock = makeWASocket({
    // can provide additional config here
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
      // reconnect if not logged out
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === 'open') {
      console.log('opened connection');

      checkValidity(numbers);
    }
  });

  sock.ev.on('creds.update', saveCreds);

  const checkValidity = async (numbers) => {
    let validNumbers = '';

    for (let i = 0; i < numbers.length; i++) {
      const [result] = await sock.onWhatsApp(numbers[i]);

      if (!result) {
        validNumbers += `${numbers[i]} UNREGISTERED`;
      } else {
        validNumbers += `${numbers[i]} REGISTERED`;
      }

      if (i < numbers.length - 1) {
        validNumbers += '\n';
      } else {
        validNumbers += '';
      }
    }

    return writeValidNumbers(validNumbers);
  };
}

// run in main file
connectToWhatsApp();
