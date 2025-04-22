const mongoose = require("mongoose");

function connectioTodb() {
  mongoose
    .connect(process.env.DB_CONNECT, {
      dbName: "moveon", // Optional: explicitly specify DB name
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ DB connection error:", err));
}

module.exports = connectioTodb;
