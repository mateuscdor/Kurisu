const WSF = require('wa-sticker-formatter');
const utils = require('../utils');
const { fetchJson } = require('fetch-json')

const stickerFromImage = async (buffer, author, pack, type) => {
  var sticker = false;
  if (author || pack) {
    sticker = new WSF.Sticker(buffer, { animated: false, pack: pack ? pack : "Stikers", author: author ? author : 'Kurisu', "quality": 10, type })
  } else {
    sticker = new WSF.Sticker(buffer, { animated: false, "quality": 10, type })
  }

  const sticBuffer = await sticker.toBuffer();
  return sticBuffer;
}


const stickerFromVideo = async (imageBuffer, author, pack, type) => {
  const result = await utils.compressVideo(imageBuffer, null);
  var sticker = false;
  if (author || pack) {
    sticker = new WSF.Sticker(result, { animated: true, pack: pack ? pack : "Stikers", author: author ? author : 'Kurisu', "quality": 10, type })
  } else {
    sticker = new WSF.Sticker(result, { animated: true, "quality": 10, type })
  }
  const sticBuffer = await sticker.toBuffer();
  return sticBuffer;
}



const stickerbg = async (imagePath, author, pack) => {


  if (author || pack) {
    const sticker = new WSF.Sticker(imageBuffer, { crop: true, animated: true, pack: pack, author: author })
    await sticker.build()
    const sticBuffer = await sticker.get()
    return sticBuffer;
  }

  const sticker = new WSF.Sticker(imageBuffer, { crop: true, animated: true, pack: pack ? pack : "Stikers", author: author ? author : 'Kurisu' })
  await sticker.build()
  const sticBuffer = await sticker.get()
  return sticBuffer;
}


const doge = async () => {
  const result = await fetchJson.get('https://leon564-api.herokuapp.com/doge');
  var sticker = new WSF.Sticker(result.img, { animated: true, pack: "Stikers-anime", author: 'Kurisu', "quality": 10, type: 'full' })
  var sticBuffer = await sticker.toBuffer();
  return sticBuffer;
}

const snime = async () => {
  const result = await fetchJson.get('https://leon564-api.herokuapp.com/snime');
  var sticker = new WSF.Sticker(result.img, { animated: true, pack: "Stikers-anime", author: 'Kurisu', "quality": 10, type: 'full' })
  var sticBuffer = await sticker.toBuffer();
  return sticBuffer;

}

module.exports = {
  stickerFromImage,
  stickerFromVideo,
  doge,
  snime
}