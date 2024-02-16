import React, {useState} from 'react';
import {Button, Container, Grid, Paper, TextField, Typography} from '@mui/material';
import {getToken} from "../../auth/TokenStorage";
import enums from "../../enums/enums";
import {toast} from "react-toastify";

interface UpdateUsernameFormProps {
    onSubmit: (data: { newUser: string }) => void;
}

const UpdateUsernameForm: React.FC<UpdateUsernameFormProps> = ({onSubmit}) => {
    const [newUser, setNewUser] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({newUser});
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="New Username"
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
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

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({onSubmit}) => {
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({newPassword});
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
    onSubmit: (data: { publicKey: string }) => void;
}

const UpdatePublicKeyForm: React.FC<UpdatePublicKeyFormProps> = ({onSubmit}) => {
    const [publicKey, setNewPublicKey] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({publicKey: publicKey});
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
                        value={publicKey}
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

    const handleUsernameSubmit = async ({newUser}: { newUser: string }): Promise<void> => {
        try {
            const token = getToken();
            const formData = new URLSearchParams();
            formData.append('newUser', newUser);

            const response = await fetch(enums.URL + enums.PORT + enums.CHANGE_USERNAME, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to update username: ${response.statusText}`);
            }

            console.log('Username updated successfully!');

        } catch (error) {
            console.error('Error updating username:', error);
        }
    };

    const handlePasswordSubmit = async ({newPassword}: { newPassword: string }): Promise<void> => {
        try {
            const token = await getToken();
            const formData = new URLSearchParams();
            formData.append('newPassword', newPassword);

            const response = await fetch(enums.URL + enums.PORT + enums.CHANGE_PASSWORD, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                toast.error("Error on password update : " + response.statusText)
                throw new Error(`Failed to update password: ${response.statusText}`);
            }

            toast.success("Successfully created password")
            console.log('Password updated successfully!');
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    const handlePublicKeySubmit = async ({publicKey}: { publicKey: string }): Promise<void> => {
        try {
            const token = await getToken();
            const formData = new URLSearchParams();
            formData.append('publicKey', publicKey);

            const response = await fetch(enums.URL + enums.PORT + enums.UPLOAD_NEW_KEY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                toast.error("Failed to update public key:" + response.statusText)
                throw new Error(`Failed to update public key: ${response.statusText}`);

            }

            toast.success("Successfully updated public key")

            console.log('Public key updated successfully!');
        } catch (error) {
            console.error('Error updating public key:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '16px 0'
            }}>
                <Typography variant="h5">Account Settings</Typography>
                <div style={{marginBottom: '16px'}}></div>
                <UpdateUsernameForm onSubmit={handleUsernameSubmit}/>
                <div style={{marginBottom: '16px'}}></div>
                <UpdatePasswordForm onSubmit={handlePasswordSubmit}/>
                <div style={{marginBottom: '16px'}}></div>
                <UpdatePublicKeyForm onSubmit={handlePublicKeySubmit}/>
            </Paper>
        </Container>
    );
};

export default AccountSettings;