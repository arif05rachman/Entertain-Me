const tvSeries = require("../models/tvSeries")

class tvSeriesController {
  static find(req, res, next) {
    tvSeries.find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: "internal server error" });
      });
  }
  static findOne(req, res, next) {
    const { id } = req.params;
    tvSeries.findOne(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: "internal server error" });
      });
  }
  static insert(req, res, next) {
    const newtvSeries = req.body;
    tvSeries.insert(newtvSeries)
      .then((result) => {
        res.status(201).json(result.ops[0]);
      })
      .catch((err) => {
        res.status(500).json({ message: "internal server error" });
      });
  }
  static update(req, res, next) {
    const { id } = req.params;
    const updatedtvSeries = req.body;
    tvSeries.updateOne(id, updatedtvSeries)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: "internal server error" });
      });
  }
  static delete(req, res, next) {
    const { id } = req.params;
    tvSeries.deleteOne(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: "internal server error" });
      });
  }
}

module.exports = tvSeriesController