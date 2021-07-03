import React from "react";
import './SignIn.css';
import { observer } from 'mobx-react';
import { Textfield } from '../../assets/Textfield/Textfield';
import { Button } from '../Button/Button';
import APIHandler from '../../manage/api/APIHandler';
import Loading from '../Loading/Loading';


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
      passwordConfirmation: '',
      email: ''
    })
  }

  /*
   If pwdconfirmation does not match : Cancel
   pwdconfirmation does match : login and send verificationmail - user is able to log in after verification
  */

  async registerFirebase() { //register new user with firebase.auth()

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


    /*
    const args = {
      email: this.state.email,
      password: this.state.password  
    };

    const response = await axios.post('http://localhost:5000/api/signup', args);
    console.log(response);
    */

    /*
        if (this.state.confirmation == true) {
          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
              //Signed in
              var user = userCredential.user;
              user.sendEmailVerification();
              //redirect to VerificationSite?
              alert("Success! You are now a registered member of MovieMatch. Please check your mailbox to verify your adress");
              this.resetForm();
              
              window.location.href = '/sign-up';
            })
            .catch((error) => {
              var errorMessage = error.message;
              alert(errorMessage + "\nPlease try again.");
              this.resetForm();
    
            });
        }
        else {
          alert("Passwords did not match");
          this.resetForm();
          console.log("resetRunning");
    
         }*/
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