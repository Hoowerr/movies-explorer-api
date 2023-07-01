require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const limiter = require("./utils/limiter");
const config = require("./utils/config");

const allowedCors = [
  "http://localhost:3000",
  "https://movies-explorer.hoower.nomoredomains.rocks",
  "http://158.160.3.169:3000",
  "localhost",
  "localhost:3000",
  "http://localhost",
];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(config.MONGODB_PATH, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("БД подключена");
  })
  .catch(() => {
    console.log("Не удалось подключиться к БД");
  });

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];
  res.header("Access-Control-Allow-Credentials", true);
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    res.end();
  }
  next();
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use("/", router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
