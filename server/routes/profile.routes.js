const router = require('express').Router();
const controller = require("../controllers/profileController")

router.get("/get/:id", controller.findId)
router.get("/prod/:id",controller.getAllProductsById)
router.patch('/cover/:id', controller.updateCover)
router.patch("/main/:id", controller.updateProfile)
router.patch("/edit/:id", controller.editProfile)
module.exports = router
