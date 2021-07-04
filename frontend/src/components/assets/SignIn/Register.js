import React from "react";
import './SignIn.css';
import { observer } from 'mobx-react';
import { Textfield } from '../../assets/Textfield/Textfield';
import { Button } from '../Button/Button';
import APIHandler from '../../manage/api/APIHandler';
import Loading from '../Loading/Loading';

// The Register component handles the user registration section.
export class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = { //use this to constantly update input fields
      email: '',
      password: '',
      passwordConfirmation: '',
      confirmation: false,
      loading: false,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.registerFirebase = this.registerFirebase.bind(this);

  }

  /**
   * Update the state when a text field has been changed.
   * @param {Object} event Event object containing info on the change.
   */
  handleChange(event) { //updates state for input
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  /**
   * Reset the password, repeat password and email input fields.
   */
  resetForm() {
    this.setState({
      password: '',
      passwordConfirmation: '',
      email: ''
    })
  }

  /**
   * Register a new account in Firebase.
   */
  async registerFirebase() {
    if (this.state.password.length < 6) {
      this.setState({ error: 'Your password must be at least 6 characters long.' });
      return;
    }

    if (this.state.password !== this.state.passwordConfirmation) {
      this.setState({ error: 'Your passwords don\'t match!' });
      return;
    }

    const data = {
      email: this.state.email,
      password: this.state.password
    };

    this.setState({ loading: true, error: '' });
    let response = await APIHandler.postRequest('http://127.0.0.1:5000/api/signup', data);

    if ('message' in response) {
      this.setState({ loading: false, error: response.message });
      return;
    }

    localStorage.setItem('loginState', 'true');
    localStorage.setItem('uid', response['uid']);
    localStorage.setItem('email', response['email']);
    localStorage.setItem('token', response['token']);
    localStorage.setItem('refreshToken', response['refreshToken']);
    this.setState({ loading: false });
    window.location.href = '/tutorial';
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        {this.state.loading ? <Loading /> :
          <div>
            <div className="header">Register</div>
            <div className="content">
              <div className="form">
                <div className="form-group">
                  <Textfield
                    needed="true"
                    type="email"
                    label='Enter your email'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <Textfield
                    type="password"
                    label='Enter your password'
                    name='password'
                    value={this.state.password}
                    onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <Textfield
                    type="password"
                    label='Confirm your password'
                    name='passwordConfirmation'
                    value={this.state.passwordConfirmation}
                    onChange={this.handleChange} />
                </div>
                <div>
                  <Button
                    buttonSize='btn--wide'
                    buttonColor='blue'
                    onClick={this.registerFirebase}
                  >
                    Register
                  </Button>
                </div>

                {
                    (this.state.error !== '')
                        ? <p className='settingsError' style={{'marginTop': '40px'}}>{this.state.error}</p>
                        : null
                }
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}


export default observer(Register);