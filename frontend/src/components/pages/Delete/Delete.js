import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import React from 'react';
import firebase from 'firebase';
import APIHandler from '../../manage/api/APIHandler';

class Delete extends React.Component{
    constructor(props){
    super(props);
    this.state = {
        email : '',
        pwd : '',
        error : ''
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    

    handleChange(event) { //updates state for input
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    async deleteUser(){
        let answer = window.confirm('Are you sure you want to delete your account?');
        if (!answer) {
          return;
        }
    

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pwd)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;

          APIHandler.postRequest('http://127.0.0.1:5000/api/deleteUser', {
          user_id: localStorage.getItem('uid')
        }).then((response) =>  {
          if ('message' in response) {
            this.setState({ error: response.message });
  
          } else {
  
            console.log({'message' : "deleting user", 'test' : user.email} )
            user.delete().then( () => {
              console.log("User deleted - now clearing data")
              localStorage.clear()
              console.log("redirecting to home")
              window.location.href = "/home";
  
  
            }).catch((error) =>{
              console.log("Error occured - User has not been deleted from auth")
              this.setState({ error: error})
            })
          };
  
          }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log({'message' : errorMessage, 'code': errorCode}, 400)
          });
        });
        }


        




        
        //firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pwd)
        //const user = firebase.auth().currentUser;
        //console.log(user.email)
    
        
    /*
        if ('message' in response) {
          this.setState({ error: response.message });
        } else {
          user.delete().then( () => {
            localStorage.clear()
            window.location.href = "/home";
          }).catch((error) =>{
            console.log("Error occured - User has not been deleted from auth")
            this.setState({ error: error})
          })
        };*/
    

    

    render(){
        return(
            <div className="form">
                <div className="form-group">
                    <TextField
                        label='Enter your email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <TextField
                        label='Enter your password'
                        name='pwd'
                        type='password'
                        value={this.state.pwd}
                        onChange={this.handleChange} />
                </div>

                    <Button
                        buttonStyle='btn--outline'
                        extraClasses='settingsButton settingsButtonTop'
                        onClick={this.deleteUser}
                    >
                        Delete Account
                    </Button>
            </div>

        )
    }



}
export default Delete