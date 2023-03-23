const routes = require("express").Router();
const database = require("./database");

routes.get("/movies", async (req, res) => {
  const countries = await database.getMovies();
  res.send(countries);
});
routes.get("/movie/:id", async (req, res) => {});

routes.post("/movies", async (req, res) => {
  try {
    await database.addMovie(req.body);
    res.send("Movie added in DB");
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't add movie to DB");
  }
});

routes.put("/movie/:id", async (req, res) => {
  try {
    await database.updateMovie(req.body, req.params.id);
    res.send("Updated the movie for ya");
  } catch (err) {
    console.error(err);
    res.status(500).send("nok");
  }
});

routes.post("/lend/:id", async (req, res) => {
  try {
    await database.lendMovie(req.body, req.params.id);
    res.send("OK");
  } catch (err) {
    console.log(err);
    res.status(500).send("NOK");
  }
});

routes.delete("/lend/:id", async (req, res) => {
  try {
    await database.returnMovie(req.params.id);
    res.send("OK");
  } catch (err) {
    console.log(err);
    res.status(500).send("NOK");
  }
});

routes.delete("/movie/:id", async (req, res) => {
  try {
    await database.deleteMovie(req.params.id);
    res.send("OK");
  } catch (err) {
    console.log(err);
    res.status(500).send("NOK");
  }
});
routes.post("/category", async (req, res) => {
  try {
    await database.addCategory(req.body);
    res.send("OK");
  } catch (err) {
    console.log(err);
    res.status(500).send("NOK");
  }
});
routes.put("/category/:id", async (req, res) => {
  try {
    await database.updateCategory(req.body, req.params.id);
    res.send("OK");
  } catch (err) {
    console.log(err);
    res.status(500).send("NOK");
  }
});

module.exports = routes;
