// require mongoose
const mongoose = require('mongoose');

require('dotenv').config({path: './config/.env'});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify : false
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.log(error);
  }
};
mongoose.set("useCreateIndex", true);

module.exports = connectDB;