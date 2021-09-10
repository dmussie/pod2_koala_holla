const pg = require('pg');

//for //for mac users with homebrew and postico
const config = {
    database: 'koalas', 
    host: 'localhost', 
    port: 5432, 
    max: 10, 
    idleTimeoutMillis: 30000 
  };

//for windows users with pgAdmin4
// const config = {
//   user: 'postgres', // Add db user
//   host: 'localhost',
//   database: 'koalas', // Add db name
//   password: '1211', // Add db password
//   port: 5432,
//   max: 10,
//   idleTimeoutMillis: 30000
// };

  const pool = new pg.Pool(config);

  pool.on("connect", () => {
    console.log("connected to postgres");
  });
  
  pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
  });
  
  module.exports = pool;