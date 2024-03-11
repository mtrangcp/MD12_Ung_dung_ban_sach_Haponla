const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/MD12_Haponla")
// .catch((err) => {
//   console.log("Loi ket noi CSDL");
//   console.log(err);
// });

const dbConfig = {
  url: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/MD12_Haponla",
  options: {
    // useNewUrlParser: true, useUnifiedTopology: true
  },
};

const connectDb = async () => {
  try {
    await mongoose.connect(dbConfig.url, dbConfig.options);
  } catch (error) {
    console.log(`MongoDB error: ${JSON.stringify(error)}`);
    // process.exit(0);
    process.exit(1);
  }
};

const dbConnection = mongoose.connection;

dbConnection.on("connected", function () {
  console.log(`MongoDB connected: ${this.name}`);
});

dbConnection.on("disconnected", function () {
  console.log(`MongoDB disconnected: ${this.name}`);
});

dbConnection.on("error", function (error) {
  console.log(`MongoDB error: ${JSON.stringify(error)}`);
});

process.on("SIGINT", async function (error) {
  await dbConnection.close();
  process.exit(0);
});

module.exports = { mongoose, connectDb };
