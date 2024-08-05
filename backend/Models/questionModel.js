import mongoose from 'mongoose';

// Custom validator function to limit array length
const validateMaxSolutions = (value) => {
  return value.length <= 4;
};

const questionSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [{
      type: String,
      trim: true,
    }],
    required: true,
    validate: [validateMaxSolutions, '{PATH} exceeds the limit of 4'],
  },
  solution:{
    type:Number,
    required: true,
    min: 0,
    max: 3,
  },
  explanation: {
    type: [String],
    required: true,
  }
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
