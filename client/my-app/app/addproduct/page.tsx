'use client'
import React, { useState } from 'react';
import './style.css'
import Button from '@mui/material/Button';
import axios from 'axios';


const AddProduct = () => {
  const [products, setProducts] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: null,
  });
  const handleChange = (e : any) => {
    setProducts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleImageUpload = async (e : any) => {
    const file = e.target.files[0];
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'phoneProduct');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dgcdmrj7x/image/upload',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = response.data.secure_url;
      console.log(imageUrl);
      setProducts((prev) => ({ ...prev, imageUrl: imageUrl }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className='prdadd'>You can add your product now </h1>
      <form className="w3-container w3-card-4 xt" action="/action_page.php">
  <h2 className="w3-text tit">Add The Product</h2>
  <p>welcome you can add your product frome here </p>
  <p>      
  <label className="w3-text tit"><b>Name :</b></label>
  <input onChange={handleChange} className="w3-input w3-border inp" name="name" type="text"/></p>
  <p>      
  <label className="w3-text tit"><b>Description : </b></label>
  <input onChange={handleChange} className="w3-input w3-border inp" name="description" type="text"/></p>
  <p>      
  <label className="w3-text tit"><b>Price : </b></label>
  <input onChange={handleChange} className="w3-input w3-border inp" name="price" type="text"/></p>
  <p>      
  <label className="w3-text tit"><b>Stock :</b></label>
  <input onChange={handleChange} className="w3-input w3-border inp" name="stock" type="text"/></p>
  <p>      
  <label className="w3-text tit"><b>Picture :</b></label>
  <input  onChange={handleImageUpload}  className="w3-input w3-border" name="imageUrl" type="file"/></p>
  <Button className="rgst" variant="contained" disableElevation>
        Add
      </Button>
</form>
    </div>
  );
};

export default AddProduct;
