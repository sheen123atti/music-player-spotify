import axios from 'axios';// after installing axios

const authEndPoint = "https://accounts.spotify.com/authorize?";
const clientID = "d32a8ad9d82f44b3b09d30b692a0d46c";
const redirectUri = "http://localhost:3000/";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndPoint = `${authEndPoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

// &scope=${scopes.join("%20")}

// after installing axios
const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/" // every api call u use to make with this api client will have baseurl as this and everything is appended to it
});

// for token --> saves token as permanent header and with every api call made th' api client 
// this will append the header inside that so we don't have to add it again and again
export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function(config){
        config.headers.Authorization = "Bearer " + token;
        return config;
    });
};

export default apiClient;