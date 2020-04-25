const moviesRouter = require("express").Router();

const MoviesController = require("../controllers/movies");

moviesRouter.get("/", MoviesController.findAll);
moviesRouter.get("/:id", MoviesController.findOne);
moviesRouter.post("/", MoviesController.create);
moviesRouter.put("/:id", MoviesController.updateOne);
moviesRouter.delete("/:id", MoviesController.destroy);

module.exports = moviesRouter