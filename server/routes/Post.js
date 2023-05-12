const {getPost, addpost, deletePost}  = require('../controllers/post')
const router = require('express').Router()

router.get('/', getPost)
router.post('/', addpost)
router.delete('/:id', deletePost)

module.exports = router