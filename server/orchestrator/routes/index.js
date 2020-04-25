const indexRouter = require("express").Router()

const { MainController } = require('../controllers')

const moviesRouter = require("./movies");
const tvSeriesRouter = require("./tvSeries");

indexRouter.get("/entertainme", MainController.getAll);
indexRouter.use("/movies", moviesRouter);
indexRouter.use("/tvSeries", tvSeriesRouter);

module.exports = indexRouter;