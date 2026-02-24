// Connecting database to server

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://host.docker.internal:27017/craftdex");
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;