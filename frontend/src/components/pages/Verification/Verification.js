import React from 'react';
import './Verification.css'
import { Button } from '../Button/Button';
import * as uM from '../../../userManager' 

class Verification extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          send = false
      }
      this.resendMail = this.resendMail.bind(this);
      };

      resendMail(){
        const data = {
            email: uM.getUserMail() //not needed - token is required!
            };
      
          let response = await APIHandler.postRequest('http://127.0.0.1:5000/api/resendV', data);
          console.log(response)
      }


      render(){
        return(

            <div className='verification'>
                <div>
                "Please verify yourself in order to login"
                </div>
                <div>
                    <Button
                    buttonSize='btn--wide'
                    buttonColor='blue'
                    onClick={this.resendMail}
                    >Resend verification-mail</Button>
                </div>
                <div>
                    {this.state.send ? "Verification-Mail send" : ""}
                </div>
                
                
            </div>



        )

    }



    }

    