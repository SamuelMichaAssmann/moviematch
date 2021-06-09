import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { Textfield } from '../Textfield/Textfield'
import "./Userdata.css"
import Data from './Data';


const TEXT_FIELD_WIDTH = '300px';

function Userdata2() {
  const [state, setState] = React.useState({
    explain: true,
    find: true,
    advert: true,
  });

  const [user, setUser] = React.useState({
    username: '',
    age: '',
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const validate = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setUser({
      [name]: value
    });
  };


  const { explain, find, advert } = state;
  const error = [explain, find, advert].filter((v) => v).length !== 3;

  return (

    <div className='darkBg'>
      <div className='container settings'>
        <div>
          <h1 className='heading' style={{ 'text-align': 'center' }}>
          Please enter your personal data
          </h1>
        </div>
        <div>
          <Textfield
            label='Username'
            name='username'
            value={user.username}
            onChange={validate}
            width={TEXT_FIELD_WIDTH} />
          <Textfield
            label='Age'
            name='age'
            value={user.age}
            onChange={validate}
            width={TEXT_FIELD_WIDTH} />
        </div>
        <div className="checkbox">
          <div className="checkbox_head">
            <Checkbox checked={find} onChange={handleChange} name="find" />
            {Data.find_head}
            <div className="checkbox_sub">
              {Data.find_sub}
            </div>
          </div>
          <div className="checkbox_head">
            <Checkbox checked={advert} onChange={handleChange} name="advert" />
            {Data.ad_head}
            <div className="checkbox_sub">
              {Data.ad_sub}
            </div>
          </div>
          <div className="checkbox_head">
            <Checkbox checked={explain} onChange={handleChange} name="explain" />
            {Data.exp_head}
            <div className="checkbox_sub">
              {Data.exp_sub}
            </div>
          </div>
          {error ? <div className="checkerror">*Please make sure everything is ticked</div> : ""}
        </div>
      </div >
    </div>


  );
}

export default Userdata2;

