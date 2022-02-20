const fileDelete = require('./fileDelete');

const { writeFile } = require('fs/promises');

const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffprobe = require("@ffprobe-installer/ffprobe");
const fs = require('fs');
const path = require('path');

const ffmpeg = require("fluent-ffmpeg");//()
//.setFfprobePath(ffprobe.path)
//.setFfmpegPath(ffmpegInstaller.path);



const compress = async (video, options) => {
    const proc = new ffmpeg();
    return new Promise(async (resolve, reject) => {
        var _video = video;
        patht = false;
        const pathh = path.join(__dirname,'..', '/temp/' + Date.now() + '.mp4');
        if (!video.includes('.mp4')) {
            _video = path.join(__dirname,'..', '/temp/t' + Date.now() + '.mp4');
            patht = _video;
            await writeFile(_video, video)

        }
        //let resolution = "-s 360*480";
        let resolution = "-s 120*360";
        if (options) {
            if (options.resolution) {
                resolution = options.resolution
            }
        }

        proc
            .input(_video)
            .noAudio()
            .outputOption([resolution])
            .output(pathh)
            .setDuration('00:00:10')
            .on("end", async () => {
                const buffer = fs.readFileSync(pathh)
                await fileDelete(pathh)
                if (patht) await fileDelete(patht)
                return resolve(buffer)
            })
            .on("error", (e) => { console.log(e); reject('error') })
            .run();
    });
}

module.exports = compress;