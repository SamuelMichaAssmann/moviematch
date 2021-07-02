import React from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import firebase from 'firebase';

function Logout() {
    firebase.auth().signOut();
    localStorage.clear();
    return window.location.href = "/home";
}

export default Logout;