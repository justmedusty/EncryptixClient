import React, {useEffect, useState} from 'react';
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {Message} from "../../data/Interfaces";
import enums from "../../enums/enums";
import {useNavigate} from "react-router-dom";
import {getToken} from "../../auth/TokenStorage";

interface MessageListProps {
    // No need to pass anything here
}

const MessageList: React.FC<MessageListProps> = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const handleDownload = async (encryptedMessage: Uint8Array | null, timeSent: number[], senderUserName: string) => {
        if (!encryptedMessage) {
            console.error('Invalid encrypted message');
            return;
        }

        try {
            // Convert Uint8Array to Blob
            const blob = new Blob([encryptedMessage], {type: 'application/octet-stream'});

            // Rest of the function remains the same...
            const timestampString = timeSent.join('-');
            const fileName = `message_${timestampString}_${senderUserName}.gpg`;

            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error handling encrypted message:', error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const authToken = getToken();

                if (!authToken) {
                    navigate('/login');
                    return;
                }

                const response = await fetch(enums.URL + enums.PORT + enums.FETCH_ALL_MESSAGES, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                const responseData = await response.json();

                // Check if the "Messages" array exists in the response
                const fetchedMessages = responseData.Messages || [];

                if (!Array.isArray(fetchedMessages)) {
                    console.error('Invalid data format: Expected an array of messages');
                    return;
                }

                setMessages(fetchedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <List>
            {loading ? (
                <p>Loading messages...</p>
            ) : (
                messages.map((message) => (
                    <ListItem key={message.timeSent.join('-')}>
                        <ListItemText
                            primary={`Sent at: ${(message.timeSent)}`}
                            secondary={`Sender: ${message.senderUserName}`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="download"
                                onClick={() => handleDownload(message.encryptedMessage, message.timeSent, message.senderUserName)}
                            >
                                <CloudDownloadIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))
            )}
        </List>
    );
};

export default MessageList;