const ENUMS = {
    LOGIN: '/app/login',
    FETCH_ALL_MESSAGES: '/app/messages/fetchAll',
    SEND_MESSAGE : '/app/messages/send',
    FETCH_MESSAGES_FROM_USER : '/app/messages/fetchByUser',
    SIGNUP: '/app/signup',
    CHANGE_PASSWORD: '/app/profile/changePassword',
    CHANGE_USERNAME: '/app/profile/changeUserName',
    DELETE_ACCOUNT: '/app/profile/deleteAccount',
    GET_MY_KEY : '/app/key/getMyPublicKey',
    DELETE_MY_KEY : '/app/key/deleteMyPublicKey',
    UPLOAD_NEW_KEY: '/app/key/upload',
    SEARCH_USERS: '/app/users/search',
    FETCH_USERS: '/app/users/fetch',
    URL:'http://127.0.0.1',
    PORT:':6969'



    // Add more endpoints as needed
};

export default ENUMS;