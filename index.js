const express = require('express');
const { connectDB } = require("./connection");
require('dotenv').config();

const app = express();
const urlRouter = require('./routes/url');

const PORT = process.env.PORT || 3000;
const dbName = process.env.DATABASE_NAME;
const mongoUrl = process.env.MONGODB_URL;


// connection
connectDB(mongoUrl, dbName);

app.use(express.json());

// Router
app.use("/", urlRouter);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));