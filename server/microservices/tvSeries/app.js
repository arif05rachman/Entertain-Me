const express = require("express")
const app = express()
const PORT = process.env.PORT || 3002
const mongodb = require("./database")
mongodb.checkDb(err => {
  if (!err) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use("/", require("./routes"));
  }
})

app.listen(PORT, () => {
  console.log("server successfully running on PORT: "+PORT);
})