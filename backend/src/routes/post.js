const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createPost, getAllPost, getPostById } = require('../controllers/postController');

router.get('/', getAllPost);
router.get('/:id', getPostById);
router.post('/', protect, createPost);

module.exports = router;