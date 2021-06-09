import React from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';

function Logout() {
    localStorage.clear();
    return window.location.href = "/home";
}

export default Logout;