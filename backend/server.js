import express from 'express';
import { connectDB } from './Config/db.js';
import userRoutes from './Routes/userRoutes.js'
import articleRoutes from './Routes/articleRoutes.js'
import questionRoutes from './Routes/questionRoutes.js'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Connect to MongoDB Atlas
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB Atlas', err);
  process.exit(1);
});

// Middleware to parse JSON bodies
app.use(cors())
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/questions', questionRoutes);
