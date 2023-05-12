const {getUser, updateUser} = require("../controllers/users")
const router = require('express').Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)

module.exports = router
