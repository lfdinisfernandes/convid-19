const express = require('express')
const dib = require('./mysql/sql')

var router = express.Router();

router.get('/', async (req, res) => {
  var sql = `SELECT * FROM cadastros WHERE city LIKE "%${req.query.nome}%" OR id="${req.query.id}"`;
  await db.query(sql, (err, rows) => {
    res.send(JSON.stringify(rows));
  });
});
router.post('/post', async (req, resp) => {
  
  const values = `( 
      "${req.body.city}",
      "${req.body.city_ibge_code}",
      "${req.body.city_str}",
      "${req.body.confirmed}",
      "${req.body.confirmed_per_100k_inhabitants}",
      "${req.body.date}",
      "${req.body.date_str}",
      "${req.body.deaths}",
      "${req.body.deaths_per_100k_inhabitants}",
      "${req.body.death_rate_percent}",
      "${req.body.estimated_population}",
      "${req.body.state}"
      )`;
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
    VALUE ${values}`;
  await dib.db.query(sql, () => {
    resp.send('Dados adicionados');
  });
});
router.put('/put', async (req, resp) => {
  
  const sql = `
    UPDATE cadastros
    SET 
    city = "${req.body.city}",
    city_ibge_code = "${req.body.city_ibge_code}",
    city_str = "${req.body.city_str}",
    confirmed = "${req.body.confirmed}",
    confirmed_per_100k_inhabitants = "${req.body.confirmed_per_100k_inhabitants}",
    date = "${req.body.date}",
    date_str = "${req.body.date_str}",
    deaths = "${req.body.deaths}",
    deaths_per_100k_inhabitants = "${req.body.deaths_per_100k_inhabitants}",
    death_rate_percent = "${req.body.death_rate_percent}",
    estimated_population = "${req.body.estimated_population}"
    WHERE id = "${req.body.id}"`;

  await dib.db.query(sql, () => {
    resp.send('Dados alterados');
  });
});
router.delete('/', function (req, resp) {
  const sql = `DELETE FROM cadastros WHERE id = ${req.query.id}`;

  
    dib.db.query(sql, () => {
      resp.send('dados deletado');
    }); 
  
});


module.exports = router