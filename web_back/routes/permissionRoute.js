const express = require('express');
const { createPermission, getPermissions } = require('../controllers/permissionController');
const router = express.Router();
router.post('/', createPermission);
router.get('/', getPermissions);
module.exports = router;