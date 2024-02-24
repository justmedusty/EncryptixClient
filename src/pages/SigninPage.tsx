import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider} from '@mui/material/styles';
import enums from "../enums/enums";
import { saveTokenWithAutoDelete} from "../auth/TokenStorage";
import {useState} from "react";
import EncryptixHeader from "../components/header/EncryptixHeader";
import theme from "../components/theme/Theme";
import {Link, useNavigate} from "react-router-dom";
import { Alert, Snackbar } from '@mui/material';
import AppInfo from "../components/supplemental/AppInfo";



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme =theme

export default function SignIn() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loginFailed, setLoginFailed] = useState(false)



    const handleLoginFailure = () => {
        setLoginFailed(true); // Update state inside the event handler

        setTimeout(() => {
            setLoginFailed(false); // Update state again after delay
        }, 4000); // Or any duration you prefer
    };

        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);


        try {
            const base64Credentials = btoa(`${data.get('userName')}:${data.get('password')}`);

            const response = await fetch(enums.URL + enums.PORT + enums.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${base64Credentials}`,
                },
            });

            if (!response.ok) {
                // Handle authentication error
                setError('Authentication failed. Please check your credentials.');
                handleLoginFailure()
                return;
            }

            // Authentication successful, redirect or perform other actions as needed
            setError('');
            const responseData = await response.json();
            const accessToken = responseData.access_token;

            if (accessToken) {
                saveTokenWithAutoDelete(accessToken);
                console.log('Authentication successful! Token:', accessToken);
                navigate('/dashboard')
            } else {
                setError('Token not found in the response.');
                alert('Token not found in the response.');
            }

        } catch (error) {
            // Handle other errors (network issues, server errors, etc.)
            setError('An error occurred while processing your request.');

            if (error instanceof Response) {
                // If the error is a Response object, log the status and response body
                console.error('Response status:', error.status);
                const responseBody = await error.text();
                console.error('Response body:', responseBody);
            } else {
                // Log other errors
                console.error('Error in handleSubmit:', error);
            }

            alert('An error occurred while processing your request.');
        }

    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <EncryptixHeader></EncryptixHeader>
            <Container component="main" maxWidth="xs" >
                <CssBaseline/>

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <Snackbar className={'snackbar-alert'} open={loginFailed} autoHideDuration={4000} anchorOrigin={{vertical:'top', horizontal:'center'}}>
                            <Alert severity="error">Invalid Credentials Please Try Again</Alert>
                        </Snackbar>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="Username"
                            name="userName"
                            autoComplete="email"
                            autoFocus
                            inputProps={{ maxLength: 100 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputProps={{ maxLength: 100 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                    </Box>

                    <Button href="/signup" variant="contained">
                        Don't have an account?
                    </Button>
                    <AppInfo title={'Info:'} content={'This service relies on you to have a valid public pgp key of which you possess the private key. You must upload your public key via the Account Settings tab once you are logged in. You cannot message others, and others cannot message you until you do this.'}></AppInfo>
                    <Link to={'http://6v4gddjepi6gu6khtkheqkniza2p2u6lsmwa5acod4xq5jh3dkdyevad.onion/'} style={{alignContent:'center'}}>Explanation of the service</Link>

                </Box>

            </Container>

        </ThemeProvider>
    );
}