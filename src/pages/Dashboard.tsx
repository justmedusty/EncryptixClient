import React, { useState, ChangeEvent } from 'react';
import { AppBar, Container, Paper, Tab, Tabs, ThemeProvider, Typography } from '@mui/material';
import theme from "../components/theme/Theme";
import Button from "@mui/material/Button";
import {deleteToken} from "../auth/TokenStorage";
import EncryptixHeader from "../components/header/EncryptixHeader";
import MessageList from "../components/core/MessageFetch";
import UserList from "../components/core/SearchUsers";
import AccountSettings from "../components/core/AccountSettings";
import MessageSend from "../components/core/MessageSend";

const DashboardPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <EncryptixHeader></EncryptixHeader>
        <Container>
            <AppBar position="static">
                <Tabs value={selectedTab} onChange={handleTabChange} centered indicatorColor="secondary" textColor={"secondary"}>
                    <Tab label="View Messages"/>
                    <Tab label={"Send Message"}/>
                    <Tab label="Account Settings" />
                    <Tab label="Search Users" />

                </Tabs>
            </AppBar>

            <Paper style={{ padding: '16px', marginTop: '16px' }}>

                {selectedTab === 0 && <MessageList></MessageList>}
                {selectedTab === 1 && <MessageSend/>}
                {selectedTab === 2 && <AccountSettings/>}
                {selectedTab === 3 && <UserList/>}

            </Paper>

            <Button onClick={deleteToken} href={'/login'}>
                Logout
            </Button>
        </Container>
        </ThemeProvider>
    );
};

export default DashboardPage;