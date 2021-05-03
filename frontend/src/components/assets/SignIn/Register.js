import React from "react";
import './Login.css';
import { observer } from 'mobx-react';

import firebase from "../../../firebase"; //firebase globally available


import { Button } from '../Button/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
  },
  cssLabel: {
    color: 'white !important'
  },

});



export class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = { //use this to constantly update input fields
      email: '',
      password: '',
      passwordConfirmation: '',
      confirmation: false
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
    console.log({ name } + "   " + { value })
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
 
  registerFirebase() { //register new user with firebase.auth()




    if (this.state.password === this.state.passwordConfirmation) {
      this.setState({ confirmation: true })
    }


    if (this.state.confirmation === true) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
          //Signed in
          var user = userCredential.user;
          user.sendEmailVerification();
          //redirect to VerificationSite?
          alert("Success! You are now a registered member of MovieMatch. Please check your mailbox to verify your adress");
          this.resetForm();
        })
        .catch((error) => {
          var errorcode = error.code;
          var errorMessage = error.message;
          alert(errorMessage + "\nPlease try again.");
          this.resetForm();

        });
    }
    else {
      alert("Passwords did not match");
      this.resetForm();
      console.log("resetRunning");

    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div>
            <div className="form">
              <div className="form-group">
                <div className="input-div">
                  <TextField
                    required type="email"
                    id="outlined-basic"
                    label="Enter your email-adress"
                    name="email"
                    variant="outlined"
                    InputLabelProps={{ classes: { root: classes.cssLabel } }}
                    InputProps={{ classes: { notchedOutline: classes.notchedOutline } }}
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-div">
                  <TextField
                    required type="password"
                    id="outlined-basic"
                    label="Enter your password"
                    name="password"
                    variant="outlined"
                    InputLabelProps={{ classes: { root: classes.cssLabel } }}
                    InputProps={{ classes: { notchedOutline: classes.notchedOutline } }}
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-div">
                  <TextField
                    required type="password"
                    id="outlined-basic"
                    label="Confirm your password"
                    name="passwordConfirmation"
                    variant="outlined"
                    InputLabelProps={{ classes: { root: classes.cssLabel } }}
                    InputProps={{ classes: { notchedOutline: classes.notchedOutline } }}
                    onChange={this.handleChange}
                    value={this.state.passwordConfirmation}
                  />
                </div>
              </div>
              <div>
                <Button
                  buttonSize='btn--wide'
                  buttonColor='blue'
                  onClick={this.registerFirebase}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default observer(withStyles(styles)(Register));