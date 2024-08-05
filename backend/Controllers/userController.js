import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = '013cb08d82109c4e25b37de7e2f4682e088c08d6aa5eb8d165a05d2776b2e9c875647323bacdc7a2971fc6dff56bd28bab8394f31008a15917fac890175e3b771f41ef568b7976081d7dc1d820fbd0e5f9f4ea6138e4383d14c6150c65f3d759e0a1d8f63cdb186c343670276330a29714b5fb5ed66a2f07aded096473b9f2988b544ab18749c4d1becc6b71fb4f55e3ce9cc1f6fe7135a2de81c44c48ff77152b3e942995d300f7ea7aaf9ac68cedc1649de9f6efeb69f88830963691b3224e272b5d7a007de51885bad94270ce537dc94605cf9ff0d82aa190e3fde46b4040f7a81dfd6f9f8914f753e735967592a580da31518bda1920414574fc516ae190';

// @desc    Create a new user
// @route   POST /users/create
const createUser = async (req, res) => {
  try {
    const { name, role, email, password, dob, } = req.body;
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
console.log(dob)
    // Create a new user instance
    const newUser = new User({
      name,
      role,
      email,
      password: hashedPassword,
      dob: new Date(dob), // Assuming DOB is passed as a string in ISO format
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

// @desc    login user
// @route   POST users/login
const loginUser = async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid email or password');
    }
    // res.status(200).send('Login successful');
    const token = jwt.sign({ id: user._id, role: user.role, name:user.name }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  }catch (error) {
  console.error('Error creating user:', error);
  res.status(500).json({ message: 'Failed to create user' });
  }
}

// @desc    Retrieve all users
// @route   GET  /users
const allUsers = async(req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
}

// @desc    Retrieve user by id
// @route   GET /users/id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};

// @desc    Update user by id
// @route   PUT users/id

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Failed to update password' });
  }
};

// @desc    Delete user 
// @route   DELETE users/id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID and delete them
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// @desc    retrieve user score by id 
// @route   GET users/:userId/score
const getUserScore = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ score: user.score });
  } catch (error) {
    console.error('Error retrieving user score:', error);
    res.status(500).json({ message: 'Failed to retrieve user score' });
  }
};

// @desc    update user score by id 
// @route   PUT users/:userId/score
const updateUserScore = async (req, res) => {
  try {
    const { userId } = req.params;
    const { score } = req.body;

    // Find the user by ID and update the score
    let user = await User.findByIdAndUpdate(userId, { score }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User score updated successfully', score: user.score });
  } catch (error) {
    console.error('Error updating user score:', error);
    res.status(500).json({ message: 'Failed to update user score' });
  }
};

// @desc    retrieve user day by id 
// @route   GET users/:userId/day
const getUserDay = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ day: user.days });
  } catch (error) {
    console.error('Error retrieving user day:', error);
    res.status(500).json({ message: 'Failed to retrieve user day' });
  }
};

// @desc    update user day by id 
// @route   PUT users/:userId/day
const updateUserDay = async (req, res) => {
  try {
    const { userId } = req.params;
    // const { day } = req.body;

    // Find the user by ID and update the day
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      throw new Error('User not found');
    }
    let updatedDays = currentUser.days + 1;
    let user = await User.findByIdAndUpdate(userId, { days: updatedDays }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User day updated successfully', day: user.day });
  } catch (error) {
    console.error('Error updating user day:', error);
    res.status(500).json({ message: 'Failed to update user day' });
  }
};

// @desc    Update Score (add score to existing score)
// @route   POST /:userId/addScore
const addScore = async (req,res) => {
  const { userId } = req.params;
  const { scoreToAdd } = req.body;
 console.log(scoreToAdd)
 console.log(userId)
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.score += scoreToAdd;
    await user.save();
    res.status(200).send('Score updated');
  } catch (error) {
    res.status(500).send('Error updating score');
  }
}

// @desc    update Day Completion Status with score and timestamp
// @route   POST users/:userId/dayCompleted

const dayCompleted =  async (req, res) => {
  const { userId } = req.params;
  const { dayNumber, score } = req.body;
  console.log("day:"+dayNumber)
  console.log(score)
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Add the task number to the taskCompletionStatus array
    user.completedDays.push({
      day: dayNumber,
      score,
      timeCompleted: new Date()
    });
    await user.save();

    res.status(200).send('Day completed list updated successfully');
  } catch (error) {
    res.status(500).send('Error updating the completed list');
  }
}

// @desc    Retrieve the taskCompletionStatus array by id
// @route   /users/:userId/completedDaysList
const completedDaysList = async(req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user.completedDays)
    res.status(200).json({ totalDays: user.completedDays });
  } catch (error) {
    console.error('Error retrieving user day:', error);
    res.status(500).json({ message: 'Failed to retrieve user day' });
  }
}




export { createUser, loginUser, allUsers, getUserById, updatePassword, deleteUser, getUserScore, updateUserScore, getUserDay, updateUserDay, dayCompleted, addScore, completedDaysList };