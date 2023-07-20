'use client'
import React, { useState , useContext} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AuthContext } from '@/components/isAuth/authContext'
import './style.css';

const Login = () => {
 const useAuth = useContext(AuthContext)
 console.log(useAuth);
 
  const { handleLogin} = useAuth;
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignupClick = () => {
    router.push('/signup');
  };

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:3000/users/login', {
        email,
        password,
      });

      const token = response.data.token;
      // Decode the token to get the payload (e.g., userId and role)
      var payload = JSON.parse(window.atob(token.split('.')[1]));

      // Call the handleLogin function from props to store the token and other information.
      handleLogin(token, payload.userId, payload.role);

      // After successful login, navigate to the desired page.
      router.push('/');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="signIn">
      <div className="signInChild" />
      <div className="rectangleParent">
        <div className="groupChild" />
        <b className="exploreTheWorld">Discover the world of phones</b>
        <div className="newUserCreateContainer">
          <span>New user?</span>
          <span className="createAnAccount" onClick={handleSignupClick}> Create an account</span>
        </div>
        <div className="or">Or</div>
        <div className="emailAddressParent">
          <div className="emailAddress">
            <input
              className="inputbox"
              type="text"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="groupItem" />
        </div>
        <div className="PasswordParent">
          <div className="password">
            <input
              className="inputbox"
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="groupItem" />
        </div>
        <div className="rectangleGroup">
          <div className="groupInner" />
          <div className="groupParent">
            <img className="groupIcon" alt="" src="/group-48095561.svg" />
            <div className="continueWithGoogle">Continue With Google</div>
          </div>
        </div>
        <div className="rectangleContainer">
          <div className="rectangleDiv" />
          <img className="groupIcon1" alt="" src="/group.svg" />
          <div className="continueWithFacebook">Continue With Facebook</div>
        </div>
        <div className="groupDiv">
          <div className="groupChild1" />
          <img className="vectorIcon" alt="" src="/vector.svg" />
          <div className="continueWithFacebook">Continue With Apple</div>
        </div>
      </div>
      <img className="image8Icon" alt="" src="image-8@2x.png" />
      <div className="signIn1">Sign In</div>
      <div className="continueWrapper">
        <div className="continue" onClick={handleSubmit}>Continue</div>
      </div>
    </div>
  );
};

export default Login;
