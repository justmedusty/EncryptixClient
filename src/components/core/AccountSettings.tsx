import React, {useEffect, useState} from 'react';
import {Box, Button, Checkbox, Container, Grid, Paper, Tab, Tabs, TextField, Typography} from '@mui/material';
import {deleteToken, getToken} from "../../auth/TokenStorage";
import enums from "../../enums/enums";


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
            }

            alert('Username updated successfully!');
        } catch (error) {
            console.error('Error updating username:', error);
            alert('Error updating username')
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
                alert("Error on password update : " + response.statusText)
            }

            alert("Successfully created password")
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
                alert("Failed to update public key:" + response.statusText)


            }
            alert('Public key updated successfully!')
            console.log('Public key updated successfully!');
        } catch (error) {
            console.error('Error updating public key:', error);
        }
    };
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
        setTabValue(newValue);
    };

    const ViewPublicKey: React.FunctionComponent = () => {
        const [publicKey, setPublicKey] = useState();
        const token = getToken();

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(enums.URL + enums.PORT + enums.GET_MY_KEY, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) {
                    }
                    const data = await response.json();
                    setPublicKey(data['Response']);
                } catch (error) {
                    alert("an error occurred");
                }
            };

            fetchData();
        }, [token]);


        return(
            <Container>
               <Typography>{publicKey}</Typography>
            </Container>
        )
    }


    const DeleteAccount: React.FunctionComponent = () => {
        const [isChecked, setIsChecked] = useState(false);
        const token = getToken();

            const deleteAccount = async () => {
                if (isChecked) {
                    try {
                        const response = await fetch(enums.URL + enums.PORT + enums.DELETE_ACCOUNT, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        if (!response.ok) {
                            alert(response.status)
                        }
                        else{
                            alert(response.status)
                        }


                    } catch (error) {
                        alert("an error occurred");
                    }
                } else {
                    alert("You must click the checkbox to confirm before you delete")
                }
            }
        return(
            <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ width: "50%" }}>
                    <Checkbox onChange={event => setIsChecked(event.target.checked)} checked={isChecked}/>
                    <Button color="primary" type="button" onClick={deleteAccount}>
                        Delete
                    </Button>
                </Box>
            </Container>
        )
    }

    return (

        <Container className={'main'} component="main" maxWidth="md">
            <Paper elevation={3} sx={{ maxWidth: 'xl', margin: 'auto' }}>
                <Box p={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Tabs value={tabValue} onChange={handleChange}>
                        <Tab label="Change Username"/>
                        <Tab label="Change Password"/>
                        <Tab label="Change Public Key"/>
                        <Tab label="View Public Key"/>
                        <Tab label="Delete Account"/>
                    </Tabs>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={3} style={{padding: 16}}>
                            <Typography variant="h5" sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>{tabValue === 0 && 'Update Username'}
                                {tabValue === 1 && 'Update Password'}
                                {tabValue === 2 && 'Update Public Key'}
                                {tabValue === 3 && 'View Public Key'}
                                {tabValue === 4 && 'Delete Account'}
                            </Typography>
                            {tabValue === 0 && <UpdateUsernameForm onSubmit={handleUsernameSubmit}/>}
                            {tabValue === 1 && <UpdatePasswordForm onSubmit={handlePasswordSubmit}/>}
                            {tabValue === 2 && <UpdatePublicKeyForm onSubmit={handlePublicKeySubmit}/>}
                            {tabValue === 3 && <ViewPublicKey/>}
                            {tabValue === 4 && <DeleteAccount></DeleteAccount>}
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default AccountSettings;