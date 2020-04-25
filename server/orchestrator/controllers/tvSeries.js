const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios").default;

const tvSeriesApi = axios.create({ baseURL: "http://localhost:3002" });

class tvSeriesController {
  static async create(req, res, next) {
    try {
      const tvSeries = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags,
      };
      const { data } = await tvSeriesApi.post("/tvSeries", tvSeries);
      await redis.del("tvSeries");
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const tvSeries = await redis.get("tvSeries");
      const parsedtvSeries = JSON.parse(tvSeries);
      if (!parsedtvSeries || !parsedtvSeries.length) {
        console.log(!tvSeries, !parsedtvSeries, "masuk ==========================");
        const { data } = await tvSeriesApi.get("/tvSeries");
        await redis.set("tvSeries", JSON.stringify(data));
        res.status(200).json({ tvSeries: data });
      } else {
        res.status(200).json({ tvSeries: parsedtvSeries });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const tvSeries = await redis.get("tvSeries");
      const parsedtvSeries = JSON.parse(tvSeries);
      if (!parsedtvSeries || !parsedtvSeries.length) {
        const { data } = await tvSeriesApi.get("/tvSeries/" + id);
        if (!data) {
          res.status(200).json({ message: "no data" });
        }
        res.status(200).json(data);
      } else {
        const selectTvSeries = parsedtvSeries.filter((tvSeries) => tvSeries._id === id);
        if (!selectTvSeries.length) {
          const { data } = await tvSeriesApi.get("/tvSeries/" + id);
          res.status(400).json({ message: "tvSeries not found" });
        } else {
          console.log("data dari redis");
          res.status(200).json(selectTvSeries[0]);
        }
      }
    } catch (err) {
      console.log("error");
      res.status(500).json(err);
    }
  }
  static async updateOne(req, res, next) {
    try {
      const { id } = req.params;
      const tvSeries = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags,
      };
      const { data } = await tvSeriesApi.put(`/tvSeries/${id}`, tvSeries);
      redis.del("tvSeries");
      console.log("masuk api");
      if (!data.modifiedCount) {
        res.status(400).json({ message: "tvSeries not found" });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await tvSeriesApi.delete(`/tvSeries/${id}`);
      redis.del("tvSeries");
      if (!data.deletedCount) {
        res.status(400).json({ message: "tvSeries not found" });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = tvSeriesController;
