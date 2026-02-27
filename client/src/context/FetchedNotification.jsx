import { createContext, useState, useEffect } from "react";

export const FetchedNotificationContext = createContext();  // Create context for notifications

export const FetchedNotificationProvider = ({ children }) => {

    const API = import.meta.env.VITE_API_URL;
    
    const [notifications, setNotifications] = useState([]);  // State to hold notifications
    const [loading, setLoading] = useState(true);  // State to track loading status

    useEffect(() => {  // Fetch notifications from the server
    const fetchNotifications = async () => {
        try {
        const res = await fetch(`${API}/api/auth/getNotification`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to fetch");
        }

        setNotifications(data.data);
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    fetchNotifications();
    }, []);

    if (loading) {
    return null;
    }

    return(
        <FetchedNotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </FetchedNotificationContext.Provider>
    )
}