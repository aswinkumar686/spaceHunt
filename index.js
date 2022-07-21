const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors');
const dotenv = require("dotenv");   
const authUser = require("./routes/auth");
const userRouter = require("./routes/user");
const schoolRouter = require("./routes/schools");
const bodyParser = require('body-parser');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection succesfull"))
  .catch((err) => console.log(err));


  app.use(bodyParser.json({limit: '50mb'}));
  app.use(cors());
app.use(express.json())
app.use("/api/auth", authUser);
app.use("/api/users", userRouter);
app.use("/api/schools", schoolRouter);


app.listen(process.env.PORT || 7000, () => {
  console.log("backend running ");
});
