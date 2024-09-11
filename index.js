const express = require('express');
const { connectDB } = require("./connection");
const cookieParser = require('cookie-parser');
const path = require('path');
const { restrictTo, checkAuth } = require('./middlewares/auth');
require('dotenv').config();

const app = express();
const urlRouter = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRouter =  require('./routes/user');

const PORT = process.env.PORT || 3000;
const dbName = process.env.DATABASE_NAME;
const mongoUrl = process.env.MONGODB_URL;


// connection
connectDB(mongoUrl, dbName);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkAuth)

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


// Router
app.use("/url", restrictTo("USER", "ADMIN"), urlRouter);
app.use("/", staticRouter);
app.use("/user", userRouter);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));