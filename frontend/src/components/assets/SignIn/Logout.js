import firebase from 'firebase';

function Logout() {
    try {
        firebase.auth().signOut();
    } catch {
        // If no Firebase authorization was initialized previously, clear local storage only.
    }

    localStorage.clear();
    window.location.href = '/home';
    return '';
}

export default Logout;