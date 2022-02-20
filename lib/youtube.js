const scrape = require('scrape-yt');
const ytmp3 = require('youtube-mp3-downloader');
const path = require("path");
const fs = require("fs"), request = require('request');
const utils = require('../utils')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

async function youtubeMp32(msg, callback) {

  const scraping = await scrape.search(msg, { type: 'video', limit: 5 });
  const video = scraping.filter((vid) => vid.duration < 600)[0];

  if (!!!video) return await callback('error');




  const videoid = video.id;
  const dir = path.resolve(__dirname, '../temp');




  try {

    const downloadOptions = {
      //ffmpegPath: '/usr/bin/ffmpeg', // Linux default ffmpeg path
      outputPath: dir,
      youtubeVideoQuality: 'highestaudio',
      queueParallelism: 2,
      progressTimeout: 2000,
      allowWebm: false,
    };

    const downloader = new ytmp3(downloadOptions, video.title + '.mp3');
    downloader.download(videoid);
    await downloader.on('finished', async function (err, data) {
      //enviar la cancion
      await callback(data);
      //eliminar el archivo
      await utils.fileDelete(data.file);
      //Retornar 
      return { 'success': true}
    });


  } catch (exception) {
    console.log(exception)

  }

}
async function ytsearch(msg, callback) {
  new Promise(async (resolve, reject) => {
    const scraping = await scrape.search(msg, { type: 'video', limit: 5 });    
    const video = scraping[0]
    try {
      const videourl = `https://www.youtube.com/watch?v=${video.id}`;
      await callback(false, videourl);
    } catch (err) {
      await callback(true, err)
    }
  });
}


module.exports = {  
  youtubeMp32,
  ytsearch
}