import React,{ useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components

import ScrollToTop from './components/ScrollToTop';


const gettoken = localStorage.getItem("token");
// ----------------------------------------------------------------------
 
const App=()=> {
  const [renderapp,setRenderapp] = useState(gettoken);
  const navigate = useNavigate();

  useEffect(() => {
    if(renderapp){
      navigate("/login")

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
     
      <ThemeProvider>
      <ScrollToTop />
      <Router />
    </ThemeProvider>  
    </>
   
  );
}


export default App;