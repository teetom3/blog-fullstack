const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createPost } = require('../controllers/postController');


router.post('/', protect, createPost);

module.exports = router;