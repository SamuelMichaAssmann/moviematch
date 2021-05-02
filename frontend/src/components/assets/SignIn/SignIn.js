import React from 'react';
import './SignIn.css';
import TextField from '@material-ui/core/TextField';

function setInputValue (property, val){
    val = val.trim();
    if (val.length > 20){
        return;
    }
}

function SignIn() {
    return (
        <>
            <div className='home__sek-section'>
                <div className='container'>
                    <form noValidate autoComplete="off">
                        <div className='home__sek-text-wrapper'>
                            <TextField id="outlined-basic" label="Enter the username" variant="outlined" />
                        </div>
                        <div>
                            <TextField id="outlined-basic" label="Enter the password" variant="outlined" type="password" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;