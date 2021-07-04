import React from "react";
import './SignIn.css';
import { Button } from '../Button/Button';
import { observer } from 'mobx-react';
import { Textfield } from '../../assets/Textfield/Textfield';
import APIHandler from '../../manage/api/APIHandler';
import Loading from '../Loading/Loading';

// The Login component handles the user log-in section.
export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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

    /**
     * Update the state when a text field has been changed.
     * @param {Object} event Event object containing info on the change.
     */
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    /**
     * Reset the email and password input fields.
     */
    resetForm() {
        this.setState({
            password: '',
            email: ''
        })
    }

    /**
     * Request a password reset email.
     */
    async resetPassword() {
        if (this.state.email === '') {
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

    /**
     * Log the user in using Firebase.
     */
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
    }

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
                                    (this.state.successMessage !== '')
                                        ? <p className='settingsSuccess'>{this.state.successMessage}</p>
                                        : null
                                }

                                {
                                    (this.state.error !== '')
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