import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Box, Container, Grid} from '@mui/material';

const EncryptixHeader = () => {
    return (<Box sx={{height: '10vh', display: 'flex', flexDirection: 'column', marginBottom: '10px'}}>
            <Grid item xs={12}>
                <AppBar position="static">
                    <Toolbar>
                        <Box style={{textAlign: 'center', width: '100%'}}>
                            <Typography variant="h3" component="div" style={{
                                fontFamily: 'Arial', // Change this to any font family you like
                                fontWeight: 'bold', fontSize: '2em', color: 'black', letterSpacing: '0.05em',
                            }}>
                                Encryptix
                            </Typography>
                            <Typography variant={'subtitle1'} component="div" style={{
                                fontFamily: 'Arial', // Change this to any font family you like
                                fontWeight: 'lighter',
                                color: 'black',
                                letterSpacing: '0.7em',
                                textTransform: 'capitalize'
                            }}>
                                Anonymity + Privacy
                            </Typography>
                        </Box>
                    </Toolbar>
                    <Container maxWidth="sm">
                    </Container>
                </AppBar>
            </Grid>
        </Box>);
};

export default EncryptixHeader;