const mysql = require("mysql2/promise");

mysql
  .createConnection({
    host: "localhost",
    user: "root",
    database: "world",
    password: "password",
  })
  .then((connection) => {
    const continent = "Europe";
    const pop = 5000000;
    connection
      .query(
        `SELECT * FROM Country WHERE Continent = ? AND Population > ? LIMIT 0,5`,
        [continent, pop]
      )
      .then((data) => {
        console.log(
          data[0].map((d) => ({
            name: d.Name,
          }))
        );
      });
  });
