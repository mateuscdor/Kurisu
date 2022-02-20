const { fetchJson } = require('fetch-json')

const zodiac = async (signo) => {
  return fetchJson.get(`https://kurisu-api.herokuapp.com/api/zodiac?sign=${signo.toLowerCase()}`).then((h) => {
    if (h.title) {
      return `*${h.sign}*\n*${h.title}*\n\n${h.predict}`
    } else {
      var s = '';
      for (var i = 0; i < h.signs.length; i++) {
        s = s + "✔" + h.signs[i] + " ";
      }
      return `*Signos*\n${s}`;
    }
  }).catch(function (err) {
    console.log(err)
    return ('ocurrio un error, el servidor no esta disponible');
  })
  //console.log(signo)

}

const loveCalc = async (n1, n2) => {
  var n2 = !!args[2] ? args[2] : 'kurisu-bot';

  const result = await fetchJson.get(`https://kurisu-api.herokuapp.com/api/lovecalc?n1=${n1}&n2=${n2}`)
}

module.exports = {
  zodiac,
  loveCalc
}
