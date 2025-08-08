const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  return await mongoose.connect(url).then(() => {
    console.log(" MongoDB connected ");
  });
  ss;
}

module.exports = {
  connectToMongoDB,
};
