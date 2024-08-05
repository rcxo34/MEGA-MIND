import Article from '../Models/articleModel.js';

// @desc    Create a new Article
// @route   POST /articles/create
const createArticle = async (req, res) => {
    try {
      const { title, content, day } = req.body;
  
      // Validate the day field
      if (day < 1 || day > 30) {
        return res.status(400).json({ message: 'Day must be between 1 and 30' });
      }
  
      const newArticle = new Article({
        title,
        content,
        day,
      });
      await newArticle.save();
  
      res.status(201).json({ message: 'Article created successfully', article: newArticle });
    } catch (error) {
      console.error('Error creating article:', error);
      res.status(500).json({ message: 'Failed to create article' });
    }
  };

// @desc    Retrieve all articles
// @route   GET /articles
const getAllArticles = async (req, res) => {
    try {
      const articles = await Article.find();
      res.status(200).json(articles);
    } catch (error) {
      console.error('Error retrieving articles:', error);
      res.status(500).json({ message: 'Failed to retrieve articles' });
    }
  };

// @desc    Retrieve articles by ID
// @route   GET /articles/:id
const getArticleById = async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findById(id);
  
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      res.status(200).json(article);
    } catch (error) {
      console.error('Error retrieving article:', error);
      res.status(500).json({ message: 'Failed to retrieve article' });
    }
  };

// @desc    Retrieve articles by Day
// @route   GET /articles/day/:day
const getArticleByDay = async (req, res) => {
  try {
    const { day } = req.params;
    const article = await Article.find({day: day});

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error('Error retrieving article:', error);
    res.status(500).json({ message: 'Failed to retrieve article' });
  }
};

// @desc    Update articles
// @route   PUT articles/:id
const updateArticle = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, day } = req.body;
  
      // Validate the day field
      if (day && (day < 1 || day > 30)) {
        return res.status(400).json({ message: 'Day must be between 1 and 30' });
      }
  
      // Find the article by ID
      let article = await Article.findById(id);
  
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      // Update the article fields
      article.title = title;
      article.content = content;
      article.day = day;
  
      // Save the updated article
      await article.save();
  
      res.status(200).json({ message: 'Article updated successfully', article });
    } catch (error) {
      console.error('Error updating article:', error);
      res.status(500).json({ message: 'Failed to update article' });
    }
  };

// @desc    Delete an article
// @route   DELETE articles/:id
const deleteArticle = async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findByIdAndDelete(id);
  
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
      console.error('Error deleting article:', error);
      res.status(500).json({ message: 'Failed to delete article' });
    }
  };

export {createArticle, getAllArticles, getArticleById,getArticleByDay, updateArticle ,deleteArticle}