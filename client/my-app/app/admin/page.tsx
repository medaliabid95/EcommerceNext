"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import "./style.css"

const AdminDashBord = () => {
    const [company, setCompany] = useState([])
    const [product, setProduct] = useState([])
    const [state,setState]=useState(false)

    const getAllCompanies = () => {
        axios.get("http://localhost:3000/company")
          .then((res) => {
            setCompany(res.data)
            console.log(res.data)
          })
          .catch((err) => console.log(err))
      }
      const getAllProduct = () => {
        axios.get("http://localhost:3000/product/getAll")
          .then((res) => {
            setProduct(res.data)
            console.log(res.data)
          })
          .catch((err) => console.log(err))
      }
      const delet=(id)=>{
        axios.delete(`http://127.0.0.1:3000/product/${id}`)
        .then((res)=>{
         setState(!state)
              
        })
        .catch((err)=>console.log(err))
    }
      useEffect(() => {
        getAllCompanies()
      }, [])
      useEffect(() => {
        getAllProduct()
      }, [state])
  
    console.log(product);
    
  
    return (
     
        <div>
            <h1 className='title'>TOP MARKET STATISTICS</h1>
        <div>
          <table id="customers">
            <thead>
              <tr>
                <th>Company</th>
                <th>Rating</th>
                <th>sales</th>
              </tr>
            </thead>
            <tbody>
            {company.map((e:any, index) => (
                <tr key={index}>
                  <td className='i'>
                  <Link
                        href={{
                        pathname: '/admincompany',
                        query: { id: e.id },
                     }}>
                    <img className='img' src={e.Image} alt={e.company} />
                    </Link> 
                      <div className='a'>
                     
                        {e.company}
                        
                      </div>
                  </td>
                  <td className='rat'>
                  <div className='di'>
                    {e.rating}
                    <img className='iv' src='https://www.iconpacks.net/icons/2/free-rating-star-icon-2793-thumb.png' alt="rating" />
                    </div>
                  </td>
                  <td className='rat'>
                  <div className='di'>
                     {e.sales}
                     <img className='iv' src='https://cdn-icons-png.flaticon.com/512/4305/4305512.png'/>
                     </div>
                     </td>

                </tr>
              ))}   
            </tbody>
          </table>
          <Link href="/adminadd">
            <p className='p'>Add :</p>
          <img className='ia' src='https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png'/>
          </Link>
          <Link href="/adminusers">
            <p className='p'>users :</p>
          <img className='ia' src='https://cdn-icons-png.flaticon.com/512/552/552721.png'/>
          </Link>
        </div>
        <h1 className='titlee'>ALL PRODUCT</h1>
        <div>
        <table id="customers">
            <thead>
              <tr>
                <th className='th'>Product</th>
                <th className='th'>Stock</th>
                <th className='th'>Price</th>
                <th className='th'>update-delete</th>
              </tr>
            </thead>
            <tbody>
            {product.map((e:any, index) => (
                <tr key={index}>
                  <td className='i'>
                    <img className='img' src={e.imageUrl} alt={e.name} />
                      <div className='a'>
                       {e.name}
                      </div>
                  </td>
                  <td className='rat'>
                  <div className='di'>
                    {e.stock}
                    <img className='iv' src='https://cdn-icons-png.flaticon.com/512/5166/5166970.png' alt="rating" />
                    </div>
                  </td>
                  <td className='rat'>
                  <div className='di'>
                     {e.price}
                     <img className='iv' src='https://cdn-icons-png.flaticon.com/512/4305/4305512.png'/>
                     </div>
                     </td>
                     <td>
                     <img onClick={()=>delet(e.id)}  className='iv' src='https://cdn-icons-png.flaticon.com/512/1345/1345874.png'/>
                     <Link
                        href={{
                        pathname: '/adminupdprod',
                        query: { id: e.id },
                     }}>
                     <img  className='iv' src='https://cdn-icons-png.flaticon.com/512/5278/5278663.png'/>
                     </Link>
                     </td>
           
                </tr>
              ))}   
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  
  


export default AdminDashBord