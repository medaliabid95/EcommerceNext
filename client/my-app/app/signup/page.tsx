'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './style.module.css';
import { RadioGroup, FormControlLabel, FormControl, FormLabel, Radio } from '@material-ui/core';

const Signup = () => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState('client');
  const [imgUrl, setImgUrl] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSigninClick = () => {
    router.push('/login');
  };

  const handleChange = (e : any) => {
    setSelectedValue(e.target.value);
  };

  const handleImageUpload = async (e : any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'paypalscard');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dgcdmrj7x/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = response.data.secure_url;
      setImgUrl(imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/users/register', {
        username,
        email,
        password,
        role: selectedValue,
        imgUrl,
      });

      const token = response.data.token;
      console.log(token);

      // Redirect to login page after successful registration
      router.push('/login');
    } catch (error) {
      console.error('Register Error:', error);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.signUp}>
      <div className={styles.signUpChild} />
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <b className={styles.beginYourMeta}>Begin your phone journey here</b>
        <div className={styles.alreadyAMemberContainer}>
          <span>
            <span>Already a Member?</span>
            <span className={styles.span}>{' '}</span>
          </span>
          <span className={styles.span}>
            <span className={styles.signIn1} onClick={handleSigninClick}>Sign In</span>
          </span>
        </div>
        <div className={styles.emailAddressParent}>
          <div className={styles.emailAddress}>
            <input className={styles.inputbox} type="text" placeholder='User Name' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className={styles.groupItem} />
        </div>
        <div className={styles.vectorParent}>
          <img
            className={styles.vectorIcon}
            alt=""
            src="/vector2.svg"
            onClick={handlePasswordVisibility}
            title="Toggle password visibility"
          />
          <div className={styles.emailAddress}>
            <input
              className={styles.inputbox}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.groupItem} />
        </div>
        <div className={styles.groupParent}>
          <div className={styles.fullNameParent}>
            <div className={styles.emailAddress}>
              <input className={styles.inputbox} type="text" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.lineDiv} />
          </div>
        </div>
        <div>
          <input className={styles.imageParent} type="file" onChange={handleImageUpload} />
        </div>
        <div className={styles.roleParent}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup
              aria-label="Role"
              name="Role"
              value={selectedValue}
              onChange={handleChange}
            >
              <FormControlLabel value="client" control={<Radio />} label="Client" />
              <FormControlLabel value="seller" control={<Radio />} label="Seller" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.createAccountWrapper}>
          <div className={styles.createAccount} onClick={handleSubmit}>
            Create Account
          </div>
        </div>
      </div>
      <img className={styles.image8Icon} alt="" src="image-8@2x.png" />
      <div className={styles.signUp1}>Sign Up</div>
    </div>
  );
};

export default Signup;
