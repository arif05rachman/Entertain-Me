const { getData } = require("../database")
const tvSeries = getData().collection("tvSeries")
const { ObjectId } = require("mongodb")


class tvSeriesModel {
  static find() {
    return tvSeries.find().toArray()
  }
  static findOne(id) {
    return tvSeries.findOne({_id: ObjectId(id)})
  }
  static insert(newtvSeries) {
    return tvSeries.insertOne(newtvSeries)
  }
  static updateOne(id, updatetvSeries) {
    return tvSeries.updateOne(
      {
        _id: ObjectId(id)
      },
      {
        $set: updatetvSeries
      }
    )
  }
  static deleteOne(id) {
    return tvSeries.deleteOne({_id: ObjectId(id)})
  }
}

module.exports = tvSeriesModel