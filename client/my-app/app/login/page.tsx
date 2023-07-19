'use client'
import React, { useState }  from 'react';
import { useRouter } from 'next/navigation';
import './style.css';


const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignupClick = () => {
    router.push('/signup');
  };

  const handleSubmit = () => {
    // You can handle the login logic here, such as sending the email and password to the server.
    // For demonstration purposes, let's just log the email and password for now.
    console.log('Email:', email);
    console.log('Password:', password);

    // After login, you can navigate to the desired page using router.push('/path').
    // For example:
    // router.push('/home');
  };

  return (
    <div className="signIn">
      <div className="signInChild" />
      <div className="rectangleParent">
        <div className="groupChild" />
        <b className="exploreTheWorld">Discover the world of phones</b>
        <div className="newUserCreateContainer">
          <span>New user?</span>
          <span className="createAnAccount" onClick={handleSignupClick }> Create an account</span>
        </div>
        <div className="or">Or</div>
        <div className="emailAddressParent">
          <div className="emailAddress"><input className='inputbox' type="text" placeholder='enter your email' /></div>
          <div className="groupItem" />
        </div>
        <div className="PasswordParent">
          <div className="password"><input className='inputbox'  type="text" placeholder='enter your password' /></div>
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
        <div className="continue">Continue</div>
      </div>
    </div>
  );
};

export default Login;
