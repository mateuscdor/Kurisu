const imgbbUploader = require("imgbb-uploader");
const config = require('../config/config.js');

const uploadImage = async (img, name, expiration) => {
  var _name = name ? name : Date.now();
  var _expiration = expiration ? expiration : 120;
  if (!img) return 'error';
  const options = {
    apiKey: config.imgbb_apikey,
    imagePath: img,
    name: _name,
    expiration: _expiration
  };
  imgbbUploader(options)
    .then((response) => { return response.url })
    .catch((error) => { return { error: true, reason: error } });
}


module.exports = uploadImage;
