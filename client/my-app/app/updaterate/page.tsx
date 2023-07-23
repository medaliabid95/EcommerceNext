'use client'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter ,useSearchParams } from 'next/navigation'
import './style.css'
const Updaterate = () => {
    const router = useRouter()
      const searchParams = useSearchParams()
      const search = searchParams.get('id')
    const [rate,setRate] =useState({
        rating: 0,
        review:""
      });
      const handleChange = (e: any) => {
        setRate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
      const updateRate = async (e : any) => {
        e.preventDefault();
        try{
           await axios.put(`http://localhost:3000/rating/${search}`, rate)
           router.push('/products')

        }catch (err) {
            console.log(err);
          } 

    }

  return (

        <form className="w3-container w3-card-4 xt" action="/action_page.php">
        <h2 className="w3-text tit">You can update your rate now </h2>
        <p>welcome you can give your rating frome here </p>
        <p>
          <label className="w3-text tit">
            <b>Rating :</b>
          </label>
          <input
            onChange={handleChange}
            className="w3-input w3-border inp"
            name="rating"
            type="text"
          />
        </p>
        <p>
          <label className="w3-text tit">
            <b>Review : </b>
          </label>
          <input
            onChange={handleChange}
            className="w3-input w3-border inp"
            name="review"
            type="text"
          />
        </p>



        <Button
          className="rgst"
          variant="contained"
          onClick={updateRate}
          disableElevation
        >
          Update 
        </Button>
      </form>

  )
}

export default Updaterate