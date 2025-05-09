const User = require('../models/User');
const generateToken = require('../utils/generateToken');
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).populate({
    path: 'roles',
    populate: { path: 'permissions' },
  });
  console.log('user:', user, "password: ", password);
  console.log('typeof matchPassword:', typeof user.matchPassword);
  const match = await user.matchPassword('Admin123@'); // your test password
  console.log('Password match:', match);  
  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id),
      permissions: [...new Set(user.roles.flatMap(r => r.permissions.map(p => p.name)))],
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
