const Permission = require('../models/permission');
exports.createPermission = async (req, res) => {
  const permission = new Permission(req.body);
  await permission.save();
  res.status(201).json(permission);
};
exports.getPermissions = async (req, res) => {
  const permissions = await Permission.find();
  res.json(permissions);
};
