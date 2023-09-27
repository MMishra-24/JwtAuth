const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {prisma} = require("../config/db")
const JWT_SECRET = 'eei37238r27dfesdk2';

// Function to generate a JWT token
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email
    // Add any additional user data you want to include in the token
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

// Function to authenticate a user and generate a JWT token
async function authenticateUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid password');
  }

  const token = generateToken(user);

  return { user, token };
}

// Function to hash a password
async function hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
  
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return reject(err);
          resolve(hash);
        });
      });
    });
  }

async function createUser(email, password) {
    const hashedPassword = await hashPassword(password);
  
    return prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        // ... other user fields
      },
    });
  }

  const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader;

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
  
  module.exports = {
    authenticateUser,
    createUser,
    authenticateJWT,
  };
