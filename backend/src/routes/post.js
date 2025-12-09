const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createPost, getAllPost } = require('../controllers/postController');


router.post('/', protect, createPost);
router.get('/', getAllPost);
module.exports = router;