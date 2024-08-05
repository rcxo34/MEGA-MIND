import mongoose from 'mongoose';

const daySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timeCompleted: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  days: {
    type: Number,
    required: true,
    default: 0,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  completedDays: [daySchema] 
});

const User = mongoose.model('User', userSchema);

export default User;
