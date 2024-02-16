import React, { useState } from 'react';
import {getToken} from "@chakra-ui/react";
import enums from "../../enums/enums";
import {Button, TextField} from "@mui/material";

const MessageSendMenu = () => {
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        // @ts-ignore
        const token = getToken()
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message, receiver })
        };
        try {
            const response = await fetch(enums.URL + enums.PORT + enums.SEND_MESSAGE, requestOptions);
            if (response.ok) {
                console.log('Message sent successfully');
                alert('Message sent!')
            } else {
                console.error('Failed to send message');
                alert('Failed to send message, check that you have a public key uploaded and that the recipient has one as well')
                // Handle error cases
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle network errors
        }
    };

    return (
        <div style={{display: 'flex',flexDirection : 'column', alignItems : 'center'}}>

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