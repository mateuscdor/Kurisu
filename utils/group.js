const makeWASocket = require('@adiwajshing/baileys');


const isGroupAdmin = async (m, sock) => {
    const metadata = await sock.groupMetadata(m.key.remoteJid);
    const participant = m.key.participant.includes(':') ? m.key.participant.split(':')[0] + '@s.whatsapp.net' : m.key.participant;
    var isAdmin = metadata.participants.find(x => x.id == participant && x.admin);    
    return isAdmin ? true : false;
}
const botIsAdmin = async (m, sock) => {
    const metadata = await sock.groupMetadata(m.key.remoteJid);
    //const participant = m.key.participant.includes(':') ? m.key.participant.split(':')[0] + '@s.whatsapp.net' : m.key.participant;
    var isAdmin = metadata.participants.find(x => x.id == sock.user.id && x.admin);    
    return isAdmin ? true : false;
}

module.exports = {
    isGroupAdmin,
    botIsAdmin
}