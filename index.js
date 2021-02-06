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
  await db.query( sql, ( err, rows ) => {
    console.log(rows);
    res.send(JSON.stringify(rows));
  
  } );
})
app.get('/covid/busca', async (req, res) => {
  var sql = `SELECT * FROM cadastros WHERE city LIKE "%${req.query.cidade}%"`;
  await db.query( sql, ( err, rows ) => {
  console.log(sql)
  res.send(JSON.stringify(rows));
  

  } );
})




app.get('/preenche-banco', async (req, res) => {
//   const conn = await connection(db).catch(e => {}) 
   //const response = await axios.get( "https://brasil.io/covid19/cities/cases/" )
   
    const response = await axios.get( "https://run.mocky.io/v3/588727db-3fa7-4b45-9805-27676a34b00d" ) // 10 cidades
  // const response = await axios.get( "  https://run.mocky.io/v3/95fe330b-5409-490b-ac01-35a70f26120a" )

   
 
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
      
      } );
      
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


