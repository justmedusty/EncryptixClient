
// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#b645d0',
            light: '#e091ff',
            dark: '#833399',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#f8dac2',
            light: '#ffebcc',
            dark: '#c49d76',
            contrastText: '#000000',
        },
        text: {
            primary: '#000000',
            secondary: '#666666',
        },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        },
        error: {
            main: '#ff3333',
        },
        success: {
            main: '#4caf50',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 16,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#333333',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#333333',
        },
        h3: {
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#333333',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#333333',
        },
        h5: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#333333',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#333333',
        },
        body1: {
            fontSize: '1rem',
            color: '#333333',
        },
        body2: {
            fontSize: '0.875rem',
            color: '#666666',
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#333333',
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 'bold',
            color: '#666666',
        },
        button: {
            fontSize: '0.875rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    // ... other theme configurations
});

export default theme;