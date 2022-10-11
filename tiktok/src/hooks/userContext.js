import { createContext, useContext, useState } from "react";

const UserContext = createContext();
const UserUpdateContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function useUserUpdateContext() {
    return useContext(UserUpdateContext);
}

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    
    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )
}