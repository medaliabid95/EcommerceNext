"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import "./style3.css"
const UpdateCompany=()=>{
    const [term,setTerm]=useState({})
    const searchParams = useSearchParams()
    const search = searchParams.get('id')
    const router = useRouter()
console.log(search)
    const update=(id,term)=>{
        const { company,rating,review,sales}=term
        axios.put(`http://localhost:3000/company/${id}`,{ company,rating,review,sales   })
        .then((res)=>{
            router.push('/admin')
        })
        .catch((err)=>console.log(err))
    }
    return(
      <div>
           <div>
      <h1 className='prdadd'>Update Compnay </h1>
      <form className="w3-container w3-card-4 xt" action="/action_page.php">
  <h2 className="w3-text tit">Update The Company</h2>
  <p>
  <label className="w3-text tit"><b> Company Name :</b></label>
  <input className="w3-input w3-border inp" name="name" type="text" onChange={(e)=>setTerm({...term,company:e.target.value})}/></p>
  <p>
  <label className="w3-text tit"><b>rating : </b></label>
  <input  className="w3-input w3-border inp" name="description" type="text" onChange={(e)=>setTerm({...term, rating:e.target.value})}/></p>
  <p>
  <label className="w3-text tit"><b>review : </b></label>
  <input  className="w3-input w3-border inp" name="price" type="text" onChange={(e)=>setTerm({...term, review:e.target.value})}/></p>
  <p>
  <label className="w3-text tit"><b>sales :</b></label>
  <input  className="w3-input w3-border inp" name="stock" type="text" onChange={(e)=>setTerm({...term, sales:e.target.value})}/></p>
  <Button className="rgst" variant="contained" disableElevation onClick={()=>update(search,term)}>
        update
      </Button>
</form>
    </div>
      </div>
    )
}
export default UpdateCompany