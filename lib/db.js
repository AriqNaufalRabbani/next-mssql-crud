// lib/db.js
const sql = require('mssql')

const config = {
  user: 'Dev',
  password: '123456',
  server: 'localhost',
  database: 'lab',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}

let pool

async function getConnection() {
  if (!pool) {
    pool = await sql.connect(config)
  }
  return pool
}

module.exports = { getConnection }
