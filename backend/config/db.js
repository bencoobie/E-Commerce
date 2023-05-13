const mongoose = require("mongoose");
const connectionString = process.env.MONGO_URI;
mongoose.set("debug", true);

const mongoDBConnection = async () => {
  mongoose
    .connect(connectionString, {
      dbName: "E-ticaret",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connection Established."))
    .catch(console.log);
};
module.exports = { mongoDBConnection };
