import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useState, useContext } from 'react';

function PrivateRoutes({ component: Component, ...rest }) {

    const { user } = useContext(AuthContext);

    return (<Route {...rest} render={props => (
        user? <Component {...props} /> : <Navigate to="/login" />
    )} />)
}

export default PrivateRoutes;
