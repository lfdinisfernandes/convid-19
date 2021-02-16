const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./src'));

app.listen(3000, console.log('Express Started on Port 3000'));