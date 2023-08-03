import React from 'react';
import './Login.css';
import TextField from '@mui/material/TextField';
import { Alert, Box, Button, CircularProgress, Container, Grid } from '@mui/material';
import { useState } from 'react';
import './Signup.js';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Signup from './Signup.js';
import toast, { Toaster } from 'react-hot-toast';

function Login () {

  const notify = () => toast('Successfully logged in!');

   const navigate = useNavigate();

   const [formData, setformData] = useState({
     email:'',
     password:''
   });

  const [error, setError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitLoading(true);

    if (!validateForm()){
      setSubmitLoading(false);
      return;
    }else{
      try {
        const response = await axios.post('http://ec2-13-238-120-14.ap-southeast-2.compute.amazonaws.com/api/login',formData);
        
        const token = response.data.token;
        
        localStorage.setItem('login_token',token);
        const hasRole = response.data.user.role ?? '';
        console.log(hasRole);

         if(hasRole === 'admin') {
           notify();
          navigate('/menu');
        }else{
          navigate('/cart');
        }
        // navigate('/cart');
      } catch (error) {
        let errorMessage = error.response.data.error;
        setError(errorMessage);
      }
      setSubmitLoading(false);
    }
  };

  

  const validateForm = () => {
    if (formData.email === undefined || formData.email === ''){
      setError('Email is required!');
      return false;
    }else if(formData.password === undefined || formData.password === ''){
      setError('Password is required!');
      return false;
    }
      return true;
    };

  const handleChange =(event) => {
 
     setformData((prevState) =>({
       ...prevState,
       [event.target.name]: event.target.value,
     }));
  };

  return (
    <Container>
      <Box component="form" className="boxForm" >
        {error && <Alert severity="warning">{error}</Alert> }     
        <Grid container spacing={0} className = 'formAlign'> 
          <Grid id="formTop" item xs={12} sm={5} className='fontSize' >
              <TextField 
              fullWidth
              required
              id="outlined-required"
              type="email"
              label="Enter your email"
              name= "email"
              value={formData.email}
              onChange={handleChange}
              />
          </Grid>
        </Grid>
        <Grid container spacing={0} className = 'formAlign'>
          <Grid item xs={12} sm={5}  className='fontSize'>
              <TextField 
              fullWidth
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              name= "password"
              value={formData.password}
              onChange={handleChange}
              />
          </Grid>
        </Grid>
        <Grid container spacing={0} className = 'formAlign'>
          <Grid item xs={12} sm={5} className='fontSize'>
          <Button 
          className="buttonSubmit1"
          type='Submit'  
          onClick={handleLogin}
          disabled={submitLoading}

          >
          {submitLoading ? <CircularProgress color="inherit" size={'10px'} />:''}Login
          </Button>
          </Grid>
        </Grid>
        <Grid container spacing={0} className = 'formAlign'>
          <Grid item xs={12} sm={5} className='fontSize'>
              <div className="buttonSubmit2">
              <Link to="/signup">Don't have an account? Click here to register!</Link></div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Login;