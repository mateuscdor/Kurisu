const shorturl = require('short-urls');


const short = async (link) => {
    //link="https://www.hoohle.com"
    //var resource = {"link":"http://youtube.com"};
    const x = await shorturl(link, 'l-o-l');
    console.log(x.short)
    return x.short;
}

const WebShot = async (url, fullpage) => {
    return fullpage ? `https://kurisu-api.herokuapp.com/api/ws?url=${url}&full_page=true` : `https://kurisu-api.herokuapp.com/api/ws?url=${url}`;
}

module.exports = {
    short,
    WebShot
}