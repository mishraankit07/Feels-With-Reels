import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

function Feed(){

    const {logout}=useContext(AuthContext);

    let handleLogout=async()=>{
        try{
            await logout();
        }

        catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <h1> Hi,Welcome to feed </h1>
            <button onClick={handleLogout}> Logout </button>
        </div>
    )
}

export default Feed;