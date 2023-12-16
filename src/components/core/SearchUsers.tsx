import React, {useEffect, useState} from 'react';
import {Button, List, ListItem, ListItemText} from '@mui/material';
import enums from "../../enums/enums";
import {getToken} from "../../auth/TokenStorage";

const fetchUsers = async (url: string): Promise<string[]> => {
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
            throw new Error(`Failed to fetch users. Status: ${response.status}`);
        }

        const responseData = await response.json();
        const users = responseData.users || [];

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const UserList: React.FC = () => {
    const [users, setUsers] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUserData = async (page: number) => {
        try {
            const usersUrl = `${enums.URL}${enums.PORT}${enums.FETCH_USERS}?page=${page}`;
            const fetchedUsers = await fetchUsers(usersUrl);

            setUsers(fetchedUsers);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
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
        fetchUserData(currentPage);
    }, [currentPage]);

    return (
        <div>
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div>
                    <List>
                        {users.map((user, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={user}/>
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

export default UserList;