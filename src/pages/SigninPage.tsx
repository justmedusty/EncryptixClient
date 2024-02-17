import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import enums from "../enums/enums";
import {saveToken, saveTokenWithAutoDelete} from "../auth/TokenStorage";
import {useState} from "react";
import EncryptixHeader from "../components/header/EncryptixHeader";
import theme from "../components/theme/Theme";
import {useNavigate} from "react-router-dom";
import MuiAlert, { AlertProps } from '@mui/material/Alert';



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme =theme

export default function SignIn() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
                alert('Authentication failed. Please check your credentials.');
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="Username"
                            name="userName"
                            autoComplete="email"
                            autoFocus
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
                    </Button></Box>
            </Container>
        </ThemeProvider>
    );
}