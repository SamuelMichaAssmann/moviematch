import React from 'react';
import APIHandler from '../../manage/api/APIHandler'
import { GroupList } from './GroupList'
import { Button } from '../../assets/Button/Button';
import { Textfield } from '../../assets/Textfield/Textfield';

export default class Groups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clickedCreateGroup: false,
      createGroupName: '',
      groups: []
    };

    this.getGroups = this.getGroups.bind(this);
    this.getCreateGroupFields = this.getCreateGroupFields.bind(this);
    this.handleChange = this.handleChange.bind(this);

    setTimeout(this.getGroups, 1000);
  }

  async getGroups() {
    this.setState({
      groups: [
        {
          id: 1,
          name: 'Weekly movie night with the boys',
          members: ['Samuel', 'Moritz', 'Djemie'],
          owner: 10
        },
        {
          id: 42,
          name: 'Test group',
          members: ['Test A', 'Test B', 'Test C', 'Test D', 'Test E'],
          owner: 10
        },
        {
          id: 48393,
          name: 'Lonely group',
          members: ['Lonely person'],
          owner: 10
        },
        {
          id: 999,
          name: 'Abanboned group',
          members: [],
          owner: 10
        },
        {
          id: 83409,
          name: 'A group with a very long name, which should hopefully be cut off by our function, but we\'ll have to wait and see.',
          members: ['A person with a very long name who is part of the group with the very long name', 'John', 'Another person with a very long name who is part of the group with the very long name'],
          owner: 10
        }
      ]
    });
  }

  getCreateGroupFields() {
    if (!this.state.clickedCreateGroup) {
      return null;
    }

    return (
      <>
        <Textfield
          label='Group name'
          name='createGroupName'
          value={this.state.createGroupName}
          onChange={this.handleChange}
          extraClasses='createGroupInput' />

        <div className='createGroupInnerButtonContainer'>
          <Button
            buttonStyle='btn--outline'
            extraStyles={{marginRight: '20px'}}
            onClick={() => { console.log('To be implemented!'); }}
          >
            Create
          </Button>

          <Button
            buttonStyle='btn--outline'
            extraClasses='btn--outline-red'
            onClick={() => { this.setState({ clickedCreateGroup: false }); }}
          >
            Cancel
          </Button>
        </div>
      </>
    )
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
          <div className='groupContainer'>
            <h1 className='groupDesc'>
              My Groups
            </h1>

            <Button
              buttonStyle='btn--outline'
              extraClasses='createGroupButton'
              onClick={() => { this.setState({ clickedCreateGroup: !this.state.clickedCreateGroup }); }}
            >
              Create group
            </Button>
            {this.getCreateGroupFields()}
          </div>

          <br></br>
          <br></br>

          <GroupList groups={this.state.groups} />
        </div>
      </>
    );
  }
}
