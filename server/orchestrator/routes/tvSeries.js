const tvSeriesRouter = require("express").Router();

const TvSeriesController = require("../controllers/tvSeries");

tvSeriesRouter.get("/", TvSeriesController.findAll);
tvSeriesRouter.get("/:id", TvSeriesController.findOne);
tvSeriesRouter.post("/", TvSeriesController.create);
tvSeriesRouter.put("/:id", TvSeriesController.updateOne);
tvSeriesRouter.delete("/:id", TvSeriesController.destroy);

module.exports = tvSeriesRouter;
