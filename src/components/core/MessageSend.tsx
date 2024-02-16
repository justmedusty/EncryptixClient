import React, { useState } from 'react';
import enums from "../../enums/enums";
import {Button, TextField} from "@mui/material";
import {getToken} from "../../auth/TokenStorage";

const MessageSendMenu = () => {
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        const token = getToken(); // Make sure to define getToken function

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
                alert('Message sent!');
            } else {
                console.error('Failed to send message');
                alert('Failed to send message, check that you have a public key uploaded and that the recipient has one as well');
                // Handle error cases
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle network errors
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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