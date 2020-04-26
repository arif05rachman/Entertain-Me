const { MongoClient } = require("mongodb")
const url = require('./url')
const database = "native-fox-entertainMe";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
var db

const checkDb = (cb) => {
  client.connect((err) => {
    if (err) {
      console.log("failled connect to database", err)
    } else {
      console.log("successfully connect to database" + database)
      db = client.db(database)
    }
    cb(err)
  })
}

function getData(){
  return db
}

module.exports = {
  checkDb, getData
}