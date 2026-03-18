import { v4 as uuidv4 } from 'uuid';

const GUEST_ID_KEY = 'kmua_guest_id';
const EXPIRY_MS = 1 * 60 * 60 * 1000;

export const getOrCreateGuestId = () => {
    const itemStr = localStorage.getItem(GUEST_ID_KEY);
    const now = new Date().getTime();

    if (itemStr) {
        try {
            const item = JSON.parse(itemStr);
            if (item && item.expiry && now < item.expiry) {
                return item.value;
            }
        } catch (error) {
            console.warn("KMUA: Invalid or old guest_id format. Resetting...");
        }
        localStorage.removeItem(GUEST_ID_KEY);
    }

    const guestId = uuidv4();
    const itemToStore = {
        value: guestId,
        expiry: now + EXPIRY_MS,
    };

    localStorage.setItem(GUEST_ID_KEY, JSON.stringify(itemToStore));
    return guestId;
};