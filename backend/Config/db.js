import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
      await mongoose.connect(uri);
      console.log('Successfully connected to MongoDB Atlas');
    } catch (err) {
      console.error('Failed to connect to MongoDB Atlas', err);
      throw err;
    }
  };
  
  export { connectDB };