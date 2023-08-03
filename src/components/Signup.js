import * as React from 'react';
import TextField from '@mui/material/TextField';
import "./Signup.css"
import { Alert, Box, Button, Container, Grid } from '@mui/material';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {

    const [signUp, setSignUp] = useState ({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSubmitLoading(true);

        if(!validateForm()){
          setSubmitLoading(false);
          return;
        }else{
          //call api register
          try {
            const response = await axios.post('http://127.0.0.1:8000/api/register',signUp);
            console.log(response);
            setSignUp({
              name: "",
              email: "",
              password: "",
            });
              toast.success('Your account has been created. Please proceed to login.', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
          } catch (error) {
            if(error.response.status === 500){
              setError('Name & Email already taken!');
              
            }else{
            let errorMessage = error.response.data.error;
            setError(errorMessage);
            }
          }
           setSubmitLoading(false);
        }
    };
        
        const validateForm = () => {
          if (signUp.name === undefined || signUp.name === ''){
            setError('Name is required!');
            return false;

          }else if(signUp.email === undefined || signUp.email === ''){
            setError('Email is required!');
            return false;

          }else if(signUp.password === undefined || signUp.password === ''){
            setError('Password is required!');
            return false;
        }
          return true;
        };
        const handleOnChange = (event) => {
        console.log(event.target.name, event.target.value);
        setSignUp((prevState) =>({
          ...prevState, 
          [event.target.name]: event.target.value}));
    };
       

  return (
    <Container>
      <Box component="form" className="boxForm" >
       {error && <Alert severity="warning">{error}</Alert>} 
      <Grid container spacing={0} className = 'formAlign'>
        <Grid item xs={12} sm={5} className='fontSize'> 
        <TextField 
          fullWidth
          required
          id="outlined-required"
          label=" Name"
          onChange={handleOnChange}
          name= "name"
          value={signUp.name}
        />
        </Grid>
      </Grid>
      
      <Grid container spacing={0} className = 'formAlign'>
        <Grid item xs={12} sm={5} className='fontSize'>
        <TextField 
          fullWidth
          required
          id="outlined-required"
          type="email"
          label="Enter valid email"
          onChange={handleOnChange}
          name= "email"
          value={signUp.email}
        />
        </Grid>
      </Grid>

      <Grid container spacing={0} className = 'formAlign'>
        <Grid item xs={12} sm={5} className='fontSize'> 
        <TextField 
          fullWidth
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleOnChange}
          name= "password"
          value={signUp.password}
        />
        </Grid>
      </Grid>
     
      <Grid container spacing={0} className = 'formAlign'>
        <Grid item xs={12} sm={5} className='fontSize'>
          <Button 
          className="buttonSubmit3" 
          type='submit'   
          onClick={handleSubmit}
          disabled={submitLoading}
          >SUBMIT</Button> 
        </Grid>
      </Grid> 

      <Grid container spacing={0} className = 'formAlign'>
        <Grid item xs={12} sm={5} className='fontSize'>
          <Button 
          className="buttonSubmit4" 
          type='submit'  
          >
          <Link to="/login">Click Here To Login</Link></Button> 
        </Grid>
      </Grid> 

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </Box>
    </Container>
  );
}
