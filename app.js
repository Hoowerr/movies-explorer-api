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
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://movies-explorer.hoower.nomoredomains.rocks",
      "http://158.160.3.169:3000",
      "localhost",
      "localhost:3000",
      "http://localhost",
    ],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
    preflightContinue: false,
  })
);

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
