'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import "./style.css"

const Company=()=>{
    const [companyy, setCompanyy] = useState(null)
    const [term,setTerm]=useState("")
    const searchParams = useSearchParams()
    const search = searchParams.get('id')
    const router = useRouter()
    
    
    const getOne = (search) => {
        axios
          .get(`http://localhost:3000/company/${search}`)
          .then((res) => setCompanyy(res.data))
          .catch((err) => console.log(err))
      }
      const delet=(id)=>{
        axios.delete(`http://localhost:3000/company/${id}`)
        .then((res)=>{
            setCompanyy(null)       
            router.push('/admin')
        })
        .catch((err)=>console.log(err))
    }

      useEffect(() => {
        getOne(search)
      }, [])
      if (!companyy) {
        return null
      }
    return(
        <div>
             <div className="containerr">
        <div className="profilee">
          <img src={companyy.Image} className="nin" alt="Company Logo" />
          <h2>{companyy.company}</h2>
          <p>Review:</p>
          <p>{companyy.review}</p>
          <img className='oo' onClick={()=>delet(companyy.id)} src='https://cdn-icons-png.flaticon.com/512/1345/1345874.png'/>
          <Link
                        href={{
                        pathname: '/adminupcomp',
                        query: { id: companyy.id },
                     }}>
          <img  className='oo' src='https://cdn-icons-png.flaticon.com/512/5278/5278663.png'/>
          </Link>
        </div>
      </div>
        </div>
    )
}

export default Company