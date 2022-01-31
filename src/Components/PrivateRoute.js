import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';

function PrivateRoute({children}) {

    console.log("children:",children);
    const { user } = useContext(AuthContext);
    // if user is not NULL then return the functional component passed as children which is Feed
    // else if the user is not loged in we navigate to the login page 
    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
