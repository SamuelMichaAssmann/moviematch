import React from "react";
import './SignIn.css';
import { Button } from '../Button/Button';
import { observer } from 'mobx-react';
import { Textfield } from '../../assets/Textfield/Textfield';
import firebase from "../../../firebase"; //firebase globally available
import APIHandler from '../../manage/api/APIHandler'
import * as uM from '../../../userManager'
import Loading from '../Loading/Loading'

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { //use this to constantly update input fields
            email: '',
            password: '',
            loading: false,
            successMessage: '',
            error: ''
        }

        this.logInFirebase = this.logInFirebase.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetform = this.resetForm.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
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

    async resetPassword() {
        if (this.state.email == '') {
            this.setState({ successMessage: '', error: 'Please enter a valid email' });
            return;
        }

        this.setState({ successMessage: '', error: '', loading: true });

        const response = await APIHandler.postRequest('http://127.0.0.1:5000/api/resetPwd', {
          email: this.state.email
        });
    
        if ('message' in response) {
          this.setState({ loading: false, successMessage: '', error: response.message });
        } else {
          this.setState({ loading: false, successMessage: 'A password reset email has been sent to you!', error: '' });
        }
      }

    async logInFirebase() {
        const data = {
            email: this.state.email,
            password: this.state.password
        };

        this.setState({ successMessage: '', error: '', loading: true });
        let response = await APIHandler.postRequest('http://127.0.0.1:5000/api/signin', data);

        if ('message' in response) {
            this.setState({ loading: false, successMessage: '', error: response.message });
            return;
        }
        
        var uid = response['id'];
        localStorage.setItem('uid', uid);
        localStorage.setItem('email', this.state.email);
        localStorage.setItem('token', response['token']);
        localStorage.setItem('refreshToken', response['refreshToken']);
        localStorage.setItem('loginState', 'true');
        this.setState({ loading: false });
        window.location.href = '/home';




        //console.log("Redirecting");
        //window.location.href = '/home';

        /*

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
                

            })
            .catch((error) => {
                this.resetform();
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage + "\n" + { errorCode })
            });*/
    };

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                {this.state.loading ? <Loading /> :
                    <div>
                        <div className="header">Log in</div>
                        <div className="content">
                            <div className="form">
                                <div className="form-group">
                                    <Textfield
                                        label='Enter your email'
                                        name='email'
                                        value={this.state.email}
                                        onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <Textfield
                                        label='Enter your password'
                                        name='password'
                                        type='password'
                                        value={this.state.password}
                                        onChange={this.handleChange} />
                                </div>
                                <Button
                                    buttonSize='btn--wide'
                                    buttonColor='blue'
                                    extraStyles={{ 'marginBottom': '40px' }}
                                    onClick={this.logInFirebase}
                                >
                                    Log in
                                </Button>

                                {
                                    (this.state.successMessage != '')
                                        ? <p className='settingsSuccess'>{this.state.successMessage}</p>
                                        : null
                                }

                                {
                                    (this.state.error != '')
                                        ? <p className='settingsError'>{this.state.error}</p>
                                        : null
                                }

                                <Button
                                    buttonSize='btn--wide'
                                    buttonColor='blue'
                                    onClick={this.resetPassword}
                                >
                                    Reset password
                                </Button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default observer(Login);