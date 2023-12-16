
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import enums from "../../enums/enums"; // Replace with the correct path
import { useNavigate } from 'react-router-dom';
import {getToken} from "../../auth/TokenStorage";
import {Button} from "@mui/material";

interface Message {
    timeSent: number[];
    senderUserName: string;
    encryptedMessage: string;
}

const fetchMessages = async (url: string): Promise<Message[]> => {
    try {
        const authToken = getToken();

        if (!authToken) {
            throw new Error('Authentication token not available');
        }

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch messages. Status: ${response.status}`);
        }

        const responseData = await response.json();
        const messages = responseData.Messages || [];

        if (!Array.isArray(messages)) {
            throw new Error('Invalid data format: Expected an array of messages');
        }

        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

const MessageList: React.FC = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const handleDownload = (base64EncodedMessage: string, timeSent: number[], senderUserName: string) => {
        try {
            if (!base64EncodedMessage) {
                throw new Error('Invalid Base64-encoded message');
            }

            // Decode Base64 to binary data
            const binaryData = atob(base64EncodedMessage);

            // Create Uint8Array from binary data
            const uint8Array = new Uint8Array(binaryData.length);
            for (let i = 0; i < binaryData.length; i++) {
                uint8Array[i] = binaryData.charCodeAt(i);
            }

            // Create Blob with specific MIME type
            const blob = new Blob([uint8Array]);

            // Create a timestamp string
            const timestampString = timeSent.join('-');

            // Create a unique filename
            const fileName = `message_${timestampString}_${senderUserName}.gpg`;

            // Create download link
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;

            // Append link to the body and trigger a click
            document.body.appendChild(link);
            link.click();

            // Remove the link from the body
            document.body.removeChild(link);

            // Revoke the object URL to free up resources
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error handling Base64-encoded message:', error);
        }
    };

    const fetchMessageData = async (page: number) => {
        try {
            const messagesUrl = `${enums.URL}${enums.PORT}${enums.FETCH_ALL_MESSAGES}?page=${page}`;
            const fetchedMessages = await fetchMessages(messagesUrl);

            setMessages(fetchedMessages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchMessageData(currentPage);
    }, [currentPage]);

    return (
        <div>
            {loading ? (
                <p>Loading messages...</p>
            ) : (
                <div>
                    <List>
                        {messages.map((message) => (
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
                        ))}
                    </List>
                    <div>
                        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Previous Page
                        </Button>
                        <Button onClick={handleNextPage}>Next Page</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageList;