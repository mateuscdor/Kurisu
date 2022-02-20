const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');



const removeBg = async (inputPath) => {
  //const inputPath = './a.jpg';
  if(!inputPath)return'error';
  const formData = new FormData();
  formData.append('size', 'auto');
  formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
  return axios({
    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: formData,
    responseType: 'arraybuffer',
    headers: {
      ...formData.getHeaders(),
      //'X-Api-Key': process.env['BgApikey'],
      'X-Api-Key': 'AruGe88ipUNcoZpkgRGPhFqQ'
    },
    encoding: null
  }).then((response) => {
    if (response.status != 200) return'error' //console.error('Error:', response.status, response.statusText);
    //fs.writeFileSync("./a2.png", response.data);
    
    return response.data;
  }).catch((error) => {
    return console.error('Request failed:', error);
  });
}

module.exports = {
  removeBg
}