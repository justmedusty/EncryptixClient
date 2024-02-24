import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, Container, Grid, Paper, Snackbar, Tab, Tabs, TextField, Typography} from '@mui/material';
import {getToken} from "../../auth/TokenStorage";
import enums from "../../enums/enums";
import {wait} from "@testing-library/user-event/dist/utils";
import AppInfo from "../supplemental/AppInfo";


interface UpdateUsernameFormProps {
    onSubmit: (data: { newUser: string }) => void;
}


interface UpdatePasswordFormProps {
    onSubmit: (data: { newPassword: string }) => void;
}

interface UpdatePublicKeyFormProps {
    onSubmit: (data: { publicKey: string }) => void;
}

const UpdatePublicKeyForm: React.FC<UpdatePublicKeyFormProps> = ({onSubmit}) => {
    const [publicKey, setNewPublicKey] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({publicKey});
        setNewPublicKey('')
    };

    return (<form onSubmit={handleSubmit}>
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
        <AppInfo title={'Info:'} content={'Must be full public key with header and footer, if you upload a key of which you do not have the private key you cannot decrypt your messages'}></AppInfo>
    </form>);
};
const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({onSubmit}) => {
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({newPassword});
        setNewPassword('')
    };


    return (<form onSubmit={handleSubmit}>
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
        <AppInfo title={'Info:'} content={'Your password must be 8 chars or more'}></AppInfo>
    </form>);
};
const UpdateUsernameForm: React.FC<UpdateUsernameFormProps> = ({onSubmit}) => {
    const [newUser, setNewUser] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({newUser});
        setNewUser('')

    };

    return (<form onSubmit={handleSubmit}>

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
        <AppInfo title={'Info:'} content={'Your username must be between 6 and 45 chars and be unique'}></AppInfo>
    </form>);
};

const AccountSettings: React.FC = () => {
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)


    const resetFailure = async () => {
        await wait(6000)
        setFailure(false)
    }
    const resetSuccess = async () => {
        await wait(6000)
        setSuccess(false)
    }

    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
        setTabValue(newValue);
    };


    const handleUsernameSubmit = async ({newUser}: { newUser: string }): Promise<void> => {
        try {
            const token: string | null = getToken();
            const formData: URLSearchParams = new URLSearchParams();
            formData.append('newUser', newUser);


            const response = await fetch(enums.URL + enums.PORT + enums.CHANGE_USERNAME, {
                method: 'POST', headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${token}`,
                }, body: formData,
            });

            if (!response.ok) {
                setFailure(true)
                await resetFailure()
            } else if (response.ok) {
                setSuccess(true)
                await resetSuccess()
            }

        } catch (error) {
            console.error('Error updating username:', error);
            alert('Error updating username')
        }
    };

    const handlePasswordSubmit = async ({newPassword}: { newPassword: string }): Promise<void> => {
        try {
            const token = getToken();
            const formData = new URLSearchParams();
            formData.append('newPassword', newPassword);

            const response = await fetch(enums.URL + enums.PORT + enums.CHANGE_PASSWORD, {
                method: 'POST', headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${token}`,
                }, body: formData,
            });

            if (!response.ok) {
                setFailure(true)
                await resetFailure()

            } else if (response.ok) {
                setSuccess(true)
                await resetSuccess()
            }

        } catch (error) {
            console.error('Error updating username:', error);
            alert('Error updating username')
        }
    };


    const handlePublicKeySubmit = async ({publicKey}: { publicKey: string }): Promise<void> => {
        try {
            const token = getToken();
            const formData = new URLSearchParams();
            formData.append('publicKey', publicKey);

            const response = await fetch(enums.URL + enums.PORT + enums.UPLOAD_NEW_KEY, {
                method: 'POST', headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${token}`,
                }, body: formData,
            });

            if (!response.ok) {
                setFailure(true)
                await resetFailure()

            } else if (response.ok) {
                setSuccess(true)
                await resetSuccess()
            }

        } catch (error) {
            console.error('Error updating public key:', error);
            alert('Error updating username')
        }
    };


    const ViewPublicKey: React.FunctionComponent = () => {
        const [publicKey, setPublicKey] = useState("");
        const token = getToken();

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(enums.URL + enums.PORT + enums.GET_MY_KEY, {
                        method: 'GET', headers: {
                            'Content-Type': 'application/json', Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) {
                    }
                    const data = await response.json();
                    if (data['Response'] == "null") {
                        setPublicKey("You do not have a public key uploaded! Please upload a public key so others can message you!");
                    } else {
                        setPublicKey(data['Response']);
                    }

                } catch (error) {
                    alert("an error occurred");
                }
            };

            fetchData();
        }, [token]);


        return (<Container>
            <Typography sx={{textAlign: 'center'}}>{publicKey}</Typography>
        </Container>)
    }
//This doesn't work in the backend for some reason, need to fix but don't feel like it right now since not super important
    /*
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
    */
    return (

        <Container className={'main'} component="main" maxWidth="md">
            <Paper elevation={3} sx={{maxWidth: 'xl', margin: 'auto'}}>
                <Box p={2} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Snackbar className={'snackbar-alert'} open={failure} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} >
                        <Alert severity="error">
                            <div>
                                <p>Change failed. Please ensure that your request meets the specified criteria:</p>
                                <ol>
                                    <li>Username: Should be at least 6 characters long and unique.</li>
                                    <li>Password: Should be at least 8 characters long.</li>
                                    <li>Public Key: Should include the full public key, including the header and
                                        footer.
                                    </li>
                                </ol>
                            </div>
                        </Alert>
                    </Snackbar>
                    <Snackbar open={success} className={'snackbar-alert'} autoHideDuration={6000}
                              anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                        <Alert severity="success">Change Success!</Alert>
                    </Snackbar>
                    <Tabs value={tabValue} onChange={handleChange}>
                        <Tab label="Change Username"/>
                        <Tab label="Change Password"/>
                        <Tab label="Change Public Key"/>
                        <Tab label="View Public Key"/>
                    </Tabs>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={3} style={{padding: 16}}>
                            <Typography variant="h5" sx={{
                                display: 'flex', justifyContent: 'center'
                            }}>{tabValue === 0 && 'Update Username'}
                                {tabValue === 1 && 'Update Password'}
                                {tabValue === 2 && 'Update Public Key'}
                                {tabValue === 3 && 'View Public Key'}
                            </Typography>
                            {tabValue === 0 && <UpdateUsernameForm onSubmit={handleUsernameSubmit}/>}
                            {tabValue === 1 && <UpdatePasswordForm onSubmit={handlePasswordSubmit}/>}
                            {tabValue === 2 && <UpdatePublicKeyForm onSubmit={handlePublicKeySubmit}/>}
                            {tabValue === 3 && <ViewPublicKey/>}
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Container>);
};

export default AccountSettings;