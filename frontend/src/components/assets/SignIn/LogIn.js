import React from "react";
import './Login.css';
import { Button } from '../Button/Button';
import { observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';

import firebase from "firebase/app";
import { BrowserRouter as Redirect } from 'react-router-dom';





export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { //use this to constantly update input fields
            email: '',
            password: ''

        }

        this.logInFirebase = this.logInFirebase.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetform = this.resetForm.bind(this);
    }

    handleChange(event) { //updates state for input
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }
    resetForm() { //resets form
        this.setState({
            password: '',
            email: ''

        })
    }
    /*
        User SignIN - sign in - verified ? signIn : signOut (need to be logged in first to see if verified, so he is signed out if not)
    */
    logInFirebase() {

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                //Signed in
                var user = userCredential.user;
                console.log("Signed IN");
                //redirect to home or desired component


                if (!user.emailVerified) {
                    console.log("User is not verified");
                    firebase.auth().signOut().then(() => {
                        // Sign-out successful.
                        console.log("Signed out");
                    }).catch((error) => {
                        alert(error);
                        // An error happened.
                    });
                }
                console.log("Redirecting");
                //<Redirect to='/'></Redirect> not working now



            })
            .catch((error) => {
                this.resetform();
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage + "\n" + { errorCode })
            });


    };



    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">SignIn</div>
                <div className="content">
                    <div className="form">
                        <div className="form-group">
                            <div className="input-div">
                                <TextField
                                    id="outlined-basic"
                                    label="Enter the username"
                                    name="email"
                                    variant="outlined"
                                    value={this.state.email}
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-div">
                                <TextField
                                    id="outlined-basic"
                                    label="Enter the password"
                                    name="password"
                                    variant="outlined"
                                    type="password"
                                    color="primary"
                                    value={this.state.password}
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                        <Button
                            buttonSize='btn--wide'
                            buttonColor='blue'
                            onClick={this.logInFirebase}>
                            Login
                  </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default observer(Login);