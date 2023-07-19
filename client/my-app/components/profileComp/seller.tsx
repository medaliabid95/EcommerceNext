"use client"
import React from 'react'
import Photos from './photos'
import Acc from "./acc.tsx"
import Posts from './posts'

const Seller: React.FC<ProfileProps> = ({ handleLogout, user, setFile, change, setChange, setUpdated, updated, changeProfile, products,changeCover, id }) => {
    return (
        <div>
            <Acc handleLogout={handleLogout} user={user} setFile={setFile} change={change}  setChange={setChange} updated={updated} setUpdated={setUpdated} changeProfile={changeProfile} changeCover={changeCover} id={id} />
            <Posts user={user} products={products}/>
            <Photos products={products}/>
        </div>
    )
}

export default Seller