const express = require("express")
const router = express.Router()

const {getAllRating,updateRating,AddRating,deleteRating,getOneWithUser} = require("../controllers/ratingController")


router.get("/getAll",getAllRating)
router.get("/getOneU/:UserId",getOneWithUser)
router.post("/add/:UserId/:productId",AddRating)
router.delete("/:id",deleteRating)

router.put("/:id",updateRating)

module.exports = router