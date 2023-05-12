const { getLikes, addLikes, deleteLikes } = require('../controllers/likes')

const router = require('express').Router()

router.get('/', getLikes)
router.post('/', addLikes)
router.delete("/", deleteLikes)


module.exports = router