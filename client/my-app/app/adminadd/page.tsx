"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'
import "./style1.css"

const AddCompany=()=>{
    const [companyy,setCompanyy]=useState([])
    const [term,setTerm]=useState({})
    const [file,setFile]=useState(null)
    const router = useRouter()
    const add=(infos : any)=>{
        const { company,rating,review,createdAt,Image,sales,color}=infos
        axios.post("http://localhost:3000/company", { company,rating,review,createdAt,Image,sales,color})
        .then((res)=>{
            setCompanyy([...companyy,res.data])
            router.push('/admin')
        })
        .catch((err)=>console.log(err))
      }
    
      const uploadImg = async () => {
        const form = new FormData()
        form.append("file", file)
        form.append("upload_preset", "ahmedsm")
      
        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dljarbi3r/image/upload",form
          )
          setTerm({ ...term, Image: response.data.secure_url })
        } catch (error) {
          console.log(error)
        }
      }
    return(
        <div>
            <div>
                  <h1 className='prdadd'>Add Compnay </h1>
                  <form className="w3-container w3-card-4 xt" action="/action_page.php">
              <h2 className="w3-text tit">Add The Company</h2>  
              <p>      
              <label className="w3-text tit"><b> Company Name :</b></label>
              <input className="w3-input w3-border inp" name="name" type="text" onChange={(e)=>setTerm({...term, company:e.target.value})}/></p>
              <p>      
              <label className="w3-text tit"><b>rating : </b></label>
              <input  className="w3-input w3-border inp" name="description" type="text" onChange={(e)=>setTerm({...term, rating:e.target.value})}/></p>
              <p>      
              <label className="w3-text tit"><b>review : </b></label>
              <input  className="w3-input w3-border inp" name="price" type="text" onChange={(e)=>setTerm({...term, review:e.target.value})}/></p>
              <p>      
              <label className="w3-text tit"><b>sales :</b></label>
              <input  className="w3-input w3-border inp" name="stock" type="text" onChange={(e)=>setTerm({...term, sales:e.target.value})}/></p>
              <p>      
              <label className="w3-text tit"><b>Write A Color : </b></label>
              <input  className="w3-input w3-border inp" name="color" type="text" onChange={(e)=>setTerm({...term, color:e.target.value})}/></p>
              <p>      
              <label className="w3-text tit"><b>Picture :</b></label>
              <input  className="w3-input w3-border" name="imageUrl" type="file" onChange={(e) => setFile(e.target.files[0])}/></p>
              <Button className="rgst" variant="contained" disableElevation onClick={()=>add(term)}>
                    Add
                  </Button>
                  <Button className="rgst" variant="contained" disableElevation onClick={uploadImg}>
                    upload !
                  </Button>
            </form>
    </div>
        </div>
    )
}

export default AddCompany