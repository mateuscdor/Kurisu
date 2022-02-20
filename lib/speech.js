const path = require('path');
const gTTS = require('gtts');
const utils = require('../utils')

const speech = async (lang = 'es', text, name = Date.now(), callback) => {
  //var speech = res.text;
  var gtts = new gTTS(text, lang);
  const file = path.join(__dirname, '..', `/temp/${name}.mp3`);
  gtts.save(file, async function (err, result) {
    if (err) { throw new Error(err); }
    console.log("Text to speech converted!");
    await callback(file);
    utils.fileDelete(file)
  });
}
module.exports = speech;