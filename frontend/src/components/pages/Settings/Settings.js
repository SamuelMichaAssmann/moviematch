import React from 'react';
import './Settings.css'
import '../../assets/Section/Section.css';
import '../../assets/Button/Button.css'
import { Textfield } from '../../assets/Textfield/Textfield';
import { Button } from '../../assets/Button/Button';
import APIHandler from '../../manage/api/APIHandler';
import { FaSkull } from 'react-icons/fa';

const TEXT_FIELD_WIDTH = '300px';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      age: '',
      currentPassword: '',
      successMessage: '',
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.resendVerificationEmail = this.resendVerificationEmail.bind(this);
    this.resetUserData = this.resetUserData.bind(this);
  }

  handleChange(event) { //updates state for input
    const target = event.target;
    const name = target.name;
    const value = (name == 'age') ? target.value.replace(/\D/, '') : target.value; // Only numbers for age.

    this.setState({
      [name]: value
    });
  }

  async submitChanges() {
    this.setState({ successMessage: '', error: '' });

    const response = await APIHandler.postRequest('http://127.0.0.1:5000/api/changeUserData', {
      email: localStorage.getItem('email'),
      password: this.state.currentPassword,
      user_id: localStorage.getItem('uid'),
      username: this.state.username,
      age: this.state.age
    });

    if ('message' in response) {
      this.setState({ error: response.message });
    } else {
      this.setState({ successMessage: 'Your user settings were changed successfully.', error: '' });
    }
  }

  async resendVerificationEmail() {
    this.setState({ successMessage: '', error: '' });

    const response = await APIHandler.postRequest('http://127.0.0.1:5000/api/resendVerificationEmail', {
      token: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken')
    });

    if ('message' in response) {
      this.setState({ error: response.message });
    } else {
      this.setState({ successMessage: 'A verification email has been sent to you!', error: '' });

      // Store new tokens if they had to be refreshed.
      if ('newToken' in response && response.newToken != '') {
        localStorage.setItem('token', response.newToken);
      }
      if ('newRefreshToken' in response && response.newRefreshToken != '') {
        localStorage.setItem('refreshToken', response.newRefreshToken);
      }
    }
  }

  async resetUserData() {
    let answer = window.confirm('Are you sure you want to reset your matching and group data?');
    if (!answer) {
      return;
    }
    
    this.setState({ successMessage: '', error: '' });

    const response = await APIHandler.postRequest('http://127.0.0.1:5000/api/resetUserData', {
      user_id: localStorage.getItem('uid')
    });

    if ('message' in response) {
      this.setState({ error: response.message });
    } else {
      this.setState({ successMessage: 'Your data has been successfully reset.', error: '' });
    }
  }

  render() {
    return (
      <>
        <div className='darkBg'>
          <div className='container settings'>
            <div>
              <h1 className='heading' style={{ 'textAlign': 'center' }}>
                User settings
              </h1>
              <p className='home__sek-subtitle' style={{ color: 'white', 'textAlign': 'center' }}>
                Here you can change various user profile settings.
              </p>
            </div>

            <div>
              <Textfield
                label='Username'
                name='username'
                value={this.state.username}
                onChange={this.handleChange}
                width={TEXT_FIELD_WIDTH} />
              <Textfield
                label='Email'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                width={TEXT_FIELD_WIDTH} />
              <Textfield
                label='Age'
                name='age'
                value={this.state.age}
                onChange={this.handleChange}
                width={TEXT_FIELD_WIDTH} />

              <br></br>
              <br></br>

              <Textfield
                label='Current password'
                name='currentPassword'
                value={this.state.currentPassword}
                onChange={this.handleChange}
                width={TEXT_FIELD_WIDTH}
                type='password'
                extraStyles={{ 'marginBottom': '75px' }} />
            </div>

            <div className='settingsButtonDiv'>
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
                buttonStyle='btn--outline'
                extraClasses='settingsButton settingsButtonTop'
                onClick={this.submitChanges}
              >
                Submit changes
              </Button>

              <Button
                buttonStyle='btn--outline'
                extraClasses='settingsButton settingsButtonBottom'
                onClick={this.resendVerificationEmail}
              >
                Re-send verification email
              </Button>
            </div>

            <br></br>
            <br></br>

            <div className='settingsButtonDiv'>
              <Button
                buttonStyle='btn--outline'
                extraClasses='btn--outline-red settingsButton settingsButtonTop'
                onClick={this.resetUserData}
              >
                Reset data
              </Button>

              <Button
                buttonStyle='btn--outline'
                extraClasses='btn--outline-red settingsButton settingsButtonBottom'
                onClick={() => { console.log('Pressed 4') }}
              >
                <FaSkull /> Delete account <FaSkull />
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Settings;
