// connecting to PostgreSQL


const { Pool } = require("pg");

//const connectionString = process.env.CONNECTION_STRING;
const connectionString =process.env.DB_URL
const pool = new Pool({
  // the line below is equivalent to connectionString: connectionString,
  connectionString,
});
// check the connection 
pool.connect((err, client)=> {
  if (err) {
    console.error("idle client error", err.message, err.stack);
    return
}
console.log("data base is conected")
//  console.error("Pool connected on", client.user);
});

// export the pool to be able to use it to run Queries
module.exports = {
  pool
};
