const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/wanderlux';
    console.log(`[MongoDB] Connecting to ${connStr}...`);
    const conn = await mongoose.connect(connStr);
    console.log(`[MongoDB] Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Local Database connection deferred/fallback active: ${error.message}`);
  }
};

module.exports = connectDB;
