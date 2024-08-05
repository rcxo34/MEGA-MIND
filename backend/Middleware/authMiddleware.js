import jwt from 'jsonwebtoken';
const JWT_SECRET = '013cb08d82109c4e25b37de7e2f4682e088c08d6aa5eb8d165a05d2776b2e9c875647323bacdc7a2971fc6dff56bd28bab8394f31008a15917fac890175e3b771f41ef568b7976081d7dc1d820fbd0e5f9f4ea6138e4383d14c6150c65f3d759e0a1d8f63cdb186c343670276330a29714b5fb5ed66a2f07aded096473b9f2988b544ab18749c4d1becc6b71fb4f55e3ce9cc1f6fe7135a2de81c44c48ff77152b3e942995d300f7ea7aaf9ac68cedc1649de9f6efeb69f88830963691b3224e272b5d7a007de51885bad94270ce537dc94605cf9ff0d82aa190e3fde46b4040f7a81dfd6f9f8914f753e735967592a580da31518bda1920414574fc516ae190';

// Middleware to verify token and extract user role
const authenticateToken = (req, res, next) => {
    //  const token = req.headers['authorization']; //Comment this line for using from browser
    // if (!token) return res.sendStatus(401);
    const authHeader = req.headers['authorization'];
    // console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]; //Comment this line for using thunder client
    console.log(token)
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Middleware to check for specific roles
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).json({message:"Not authorized"});
        next();
    };
};

export { authenticateToken, authorizeRole };
