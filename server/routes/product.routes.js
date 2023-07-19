const express = require("express")
const router = express.Router()

const {getAllProducts,createProduct,updateProduct,deleteProduct,getOne} = require("../controllers/productController")


router.get("/getAll",getAllProducts)
router.get("/getOne/:UserId",getOne)

router.post("/add/:UserId",createProduct)
router.delete("/:id",deleteProduct)
router.put("/:id",updateProduct)


module.exports = router