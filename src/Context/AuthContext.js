import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

// creating a global store
export const AuthContext = React.createContext();

export function AuthProvider({children}) {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    // use effect of type component did mount
    // attaching a listener to see if auth token state has changed or not
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        })

        // when component will unmount is called
        // this way we'll be able to remove the listner
        return () => {
            unsub();
        }
    }, [])

    const store = {
        user,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}