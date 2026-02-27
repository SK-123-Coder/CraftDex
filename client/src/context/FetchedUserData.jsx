import { createContext, useState, useEffect } from "react";

export const FetchedUserDataContext = createContext();  // Create context for user data

export const FetchedUserDataProvider = ({ children }) => {
    const API = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {  // Fetch user data on mount
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/api/auth/user`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          setUser(null);
          return;
        }

        if (!res.ok) {
          throw new Error(`Auth error: ${res.status}`);
        }

        const data = await res.json();
        setUser(data);

      } catch (err) {
        console.error("Auth fetch failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return null;

  return (
    <FetchedUserDataContext.Provider value={{ user, setUser }}>
      {children}
    </FetchedUserDataContext.Provider>
  );
};