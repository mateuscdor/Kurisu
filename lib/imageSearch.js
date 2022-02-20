const uploadImage=require('../utils/uploadImage.js')
const reverseImageSearch = require('reverse-image-search-google')
const { fetchJson } = require('fetch-json');
var gis = require('g-i-s');

const searchByImg = async (img, random = false) => {
  const upf = await uploadImage.uploadImage(img); 
  if (upf.error) return { title: "...", url: "Ocurrio un error, intente mas tarde" };
  const result = await fetchJson.get('https://node-reverse-image-search.herokuapp.com/?imageUrl=' + encodeURIComponent(upf))
  result.shift();
  if (random) return [result[Math.floor(Math.random() * result.length)]]
  return result;
}

const searchByText = async (search, result) => {
  return gis(search,result);  
}

module.exports = {
  searchByImg,
  searchByText
}