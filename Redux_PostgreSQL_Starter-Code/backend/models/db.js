const { Pool } = require("pg");
const connectionString = process.env.DB_URL;
const pool = new Pool({
  connectionString,
});

module.exports = pool;

// this function will create new Table in the database
const createTable = () => {
  pool
    .query(``)
    .then((result) => {
      console.log("result", result);
    })
    .catch((err) => {
      console.log(err);
    });
};
// createTable()
