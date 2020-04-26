const redis = require("async-redis");
const client = redis.createClient({
  port: "", // replace with your port
  host: "", // replace with your hostanme or IP address
  password: "", // replace with your password
});

module.exports = client