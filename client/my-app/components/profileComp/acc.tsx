"use client"
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";


const Acc: React.FC<ProfileProps> = ({user, setFile, change, setChange, setUpdated, updated, changeProfile, changeCover, id }) => {
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(true)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [showen, setShowen] = useState(false)



  const editProfile = (id:number) => {
    axios.patch(`http://127.0.0.1:3001/api/profile/edit/${id}`, {
      username: name,
      bio: bio
    })
      .then((res) => { setUpdated(!updated) })
      .catch((err) => console.log(err))
  }


  return (
    <div> 
      <div className="card">
        <div className="card__img">
          <img src={user.coverUrl} alt="Card Image" />
        </div>
        <div className="edit-icon">
          <FontAwesomeIcon icon={faPen} onClick={(e) => { e.preventDefault(); setChange(!change); setShowen(!showen) }} />
          {showen ? <div className="input-div">
            <input className="input" name="file" type="file" onChange={(e:any) => setFile(e.target.files[0])} />
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" strokeLinejoin="round" strokeLinecap="round" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
          </div> : null}
          {showen ? <button className="button2" onClick={(e) => { e.preventDefault(); changeCover(1); setShowen(!showen) }}>
            save
            <div className="hoverEffect">
              <div>
              </div>
            </div></button> : null}
        </div>
        <div className="card__avatar">
          <img src={user.imgUrl} alt="Avatar" />
        </div>
        <div className="editPhoto">
          <FontAwesomeIcon icon={faCamera} onClick={(e) => { e.preventDefault(); setChange(!change); setShow(!show) }} />
          {show ? <div className="input-div">
            <input className="input" name="file" type="file" onChange={(e:any) => setFile(e.target.files[0])} />
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" strokeLinejoin="round" strokeLinecap="round" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
          </div> : null}
          {show ? <button className="button" onClick={(e) => { e.preventDefault(); changeProfile(1); setShow(!show) }}>
            save
            <div className="hoverEffect">
              <div>
              </div>
            </div></button> : null}
        </div>
        {hide ? <div className="card__title">{user.username}</div> : <div className="form__group field">
          <input type="input" className="form__field" placeholder="Username" onChange={(e) => setName(e.target.value)} />
          <label  className="form__label">Username</label>
        </div>}
        {hide ? <div className="card__subtitle">{user.bio}</div> : <div className="form__group field">
          <input type="input" className="form__field" placeholder="Bio" onChange={(e) => setBio(e.target.value)} />
          <label  className="form__label">Bio</label>
        </div>}
        <button className="button" onClick={(e) => {
          e.preventDefault();
          if (hide) {
            setHide(!hide);
          } else {
            editProfile(1);
            setHide(!hide);

          }
        }}>
          edit profile
          <div className="hoverEffect">
            <div>
            </div>
          </div></button>

      </div>

    </div>
  )
}

export default Acc;
