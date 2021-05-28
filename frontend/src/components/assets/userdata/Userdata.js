import React from 'react';

function Userdata() {
  return (
!    <>
    <div className='darkBg'>
          <div className='container settings'>
            <div>
              <h1 className='heading' style={{ 'text-align': 'center' }}>
                Personal data
              </h1>
              <p className='home__sek-subtitle' style={{ color: 'white', 'text-align': 'center' }}>
                Please enter your personal data.
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

              <Textfield
                label='Current password'
                name='currentPassword'
                value={this.state.currentPassword}
                onChange={this.handleChange}
                width={TEXT_FIELD_WIDTH}
                extraStyles={{ 'margin-bottom': '75px' }} />
            </div>
          </div>
        </div>
    </>
  );
}

export default Userdata;