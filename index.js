const express = require('express')
const axios = require('axios')
const app = express()
const mysql = require('mysql')
const port = 3000
app.use(express.json())
app.use(express.urlencoded({extended: true}))

  var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'covid-19'

  
})

db.connect()

  app.get('/buscar/dados', async (req, res) => {
  var sql = `SELECT * FROM cadastros`; 
  await db.query( sql, ( err, rows ) => {
    console.log(rows);
    res.send(JSON.stringify(rows));
  
  });
})
app.get('/covid/cidade', async (req, res) => {
  var sql = `SELECT * FROM cadastros WHERE city LIKE "%${req.query.nome}%" OR id="${req.query.id}"`;
  await db.query( sql, ( err, rows ) => {
   res.send(JSON.stringify(rows));
  });
})

  app.get('/preenche-dados', async (req, res) => {
    const response = await axios.get( "https://brasil.io/covid19/cities/cases/" )     
   let values= ""
   Object.entries(response.data.cities).forEach(([key, val]) => {
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
     ),`
   })
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
      state )
      VALUE ${values.slice(0, -1)}`
   
      db.query( sql, ( err, rows ) => {
        
        res.send("dados inseridos")
      
      });
})

  app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

  app.delete('/covid/cidade/:id', function(req, resp)  {
  var sql = `DELETE FROM cadastros WHERE id = "${req.params.id}"`;
  db.query( sql, ( err, rows ) => {
    console.log(rows);
    resp.send("dados deletado");

} );
})

  app.post('/covid/cidade/', async (req, resp) => {
    const values = 
    `( 
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
      )`
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
    state )
    VALUE ${values}`
    
      await db.query( sql, ( err, rows ) => {
        console.log(err)
        resp.send("Dados adicionados");
    } );
});

app.put('/covid/cidade/:id', async (req, resp) => {
  var sql = `
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
  WHERE id = "${req.params.id}"`
  console.log(sql)
    await db.query( sql, ( err, rows ) => {
      //console.log(err)
      resp.send("Dados alterados");
  } );
});
