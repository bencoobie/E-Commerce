require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/db");
const { RedisStore, redisClient } = require("./config/redis");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const session = require("express-session");
//const rabbitMQ = require("./config/amqplib");

db.mongoDBConnection();
redisClient;
app.use(
  session({
    name: "sessionID",
    store: new RedisStore({
      client: redisClient,
    }),
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(express.json());
app.use("/user", userRoute);
app.use("/product", productRoute);

app.get("/", (req, res) => {
  res.send("Hoşgeldin");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
