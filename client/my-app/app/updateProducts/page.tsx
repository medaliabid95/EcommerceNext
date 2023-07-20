'use client'
import React, { useState } from 'react';
import './style.css'
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter ,useParams } from 'next/navigation'

const UpdateProduct = () => {
    const [products, setProducts] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        
      });
      const router = useRouter()
      const params = useParams()

      const handleChange = (e : any) => {
        setProducts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
      const updateProduct = async (e : any) => {
        e.preventDefault();
        try{
           await axios.put(`http://localhost:3000/product/${params.id}`, products)
           router.push('/products')

        }catch (err) {
            console.log(err);
          } 
        
    }

  return (
    <div>
      <h1 className='prdadd'>You can update your product now </h1>
      <form className="w3-container w3-card-4 xt" action="/action_page.php">
  <h2 className="w3-text tit">Add The Product</h2>
  <p>welcome you can add your product frome here </p>
  <p>      
  <label className="w3-text tit"><b>Name :</b></label>
  <input onClick={handleChange} className="w3-input w3-border inp" name="name" type="text"/></p>
  <p>      
  <label className="w3-text tit"><b>Description : </b></label>
  <input onClick={handleChange} className="w3-input w3-border inp" name="description" type="text"/></p>
  <p>      
  <label className="w3-text tit"><b>Price : </b></label>
  <input onClick={handleChange} className="w3-input w3-border inp" name="price" type="text"/></p>
  <p>      
  <label className="w3-text tit"><b>Stock :</b></label>
  <input onClick={handleChange} className="w3-input w3-border inp" name="stock" type="text"/></p>
  
  <Button onClick={updateProduct} className="rgst" variant="contained"  disableElevation>
        Update
      </Button>
</form>
    </div>
  )
}

export default UpdateProduct