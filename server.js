const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();

app.use(express.json());  
app.use(cors());
const bodyParser = require('body-parser');

// Parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//InstaMojo Route
const instamojo = require('./routes/instamojo/instamojo');
app.use("/api", instamojo);

// Starting Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
