const express = require("express")
const router = express.Router()

const {getAllOrders,createOrder, getOne, updateOrder,deleteOrder} = require("../controllers/orderController")

router.get("/getAll",getAllOrders)
router.get("/getone/:id",getOne)
router.post("/add/:UserId",createOrder)
router.delete("/:id",deleteOrder)
router.put("/:id",updateOrder)




module.exports = router