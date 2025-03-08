import axios from "axios";

const apiPost = axios.create({
    baseURL: 'https://api.kungfutech.edu.vn/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiPost;
