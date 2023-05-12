const { getRelationships, deleteRelationships, addRelationships } = require("../controllers/relashionships")

const router =    require("express").Router()


router.get('/', getRelationships)
router.delete('/', deleteRelationships)
router.post("/", addRelationships)


module.exports = router