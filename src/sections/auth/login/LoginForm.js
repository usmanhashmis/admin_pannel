import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


// @mui
import { Stack, IconButton, InputAdornment,Grid,TextField,Button } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------

const LoginForm=()=> {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [adminlogin, setAdminlogin] = useState({
    admin_username: '',
    password: '',
});

  const onhandlechange = e => {
    setAdminlogin({ ...adminlogin, [e.target.name]: e.target.value });
    console.log("onchange");
     };
  const onsubmit = () => {
    axios
          .post("http://localhost:420/admin/login", adminlogin)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            navigate('/dashboard/app', { replace: true });
          })
          .catch((err) => {
            console.log(err);
          });
  };

  return (
    <Grid >
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
