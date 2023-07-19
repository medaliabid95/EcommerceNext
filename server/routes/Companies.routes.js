const express = require("express")
const router = express.Router()
const {getAllCompanies,getOneCompany,addCompany,updateCompany,deleteCompany}=require("../controllers/CompaniesController")


router.get("/",getAllCompanies)

router.get("/:companyId",getOneCompany)

router.post("/",addCompany)

router.put("/:companyId",updateCompany)

router.delete("/:companyId",deleteCompany)

module.exports=router



