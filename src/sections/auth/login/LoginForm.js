import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
// @mui
import { Stack, IconButton, InputAdornment,Grid,TextField,Button, Alert } from '@mui/material';
// components
import { toast } from 'react-toastify';
import Iconify from '../../../components/Iconify';



// ----------------------------------------------------------------------

const LoginForm=()=> {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errormsg,setErrorMessage] = useState();

  const [adminlogin, setAdminlogin] = useState({
    admin_username: '',
    password: '',
});

  const onhandlechange = e => {
    setAdminlogin({ ...adminlogin, [e.target.name]: e.target.value });
  
     };
  const onsubmit = () => {
    if(adminlogin.admin_username && adminlogin.password){
    axios
          .post("/admin/login", adminlogin)
          .then((res) => {
            toast.success("Login Successfully !", {
              position: toast.POSITION.TOP_RIGHT
            });
            localStorage.setItem("token", res.data.token);
            navigate('/dashboard/app', { replace: true });
          })
          .catch((err) => {
            toast.error( err.response.data, {
              position: "top-right",

              closeOnClick: true,
              });
            setErrorMessage(err.response.data);
            setAlerts(true);
          });
        }
        else{
          alert("sdsdfsdf");
        }
  };



  return (
    <Grid >
       {/* {alerts === true && (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlerts(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
         {errormsg}
        </Alert>
      )} */}
        <Stack spacing={3}>
        <TextField name="admin_username" 
        label="Admin Username"
        onChange={onhandlechange}
        value={adminlogin.admin_username}
         />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={onhandlechange}
          value={adminlogin.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type='submit' variant="contained" size="large" fullWidth onClick={onsubmit} >Login</Button>
      </Stack>
       
    
      
    </Grid>
  );
}


export default LoginForm;
