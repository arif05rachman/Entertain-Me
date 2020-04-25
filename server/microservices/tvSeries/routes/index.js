const router = require("express").Router()
const tvSeriesController = require("../controllers/tvSeries")

router.get("/tvSeries", tvSeriesController.find);
router.get("/tvSeries/:id", tvSeriesController.findOne);
router.post("/tvSeries", tvSeriesController.insert);
router.put("/tvSeries/:id", tvSeriesController.update);
router.delete("/tvSeries/:id", tvSeriesController.delete);

module.exports = router