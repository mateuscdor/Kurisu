const { messageHandler } = require('./message')
const makeWASocket = require('@adiwajshing/baileys');
const fs = require('fs')

const { state, saveState } = makeWASocket.useSingleFileAuthState('./config/auth_info_multi.json')

async function connectToWhatsApp() {

    const sock = makeWASocket.default({
        printQRInTerminal: true,
        auth: state,
        version: [2, 2204, 13]
    })

    sock.ev.on('creds.update', saveState)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== makeWASocket.DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if (shouldReconnect) {
                connectToWhatsApp()
            }
        } else if (connection === 'open') {
            console.log('opened connection')
        }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0]
        if (!m.message) return
        const messageType = Object.keys(m.message)[0]
        //console.log(sock.user.id)
        //fs.writeFileSync('./tets.json', JSON.stringify(m))

        
        messageHandler(m, sock)



    })

}
// run in main file
connectToWhatsApp()