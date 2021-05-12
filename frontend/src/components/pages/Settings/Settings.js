import React from 'react';
import './Settings.css'
import '../../assets/Section/Section.css';
import '../../assets/Button/Button.css'
import { Textfield } from '../../assets/Textfield/Textfield';
import { Button } from '../../assets/Button/Button';
import { FaSkull } from 'react-icons/fa';

const TEXT_FIELD_WIDTH = '300px';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      newPassword: '',
      currentPassword: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) { //updates state for input
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <>
        <div className='darkBg'>
          <div className='container settings'>
            <div>
              <h1 className='heading' style={{ 'text-align': 'center' }}>
                User settings
              </h1>
              <p className='home__sek-subtitle' style={{ color: 'white', 'text-align': 'center' }}>
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
                label='New password'
                name='newPassword'
                value={this.state.newPassword}
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
                extraStyles={{ 'margin-bottom': '75px' }} />
            </div>

            <div>
              <Button
                buttonStyle='btn--outline'
                onClick={() => { console.log('Pressed') }}
              >
                Submit changes
              </Button>
            </div>

            <br></br>
            <br></br>

            <div>
            <Button
                buttonStyle='btn--outline'
                extraStyles={{ 'margin-right': '30px' }}
                onClick={() => { console.log('Pressed 2') }}
              >
                Re-send verification email
              </Button>

              <Button
                buttonStyle='btn--outline'
                extraClasses='btn--outline-red'
                onClick={() => { console.log('Pressed 3') }}
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
