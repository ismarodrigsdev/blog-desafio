const { Router } = require('express');
const postsController = require('../controllers/postController');
const auth = require('../middlewares/auth');

const router = Router();

router.post('/posts', auth, postsController.createPost);
router.put('/posts/:id', auth, postsController.updatePost);
router.get('/posts', auth, postsController.getPosts);
router.get('/posts/:id', auth, postsController.getPostById);

router.delete('/posts/:id', auth, postsController.deletePost);


module.exports = router;