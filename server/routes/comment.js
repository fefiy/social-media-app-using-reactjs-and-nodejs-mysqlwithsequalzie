const { getComments, addComments } = require('../controllers/comments')
const { addpost } = require('../controllers/post')

const router = require('express').Router()


router.get("/", getComments)
router.post("/", addComments)


module.exports = router