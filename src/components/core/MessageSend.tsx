import React, { useState } from 'react';
import enums from "../../enums/enums";
import {Alert, Autocomplete, Button, debounce, MenuItem, Snackbar, TextField} from "@mui/material";
import {getToken} from "../../auth/TokenStorage";

const MessageSendMenu = () => {
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');
    const [messageSent, setMessageSent] = useState(false)
    const [messageFailed, setMessageFailed] = useState(false)
    const [availableReceivers, setAvailableReceivers] = useState([])


    const fetchAvailableReceivers = async (query : string, limit : string) => {
        const authToken = getToken();

        const queryParams = new URLSearchParams({
            query: query,
            limit: limit
        });

        const url = enums.URL + enums.PORT + enums.SEARCH_USERS + '?' + queryParams;

        try {
            const response = await fetch(url,{
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            if (response.ok) {
                const data = await response.json();
                setAvailableReceivers(data.users);
            } else {
                console.error('Failed to fetch receivers');
            }
        } catch (error) {
            console.error('Error fetching receivers:', error);
        }
    };

    const handleInputChange = debounce((query) => {
        if (!query!= null){
            fetchAvailableReceivers(query, "5")
                .then(() => {
                    console.log('Fetch successful'); // Log success message
                })
                .catch((error) => {
                    console.error('Error fetching receivers:', error); // Log error message
                });
        }

    }, 100);

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
            <Autocomplete
                id="receiver"
                options={availableReceivers}
                freeSolo
                value={receiver}
                onChange={(_, newValue) => {
                    if (!newValue) {
                        setReceiver('');
                    } else {
                        setReceiver(newValue as string);
                    }
                }}
                onInputChange={(e, value) => handleInputChange(value)} // Trigger handleInputChange on every input change
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Receiver"
                        style={{ marginBottom: '20px', width: '300px' }} // Adjust width as needed
                    />
                )}
            />
            <TextField
                id="message"
                label="Message"
                multiline
                rows={15}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{marginBottom: '20px', width:'800px' ,minHeight: '300px'}}
            />
            <Button variant="contained" onClick={sendMessage}>Send Message</Button>
        </div>
    );
};

export default MessageSendMenu;