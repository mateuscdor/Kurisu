const { fetchJson } = require('fetch-json');
const utils = require('../utils');
const fs=require('fs');
async function randomnfsw(callback) {
  const result = await fetchJson.get(`https://kurisu-api.herokuapp.com/api/nfsw/waifu`);
  //console.log(result)
  const image = await utils.imageDownloadAndResize(result.result.url)
  await callback({ image, name: result.result.title })
  fs.unlinkSync(image)
  return true;
}

async function randomyaoinfsw(callback) {
  const result = await fetchJson.get(`https://kurisu-api.herokuapp.com/api/nfsw/yaoi`);
  //console.log(result)
  const image = await utils.imageDownloadAndResize(result.result.url)
  await callback({ image, name: result.result.title })
  fs.unlinkSync(image)
  return true;
}

module.exports = {
  randomnfsw,
  randomyaoinfsw

}