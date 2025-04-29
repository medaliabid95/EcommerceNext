import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';


export default function Home() {
  return (
    <div>
    

       <h1>Welcome to the Phone Store!</h1>
      <p>
        We sell the latest and greatest phones. Click the button below to login and explore our products.
      </p>
       <Link href="/login" passHref>
        <Button variant="contained" color="primary">
          Go to Login
        </Button>
      </Link>

    </div>
  )
}
