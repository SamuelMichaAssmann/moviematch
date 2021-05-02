import React from 'react';
import './SignIn.css';
import UserStore from '../stores/UserStore';
import { BrowserRouter as Redirect } from 'react-router-dom';

function Logout() {
    UserStore.isLoggedIn = false;
    return <Redirect to="/" />;
}

export default Logout;