import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: [String],
    required: true,
  },
  day: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  }
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
