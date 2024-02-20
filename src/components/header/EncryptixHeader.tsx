import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Box, Button, Container, Grid} from '@mui/material';

const EncryptixHeader = () => {
    return (
        <Box sx={{height: '10vh', display: 'flex', flexDirection: 'column'}}>
            <Grid item xs={12}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h3" component="div" style={{textAlign: 'center', width: '100%'}}>
                            Encryptix
                        </Typography>
                    </Toolbar>
                    <Container maxWidth="sm">
                    </Container>
                </AppBar>

            </Grid>

        </Box>
    );
};

export default EncryptixHeader;