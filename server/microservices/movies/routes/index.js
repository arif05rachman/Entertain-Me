const router = require("express").Router()
const MoviesController = require("../controllers/movies")

router.get("/", (req, res, next) => {
  res.status(200).json({message: "server movies running"})
});
router.get("/movies", MoviesController.find);
router.get("/movies/:id", MoviesController.findOne);
router.post("/movies", MoviesController.insert);
router.put("/movies/:id", MoviesController.update);
router.delete("/movies/:id", MoviesController.delete);

module.exports = router