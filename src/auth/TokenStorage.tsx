export const saveToken = (accessToken: string) => {
    // Save the token to localStorage or another preferred storage method
    localStorage.setItem('accessToken', accessToken);
    console.log('Token saved:', accessToken);
};

export const getToken = (): string | null => {
    // Retrieve the token from localStorage or another preferred storage method
    return localStorage.getItem('accessToken');
};

export const deleteToken = () : any => {
    localStorage.clear()
}