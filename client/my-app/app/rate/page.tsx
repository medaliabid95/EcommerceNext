'use client'
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import "./style.css"
import Button from '@mui/material/Button';
import { AuthContext } from '@/components/isAuth/authContext'



const Rate = () => {
  const  useAuth = useContext(AuthContext)
  const { user } = useAuth

    const [product, setProduct] = useState(null)
    const searchParams = useSearchParams()
    const search = searchParams.get('id')
    const [rate,setRate] =useState({
      rating: 0,
      review:""
    });
    const [data, setData] = useState([]);

    const router = useRouter()

    const getOne = (search) => {
        axios
          .get(`http://localhost:3000/product/getOne/${search}`)
          .then((res) => setProduct(res.data))
          .catch((err) => console.log(err))
      }


      const fetchOnerating = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/rating/getOneU/${user.userId}`);
          setData(res.data);
  
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        getOne(search)
        fetchOnerating()
      }, [])



      if (!product) {
        return null
      }
      const handleClick = async (e: any) => {
        e.preventDefault();
        try {
          await axios.post(`http://localhost:3000/rating/add/${user.userId}/${search}`, rate);
          router.push('/products');
        } catch (err) {
          console.log(err);
        }
      };
      const handleChange = (e: any) => {
        setRate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
      const handleDelete = async (id: number) => {
        try {
          await axios.delete(`http://127.0.0.1:3000/rating/${id}`);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div>
        <div className="containerr">
        <div className="profilee">
          <img src={product.imageUrl} className="nin" alt="Company Logo" />
          <p>Name :</p>
          <h2>{product.name}</h2>
          <p>Description :</p>
          <p>{product.description}</p>
          
          
        </div>
      </div>

      <form className="w3-container w3-card-4 xt" action="/action_page.php">
        <h2 className="w3-text tit">Give The Rating</h2>
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
          onClick={handleClick}
          disableElevation
        >
          Add
        </Button>
      </form>



      <div className="tbbb">
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th scope="col">rating </th>
              <th scope="col">Review</th>
              <th scope="col">delete rating</th>
              <th scope="col">Update rating</th>
            </tr>
          </thead>
          <tbody>
            
{data.map((elem : any)=>{
  return (

            <tr key={elem.id}>
              <th scope="row">{elem.rating}</th>
              <td>{elem.review}</td>
              
              <td>
                <button type="button" className="btn btn-success  ">
                <Link   href={{
                        pathname: '/updaterate',
                        query: { id: elem.id },
                     }}>Update</Link>
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(elem.id)} type="button" className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
  )
})}
           

          </tbody>
        </table>
      </div>






    </div>
  )
}

export default Rate