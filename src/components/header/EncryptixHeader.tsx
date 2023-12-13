import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

const EncryptixHeader = () => {
    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h3" component="div" style={{ textAlign: 'center', width: '100%' }}>
                        Encryptix
                    </Typography>
                </Toolbar>
            </AppBar>
        </Container>
    );
};

export default EncryptixHeader;