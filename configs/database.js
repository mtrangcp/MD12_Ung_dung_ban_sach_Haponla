const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/MD12_Haponla")
.catch((err) => {
  console.log("Loi ket noi CSDL");
  console.log(err);
});

const MongoDbConnection = mongoose.connection
MongoDbConnection.on("connected", function () {
  console.log(`MongoDB ${this.name} connected.`);
});

MongoDbConnection.on("disconnected", function () {
  console.log(`MongoDB ${this.name} disconnected.`);
});

MongoDbConnection.on("error", function (error) {
  console.log(`MongoDB error: ${JSON.stringify(error)}.`);
});

process.on("SIGINT", async function (error) {
  await MongoDbConnection.close();
  process.exit(0);
});

module.exports = { mongoose, MongoDbConnection };
