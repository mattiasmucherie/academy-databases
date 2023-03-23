const mysql = require("mysql2/promise");

let connection = null;
const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "academy",
      password: "password",
    });
  }
  return connection;
};

const getMovies = async () => {
  try {
    const dbCon = await getConnection();
    const [movies] = await dbCon.query(`
      SELECT movieId, movieName, plot, ca.category, year
      FROM movies
      JOIN moviecategories AS ca ON ca.categoryId = movies.categoryId
    `);
    return movies;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getMovie = async (movieId) => {
  // Get a specific movie
};

const addMovie = async (body) => {
  const { movieName, plot, categoryId, year } = body;
  const dbCon = await getConnection();
  await dbCon.query(
    `INSERT INTO Movies(movieName, plot, categoryId, year)
  VALUES (?,?,?,?)`,
    [movieName, plot, categoryId, year]
  );
};

const updateMovie = async (body, id) => {
  const dbCon = await getConnection();
  const [movie] = await dbCon.query(
    `SELECT movieName, plot, categoryId, year FROM movies 
    WHERE movieId = ?`,
    [id]
  );
  const updatedMovie = { ...movie[0], ...body };
  await dbCon.query(
    `UPDATE Movies SET movieName = ?, plot = ?, categoryId = ?, year=?
  WHERE movieId = ?`,
    [
      updatedMovie.movieName,
      updatedMovie.plot,
      updatedMovie.categoryId,
      updatedMovie.year,
      id,
    ]
  );
};

const addCategory = async (body) => {
  const dbCon = await getConnection();
  await dbCon.query(
    `INSERT INTO moviecategories(category)
  VALUES (?)`,
    [body.category]
  );
};

const lendMovie = async (body, id) => {
  const dbCon = await getConnection();
  await dbCon.query(
    `INSERT INTO LentMovies(fromLent, toLent, movieId)
  VALUES (?,?,?)`,
    [body.fromLent, body.toLent, id]
  );
};

const returnMovie = async (id) => {
  const dbCon = await getConnection();
  await dbCon.query(`DELETE FROM LentMovies WHERE id = ?`, [id]);
};

const deleteMovie = async (id) => {
  const dbCon = await getConnection();
  await dbCon.query(`DELETE FROM Movies WHERE MovieId = ?`, [id]);
};

const updateCategory = async (body, id) => {
  const dbCon = await getConnection();
  await dbCon.query(
    `UPDATE moviecategories SET category = ? WHERE categoryId = ?`,
    [body.category, id]
  );
};

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  addCategory,
  updateMovie,
  lendMovie,
  returnMovie,
  deleteMovie,
  updateCategory,
};
