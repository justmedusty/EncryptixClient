import * as React from 'react';
import {useState} from 'react';
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
import theme from "../components/theme/Theme"
import EncryptixHeader from "../components/header/EncryptixHeader";
import {useNavigate} from 'react-router-dom';
import {Alert, Snackbar, SnackbarContent} from "@mui/material";
import {wait} from "@testing-library/user-event/dist/utils";
import {Info} from "@mui/icons-material";

const defaultTheme = theme

export default function SignUp() {
    const navigate = useNavigate();
    const [signUpFailed, setSignupFailed] = useState(false)
    const [signUpSucceeded, setSignupSucceeded] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSignUpFailure = () => {
        setSignupFailed(true); // Update state inside the event handler

        setTimeout(() => {
            setSignupFailed(false); // Update state again after delay
        }, 4000); // Or any duration you prefer
    };
    const handleSignUpSuccess = () => {
        setSignupSucceeded(true); // Update state inside the event handler

        setTimeout(() => {
            setSignupSucceeded(false); // Update state again after delay
        }, 4000); // Or any duration you prefer
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userName = data.get('userName');
        const password = data.get('password');

        try {
            const response = await fetch(`${enums.URL}${enums.PORT}${enums.SIGNUP}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName, password
                }),
            });

            if (response.ok) {
                // Request was successful, handle success logic here
                setSignupSucceeded(true)
                await wait(2000)
                navigate('/login');
            } else {
                // Request failed, handle error logic here
                setErrorMessage(response.statusText )

            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);
            alert(error)
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <EncryptixHeader></EncryptixHeader>
            <Container component="main" maxWidth="xs">
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
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <Snackbar open={signUpFailed} autoHideDuration={4000}
                                  anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert severity="error">{errorMessage}</Alert>
                        </Snackbar>
                        <Snackbar open={signUpSucceeded} autoHideDuration={4000}
                                  anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert severity="success">Sign Up Success!</Alert>
                        </Snackbar>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="Username"
                            name="userName"
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
                            Sign Up
                        </Button>
                    </Box>
                    <Button href="/login" variant="contained">
                        Already have an account?
                    </Button>
                </Box>


            </Container>

        </ThemeProvider>
    );
}