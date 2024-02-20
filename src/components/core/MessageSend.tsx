import React, { useState } from 'react';
import enums from "../../enums/enums";
import {Alert, Button, Snackbar, TextField} from "@mui/material";
import {getToken} from "../../auth/TokenStorage";

const MessageSendMenu = () => {
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');
    const [messageSent, setMessageSent] = useState(false)
    const [messageFailed, setMessageFailed] = useState(false)

    const sendMessage = async () => {
        const token = getToken(); // Make sure to define getToken function

        const messageSuccess = () => {
            setMessageSent(true); // Update state inside the event handler

            setTimeout(() => {
                setMessageSent(false); // Update state again after delay
            }, 4000); // Or any duration you prefer
        };

        const messageFailed = () => {
            setMessageFailed(true); // Update state inside the event handler

            setTimeout(() => {
                setMessageFailed(false); // Update state again after delay
            }, 4000); // Or any duration you prefer
        };


        const requestBody = new URLSearchParams();
        requestBody.append('message', message);
        requestBody.append('receiver', receiver);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Set content type to form-urlencoded
                'Authorization': `Bearer ${token}`
            },
            body: requestBody.toString() // Convert URLSearchParams object to string
        };

        try {
            const response = await fetch(enums.URL + enums.PORT + enums.SEND_MESSAGE, requestOptions);
            if (response.ok) {
                console.log('Message sent successfully');
                messageSuccess()
            } else {
                console.error('Failed to send message');
                messageFailed()
                // Handle error cases
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle network errors
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Snackbar open={messageSent} autoHideDuration={4000} anchorOrigin={{vertical:'top', horizontal:'center'}}>
                <Alert severity="success">Message Sent!</Alert>
            </Snackbar>
            <Snackbar open={messageFailed} autoHideDuration={4000} anchorOrigin={{vertical:'top', horizontal:'center'}}>
                <Alert severity="error">Failed to send message, check that you have a public key uploaded and that the recipient has one as well</Alert>
            </Snackbar>
            <TextField
                id="receiver"
                label="Receiver"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                style={{marginBottom: '15px'}}
            />
            <TextField
                id="message"
                label="Message"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{marginBottom: '15px'}}
            />
            <Button variant="contained" onClick={sendMessage}>Send Message</Button>
        </div>
    );
};

export default MessageSendMenu;