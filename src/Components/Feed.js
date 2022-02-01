import React, { useState,useContext,useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { database } from '../firebase';
import UploadFile from './UploadFile';

function Feed() {

    // the user here we got is from auth, so only contains userId
    const { user, logout } = useContext(AuthContext);
    const [userData,setUserData]=useState('');

    useEffect(()=>{
        const unsub=database.users.doc(user.uid).onSnapshot((snapshot)=>{
            setUserData(snapshot.data());
        })

        return ()=>{unsub()}
    },[userData])
    // if a new user logs in then we need to get new user data as well

    let handleLogout = async () => {
        try {
            await logout();
        }

        catch (err) {
            console.log(err);
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div className="comp" style={{ width: "50%" }}>
                <h1> Hi,Welcome to feed </h1>
                <button onClick={handleLogout}> Logout </button>
                <UploadFile user={userData}/>
            </div>
        </div>
    )
}

export default Feed;