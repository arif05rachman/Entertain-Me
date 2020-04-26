const redis = require("async-redis");
const client = redis.createClient({
  port: 17943, // replace with your port
  host: "redis-17943.c1.ap-southeast-1-1.ec2.cloud.redislabs.com", // replace with your hostanme or IP address
  password: "MuCetJZM0yJ5x4lGjTl2zYx26waq82zV", // replace with your password
});

module.exports = client