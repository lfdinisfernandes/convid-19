const express = require('express');
const router = express.Router();
const axios = require('axios');
const dib = require('./mysql/sql');
//conn

dib.db.connect();

router.get('/', async (req, res) => {
  //const response = await axios.get('https://brasil.io/covid19/cities/cases/');
  const response = await axios.get( "https://run.mocky.io/v3/588727db-3fa7-4b45-9805-27676a34b00d" ) // 10 cidades
  const cities =  response.data;
  let values = '';

  Object.entries(response.data.cities).forEach(([key]) => {
    values += `( 
      "${response.data.cities[key].city}",
      "${response.data.cities[key].city_ibge_code}",
      "${response.data.cities[key].city_str}",
      "${response.data.cities[key].confirmed}",
      "${response.data.cities[key].confirmed_per_100k_inhabitants}",
      "${response.data.cities[key].date}",
      "${response.data.cities[key].date_str}",
      "${response.data.cities[key].deaths}",
      "${response.data.cities[key].deaths_per_100k_inhabitants}",
      "${response.data.cities[key].death_rate_percent}",
      "${response.data.cities[key].estimated_population}",
      "${response.data.cities[key].state}"
    ),`;
  });

  const sql = `INSERT INTO cadastros
    (city,
    city_ibge_code,
    city_str,
    confirmed,
    confirmed_per_100k_inhabitants,
    date,
    date_str,
    deaths,
    deaths_per_100k_inhabitants,
    death_rate_percent,
    estimated_population,
    state )
    VALUE ${values.slice(0, -1)}
  `;
  
  try {
    await dib.db.query(sql);
    console.log("sucesso");
    res.send('Dados inseridos');
  } catch (banana) {
    console.log(banana);
    res.send('erro ao inserir dados');
  } 
});

module.exports = router