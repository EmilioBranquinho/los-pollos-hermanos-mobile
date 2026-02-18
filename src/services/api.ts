import axios from 'axios'

const api = axios.create({
    // baseURL: "http://192.168.43.208:9000",
    baseURL: "https://api-los-pollos-hermanos.onrender.com"
});

export { api }