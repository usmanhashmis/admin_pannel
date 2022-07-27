
// @mui
import { styled } from '@mui/material/styles';
import {  Container, Typography,Paper,Grid } from '@mui/material';

// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { LoginForm } from '../sections/auth/login';



// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 430,
  margin: 'auto',
  minHeight: '10vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>


        <Container maxWidth="sm">
          <Paper elevation={10} style={{"height":"80vh","marginTop":"6rem"}}>
          <Grid align="center" sx={{pt:3}} >
             <img src="https://res.cloudinary.com/db6yuxnub/image/upload/v1658827828/admin_dashboard/20315248251598811063_kp9vgw.svg" width="20%;" alt='admin_icon'/>
           </Grid >
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to Admin Dashboard
            </Typography>
            <LoginForm />
          </ContentStyle>
          </Paper>
        
        </Container>
      </RootStyle>
    </Page>
  );
}
