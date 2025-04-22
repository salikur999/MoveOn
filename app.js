const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectioTodb = require("./db/db");
const captainRoutes = require("./routes/captain.routes");
const userRoutes = require("./routes/user.routes");
const mapsRouter = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes')

dotenv.config();

const app = express();

connectioTodb();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json()); 

// Routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use('/maps', mapsRouter);
app.use('/rides', rideRoutes);

module.exports = app;
