import axios from 'axios';
import { getOrCreateGuestId } from './authUuid';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
});

instance.interceptors.request.use(
    (config) => {
        const guestId = getOrCreateGuestId();
        
        config.headers['X-Guest-UUID'] = guestId;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;