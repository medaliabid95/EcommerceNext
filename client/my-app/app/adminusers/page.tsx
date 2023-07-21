"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css"

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    axios
      .get('http://localhost:3000/users/')
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      
      <div className="table-container">
        <h1 className="title">All Users</h1>
        <table id="customers">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Date of Creation</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className='i'>
                    <img className='img' src={user.imgUrl}/>
                    <div className='a'>
                    {user.username}
                    </div>
                    </td>
                <td className='rat' >{user.role}</td>
                <td className='rat'>{user.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default AllUsers;
