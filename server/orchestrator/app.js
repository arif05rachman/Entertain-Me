const { ApolloServer, gql } = require("apollo-server")

// const express = require("express")
// const app = express()
// const cors = require("cors")
// const PORT = process.env.PORT || 3000
// const router = require("./routes")

// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))


// app.use('/', router)

// app.listen(PORT, () => {
//   console.log("server successfully running in PORT: "+PORT)
// })

const mergedSchemas = require("./schemas");

const server = new ApolloServer({
  schema : mergedSchemas
})

server
  .listen()
  .then(({url})=> console.log(`entertainme server allready running on ${url}`))