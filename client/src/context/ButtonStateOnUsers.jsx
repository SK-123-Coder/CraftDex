import { createContext, useState, useEffect } from "react";

export const ButtonStateOnUsersContext = createContext();  // Create context for button state

export const ButtonStateOnUsersProvider = ({ children }) => {
    const API = import.meta.env.VITE_API_URL;

    const [ state, setState ] = useState('/signup');  // It is used to manage the state of the "Get Started" button, which determines whether it should direct users to the signup page or the tools page based on their authentication status.

    useEffect(() => {  // This useEffect hook performs a similar authentication check as the previous one, but it directly updates the state that controls the "Get Started" button's destination. If the user is authenticated, it sets the state to "/tools", allowing the button to navigate to the tools page. If not authenticated, it keeps the state as "/signup", directing users to the signup page when they click the button. This ensures that the button's behavior is consistent with the user's authentication status.
    const checkButtonState = async () => {
        try {
        const res = await fetch(`${API}/api/user/userVerify`, {
            method: "GET",
            credentials: "include"
        });

        if (res.ok) {
            const data = await res.json();
            if (data) {
            setState('/tools');
            }
        }
        } catch (error) {
        console.error("Auth check failed");
        }
    }

    checkButtonState();

    }, []);

    return(
        <ButtonStateOnUsersContext.Provider value={{ state, setState }}>
            {children}
        </ButtonStateOnUsersContext.Provider>
    )
};