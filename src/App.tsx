import React from 'react';
import SignIn from "./pages/SigninPage";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import SignUp from "./pages/SignupPage";
import {theme} from "@chakra-ui/react";
import {ThemeProvider} from "@mui/material/styles";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
    /* Add more routes as needed */
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login"/>}/>
                    <Route path="/login" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                </Routes>
            </Router>

        </ThemeProvider>
    );
};

export default App;
