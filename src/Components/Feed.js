import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { database } from '../firebase';
import UploadFile from './UploadFile';
import Posts from './Posts';
import Navbar from './Navbar';

function Feed() {

    // the user here we got is from auth, so only contains userId
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState('');


    useEffect(() => {
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
            setUserData(snapshot.data());
        })

        return () => { unsub() }
    }, [userData])
    // if a new user logs in then we need to get new user data as well
    //console.log("User data:", userData);

    return (
        <div>
            <Navbar userData={userData}/>
            <div>
                <UploadFile user={userData} />
                <Posts userData={userData} />
            </div>
        </div >
    )
}

export default Feed;