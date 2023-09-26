const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ message: 'Logout successful' });
      });
  };

  module.exports = { logoutUser };