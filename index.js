const express = require('express')
const axios = require('axios')
const app = express()
const mysql = require('mysql')
const port = 3000

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'covid-19'

  
})

db.connect()

app.get('/covid/cidades', async (req, res) => {
  var sql = `SELECT * FROM cadastros`; 
  db.query( sql, ( err, rows ) => {
    console.log(rows);
    res.send(JSON.stringify(rows));

  } );
 //console.log(response)
// res.send(JSON.stringify(response));
});

app.get('/preenche-banco', async (req, res) => {
//   const conn = await connection(db).catch(e => {}) 
   const response = await axios.get( "https://brasil.io/covid19/cities/cases/" )
     var sql = `INSERT INTO cadastros 
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
      state) VALUES
     ("${response.data.cities['1100015'].city}",
      "${response.data.cities['1100015'].city_ibge_code}",
      "${response.data.cities['1100015'].city_str}",
      "${response.data.cities['1100015'].confirmed}",
      "${response.data.cities['1100015'].confirmed_per_100k_inhabitants}",
      "${response.data.cities['1100015'].date}",
      "${response.data.cities['1100015'].date_str}",
      "${response.data.cities['1100015'].deaths}",
      "${response.data.cities['1100015'].deaths_per_100k_inhabitants}",
      "${response.data.cities['1100015'].death_rate_percent}",
      "${response.data.cities['1100015'].estimated_population}",
      "${response.data.cities['1100015'].state}"
      )`;
    await db.query(sql);
   // res.json(response);

   // const rows = await db.query( 'SELECT * FROM cadastro' );
   
  res.send("dados inseridos")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

