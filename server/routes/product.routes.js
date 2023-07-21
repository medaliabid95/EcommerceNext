const express = require("express")
const router = express.Router()

const {getAllProducts,getAllAdmin,createProduct,updateProduct,deleteProduct,getOne,getOneWithUser} = require("../controllers/productController")


router.get("/getAll",getAllProducts)
router.get("/getAllAdmin",getAllAdmin)
router.get("/getOne/:productsId",getOne)
router.get("/getOneU/:UserId",getOneWithUser)
router.post("/add/:UserId",createProduct)
router.delete("/:id",deleteProduct)
router.put("/:id",updateProduct)


module.exports = router