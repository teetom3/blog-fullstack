const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createPost, getAllPost, getPostById, updatePost, deletePost } = require('../controllers/postController');

router.get('/', getAllPost);
router.get('/:id', getPostById);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);


module.exports = router;