import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // get user data from localStorage when starting
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        console.log("AuthContext user updated:", user);
    }, [user]);


    const login = (userData) => {
        // Save user in state and localStorage
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("authUser", user);
        
    };

    const logout = () => {
        // delete user data
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
