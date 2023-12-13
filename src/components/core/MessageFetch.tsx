import React, {useEffect, useState} from 'react';
import {IconButton, List, ListItem, ListItemSecondaryAction} from '@mui/material';
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

    const handleDownload = (file: Blob, fileName: string) => {
        // Create object URL
        const blobUrl = URL.createObjectURL(file);

        // Create download link
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;

        // Append link to the DOM, trigger click, and remove link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke object URL to free up resources
        URL.revokeObjectURL(blobUrl);
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

                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }

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
                    <ListItem key={message.id}>
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="download"
                                onClick={() => handleDownload(message.file, `message_${message.id}.gpg`)}
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