import React from 'react';
import APIHandler from '../../manage/api/APIHandler';
import { GroupList } from './GroupList';
import { Button } from '../../assets/Button/Button';
import { Textfield } from '../../assets/Textfield/Textfield';
import Loading from '../../assets/Loading/Loading';

export default class Groups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clickedCreateGroup: false,
      createGroupName: '',
      clickedJoinGroup: false,
      joinGroupId: '',
      joinGroupError: '',
      groups: [],
      loadedGroupList: false
    };

    this.getGroups = this.getGroups.bind(this);
    this.getCreateGroupFields = this.getCreateGroupFields.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.getJoinGroupFields = this.getJoinGroupFields.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
    this.getGroupListElements = this.getGroupListElements.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.getGroups();
  }

  async getGroups() {
    const response = await APIHandler.getRequest('http://127.0.0.1:5000/api/groupList', {
      user_id: localStorage.getItem('uid')
    });

    if (!('errorMsg' in response)) {
      this.setState({
        groups: response['groups'],
        loadedGroupList: true
      });
    }
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
            extraStyles={{ marginRight: '20px' }}
            onClick={this.createGroup}
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

  getJoinGroupFields() {
    if (!this.state.clickedJoinGroup) {
      return null;
    }

    return (
      <>
        <Textfield
          label='Group ID'
          name='joinGroupId'
          value={this.state.joinGroupId}
          onChange={this.handleChange}
          extraClasses='createGroupInput' />

        <div className='createGroupInnerButtonContainer'>
          <Button
            buttonStyle='btn--outline'
            extraStyles={{ marginRight: '20px' }}
            onClick={this.joinGroup}
          >
            Join
          </Button>

          <Button
            buttonStyle='btn--outline'
            extraClasses='btn--outline-red'
            onClick={() => { this.setState({ clickedJoinGroup: false }); }}
          >
            Cancel
          </Button>
        </div>

        <p className='joinGroupError'>{this.state.joinGroupError}</p>
      </>
    )
  }

  async createGroup() {
    await APIHandler.postRequest('http://127.0.0.1:5000/api/newGroup', {
      group_name: this.state.createGroupName,
      members: [ localStorage.getItem('uid') ],
      owner_id: localStorage.getItem('uid')
    });

    window.location.reload();
  }

  async joinGroup() {
    const response = await APIHandler.postRequest('http://127.0.0.1:5000/api/joinGroup', {
      user_id: localStorage.getItem('uid'),
      group_id: this.state.joinGroupId
    });

    if ('message' in response) {
      this.setState({ joinGroupError: response.message });
    } else {
      window.location.reload();
    }
  }

  getGroupListElements() {
    if (!this.state.loadedGroupList) {
      return <Loading />;
    }

    if (this.state.groups.length === 0) {
      return <p className='noGroupsText'>You are not yet in any groups!</p>
    }

    return <GroupList groups={this.state.groups} />;
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

            <Button
              buttonStyle='btn--outline'
              extraClasses='joinGroupButton'
              onClick={() => { this.setState({ clickedJoinGroup: !this.state.clickedJoinGroup }); }}
            >
              Join group
            </Button>
            {this.getJoinGroupFields()}
          </div>

          <br></br>
          <br></br>

          {this.getGroupListElements()}
        </div>
      </>
    );
  }
}
