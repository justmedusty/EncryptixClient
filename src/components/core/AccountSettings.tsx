import React, { useState } from 'react';
import { Container, Paper, Typography, Grid, Button, TextField } from '@mui/material';
import {getToken} from "../../auth/TokenStorage";

interface UpdateUsernameFormProps {
    onSubmit: (data: { newUsername: string }) => void;
}

const UpdateUsernameForm: React.FC<UpdateUsernameFormProps> = ({ onSubmit }) => {
    const [newUsername, setNewUsername] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ newUsername });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="New Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Update Username
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

interface UpdatePasswordFormProps {
    onSubmit: (data: { newPassword: string }) => void;
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ onSubmit }) => {
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ newPassword });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="password"
                        label="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Update Password
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

interface UpdatePublicKeyFormProps {
    onSubmit: (data: { newPublicKey: string }) => void;
}

const UpdatePublicKeyForm: React.FC<UpdatePublicKeyFormProps> = ({ onSubmit }) => {
    const [newPublicKey, setNewPublicKey] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ newPublicKey });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="New Public Key"
                        multiline
                        rows={4}
                        value={newPublicKey}
                        onChange={(e) => setNewPublicKey(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Update Public Key
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

const AccountSettings: React.FC = () => {
    const apiUrl = 'YOUR_API_ENDPOINT'; // Replace with your actual API endpoint

    const handleUsernameSubmit = async ({ newUsername }: { newUsername: string }) => {
        try {
            const token = getToken(); // Assuming getToken is a function to get the JWT token
            const response = await fetch(`${apiUrl}/update-username`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newUsername }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update username: ${response.statusText}`);
            }

            console.log('Username updated successfully!');
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };

    const handlePasswordSubmit = async ({ newPassword }: { newPassword: string }) => {
        try {
            const token = await getToken();
            const response = await fetch(`${apiUrl}/update-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newPassword }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update password: ${response.statusText}`);
            }

            console.log('Password updated successfully!');
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    const handlePublicKeySubmit = async ({ newPublicKey }: { newPublicKey: string }) => {
        try {
            const token = await getToken();
            const response = await fetch(`${apiUrl}/update-public-key`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newPublicKey }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update public key: ${response.statusText}`);
            }

            console.log('Public key updated successfully!');
        } catch (error) {
            console.error('Error updating public key:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Account Settings</Typography>
                <UpdateUsernameForm onSubmit={handleUsernameSubmit} />
                <UpdatePasswordForm onSubmit={handlePasswordSubmit} />
                <UpdatePublicKeyForm onSubmit={handlePublicKeySubmit} />
            </Paper>
        </Container>
    );
};

export default AccountSettings;