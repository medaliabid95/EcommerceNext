import axios from 'axios'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const page = () => {
    // const [searchParams] = useSearchParams()
    
    // useEffect(()=>{
    //     axios
    //     .post(`http://localhost:3000/api/payment/${searchParams.get("payment_id")}`)
    //     .then(res=>{
    //         console.log(res.data);
            
    //     })
    //     .catch(err => console.log(err)
    //     )

    // },[])
  return (
    <div className='p-4'>
        <div className='alert alert-success'>Success payment</div>
        
    </div>
  )
}

export default page