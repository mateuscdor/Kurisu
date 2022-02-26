const { fetchJson } = require('fetch-json');
const { imageDownloadAndResize, fileDelete } = require('../utils')
const { rollDice } = require('../data/stickers/rollDice')
const answers = require('../data/answers8Ball.json')
const fs = require('fs')

const meme = async () => {
  const meme = await fetchJson.get("https://leon564-api.herokuapp.com/meme");

  return meme.url;
}

async function phrase() {
  try {
    const phrase = await fetchJson.get("https://leon564-api.herokuapp.com/frase", "url");

    return phrase.frase;
  } catch (err) {
    return "Ocurrio un error";
  }
}

const hub = async (p1, p2, callback) => {
  try {
    const logohub = await imageDownloadAndResize(`https://logohub.appspot.com/${p1}-${p2}.png`)
    await callback(logohub, false)
    fs.unlinkSync(logohub);
    return true;
  } catch (err) {
    callback(false, true);
    return false;
  }
}

const ball = async (question) => {

  if (question && question.split(' ').length > 0) {
    const res = answers[Math.floor(Math.random() * answers.length)];
    return "Respuesta: " + res;
  }
  else {
    return "Realice una pregunta ";
  }
}

const roll = async () => {
  return await rollDice();
}

const SearchAnime = async (query) => {
  var anime = await fetchJson.get(`https://kurisu-api.herokuapp.com/api/anime/search?name=${query}`);
  var puntuacion = "";
  for (var i = 0; i < parseInt(parseInt(anime.score) / 2); i++) {
    puntuacion += "⭐"
  }
  if (anime.error) return { text: 'No se encontraron resultados' }
  return { image: { url: anime.portada }, caption: "\n*🗡️Titulo🗡️:* " + anime.titulo + "\n\n*🕘Año de estreno🕘:* " + anime.ano + "\n\n*⚔Generos⚔:* " + anime.genero.join('✔ ') + "✔\n\n*💠Episodios💠:* " + anime.episodes + '\n*puntuacion:*' + puntuacion + "\n\n*Estado:* " + anime.estado + "✅  *Tipo:* " + anime.tipo + "✅\n\n*Puedes verlo en:* " + anime.enlace + "\n\n*Sinopsis:* " + anime.sinopsis }
}
const RandomAnime = async () => {
  var anime = await fetchJson.get(`https://kurisu-api.herokuapp.com/api/anime`);
  var puntuacion = "";
  for (var i = 0; i < parseInt(parseInt(anime.score) / 2); i++) {
    puntuacion += "⭐"
  }
  if (anime.error) return { text: 'Ocurrio un error inesperado' }
  return { image: { url: anime.portada }, caption: "\n*🗡️Titulo🗡️:* " + anime.titulo + "\n\n*🕘Año de estreno🕘:* " + anime.ano + "\n\n*⚔Generos⚔:* " + anime.genero.join('✔ ') + "✔\n\n*💠Episodios💠:* " + anime.episodes + '\n*puntuacion:*' + puntuacion + "\n\n*Estado:* " + anime.estado + "✅  *Tipo:* " + anime.tipo + "✅\n\n*Puedes verlo en:* " + anime.enlace + "\n\n*Sinopsis:* " + anime.sinopsis }

}

module.exports = {
  meme,
  phrase,
  hub,
  ball,
  roll,
  SearchAnime,
  RandomAnime
}