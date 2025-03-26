import { useContext } from "react";
import { UserContext } from "../../types/UserTypes";

// export const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [state, userDispatch] = useReducer(userReducer, { user: null, error: null }); // התחל עם מצב null

//     return (
//         <UserContext value={{ user: state.user, userDispatch }}>
//             {children}
//         </UserContext>
//     );
// };

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};