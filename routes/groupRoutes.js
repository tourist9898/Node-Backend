const express = require('express');
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, groupController.createGroup);
router.delete('/:groupId', authMiddleware, groupController.deleteGroup);
router.get('/search', authMiddleware, groupController.searchGroups);

module.exports = router;
