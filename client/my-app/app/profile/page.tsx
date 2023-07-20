"use client"
import React, { useEffect, useState } from 'react'
import Client from "../../components/profileComp/client"
import Seller from '../../components/profileComp/seller'
import axios from 'axios'
import "./page.css"


const Page: React.FC<ProfileProps> = ({ userId, userRole, handleLogout }) => {
  const [user, setUser] = useState([])
  const [state, setState] = useState(false)
  const [file, setFile] = useState("")
  const [change, setChange] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    fetch(1)
    getProducts(1)
  }, [updated, state])

  const fetch = (id: number) => {
    axios.get(`http://127.0.0.1:3000/api/profile/get/${id}`)
      .then((res) => { setUser(res.data)})
      .catch((err) => console.log(err))
  }

  const getProducts = (id: number) => {
    axios.get(`http://localhost:3000/api/profile/prod/${id}`)
      .then((res) => {setProducts(res.data)})
      .catch((err) => console.log(err))
  }

  const changeProfile  = async (id: number) => {
    const form = new FormData()
    form.append("file", file)
    form.append("upload_preset", "blogging")
    const res = await axios.post("https://api.cloudinary.com/v1_1/dx3tuofza/upload", form)
    const url = res.data.secure_url
    await axios.patch(`http://127.0.0.1:3000/api/profile/main/${id}`, {
      url: url
    })
      .then((res) => { setState(!state) })
      .catch((err) => alert("failed to change profile"))
  }

  const changeCover = async (id: number) => {
    const form = new FormData()
    form.append("file", file)
    form.append("upload_preset", "blogging")
    const res = await axios.post("https://api.cloudinary.com/v1_1/dx3tuofza/upload", form)
    const url2 = res.data.secure_url
    await axios.patch(`http://127.0.0.1:3000/api/profile/cover/${id}`, {
      url: url2
    })
      .then((res) => { setState(!state) })
      .catch((err) => alert("failed to post blog"))
  }
  return (
    <div>
      {userRole === "seller" || userRole ===  "admin" ? <Client /> : <Seller products={products} handleLogout={handleLogout} user={user} setFile={setFile} change={change} setChange={setChange}  updated={updated}  setUpdated={setUpdated}  changeProfile={changeProfile} changeCover={changeCover} id={userId}  />}
    </div>
  )
}

export default Page;