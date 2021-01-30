const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

app.get('/', async (req, res) => { 
   const response = await axios.get( "https://brasil.io/covid19/cities/cases/" )
   res.send(JSON.stringify(response.data))

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})