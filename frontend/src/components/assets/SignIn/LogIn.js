import React from "react";
import './SignIn.css';
import { Button } from '../Button/Button';
import { observer } from 'mobx-react';
import { Textfield } from '../../assets/Textfield/Textfield';
import firebase from "../../../firebase"; //firebase globally available

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
                window.location.href = '/home';

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
                            <Textfield
                                label='Enter the username'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <Textfield
                                label='Enter the password'
                                name='password'
                                type='password'
                                value={this.state.password}
                                onChange={this.handleChange} />
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