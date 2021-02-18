const express = require('express')
const dib = require('../Conn/sql')
const router = express.Router();

router.get('/', async (req, res) => {
    const sql = `SELECT * FROM cadastros WHERE city LIKE "%${req.query.nome}%" OR id="${req.query.id}"`;
    await dib.db.query(sql, (err, rows) => {
      res.send(JSON.stringify(rows));
    });
  });

module.exports = router