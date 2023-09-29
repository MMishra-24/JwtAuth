const { prisma } = require("../config/db");

const { authenticateUser, createUser } = require("../auth/auth")


//Post Request for Register

const registerUser =  async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email: email } });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create a new user with a hashed password
    const user = await createUser(email, password);

    // Return the newly created user
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



//Logging in Function

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) {
    res.status(500).json({ error: "email or password is incorrect"})
  }

  try {
    const { user, token } = await authenticateUser(email, password);
    res.json({ email, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
};