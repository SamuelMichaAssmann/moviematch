import React from 'react';
import './Groups.css'
import { Button } from '../../assets/Button/Button';
import APIHandler from '../../manage/api/APIHandler';

const MAX_NAME_LENGTH = 100;
const MAX_MEMBER_LENGTH = 40;

export default class GroupListEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: this.trimString(props.name, MAX_NAME_LENGTH),
            members: this.getMemberString(props.members),
            owner: props.owner,
            open: false,
            canClickGroup: true
        };

        this.onClick = this.onClick.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.leaveGroup = this.leaveGroup.bind(this);
        this.joinGroup = this.joinGroup.bind(this);
        this.isOwner = this.isOwner.bind(this);
        this.getIsOwnerDiv = this.getIsOwnerDiv.bind(this);
    }

    getMemberString(members) {
        switch (members.length) {
            case 0:
                return 'No members.';

            case 1:
                return `${this.trimString(members[0], MAX_MEMBER_LENGTH)}.`;

            case 2:
                return `${this.trimString(members[0], MAX_MEMBER_LENGTH)} and `
                    + `${this.trimString(members[1], MAX_MEMBER_LENGTH)}.`;

            default:
                return `${this.trimString(members[0], MAX_MEMBER_LENGTH)}, `
                    + `${this.trimString(members[1], MAX_MEMBER_LENGTH)} and ${members.length - 2} `
                    + `other${(members.length === 3) ? '' : 's'}.`;
        }
    }

    trimString(str, maxLength) {
        if (str.length <= maxLength) {
            return str;
        }

        return str.substring(0, maxLength - 3) + '...';
    }

    onClick() {
        if (this.state.canClickGroup) {
            this.setState({ open: !this.state.open });
        }
    }

    getButtons() {
        if (!this.state.open && this.state.canClickGroup) {
            return null;
        }

        const leaveDeleteString = this.isOwner() ? 'Delete' : 'Leave';
        const leaveDeleteOnClick = this.isOwner() ? this.deleteGroup : this.leaveGroup;

        return (
            <div className='groupListButtonContainer'>
                <Button
                    buttonStyle='btn--outline'
                    extraStyles={{ marginRight: '20px' }}
                    onClick={this.joinGroup}
                >
                    Join
                </Button>

                <Button
                    buttonStyle='btn--outline'
                    onClick={leaveDeleteOnClick}
                >
                    {leaveDeleteString}
                </Button>
            </div>
        );
    }

    isOwner() {
        return (this.state.owner === localStorage.getItem('uid'));
    }

    getIsOwnerDiv() {
        return this.isOwner()
            ? <div className='groupListEntryMembers'>Owned by me.</div>
            : null;
    }

    async deleteGroup() {
        this.setState({ canClickGroup: false, open: true });
        await APIHandler.postRequest('http://127.0.0.1:5000/api/deleteGroup', {
            user_id: localStorage.getItem('uid'),
            group_id: this.state.id
        });

        window.location.reload();
    }

    async leaveGroup() {
        this.setState({ canClickGroup: false, open: true });
        await APIHandler.postRequest('http://127.0.0.1:5000/api/leaveGroup', {
            user_id: localStorage.getItem('uid'),
            group_id: this.state.id
        });

        window.location.reload();
    }

    joinGroup() {
        this.setState({ canClickGroup: false });
        window.location.href = `group?id=${this.state.id}`;
    }

    render() {
        return (
            <div className='groupListContainer'>
                <div className='groupListEntry' onClick={this.onClick}>
                    <div className='groupListIconTextContainer'>
                        <img className='groupListIcon' src='images/group.svg' alt='group'></img>
                        <div className='groupListText'>
                            <div className='groupListEntryName'>{this.state.name}</div>
                            <div className='groupListEntryMembers'>{this.state.members}</div>
                            {this.getIsOwnerDiv()}
                        </div>
                    </div>
                    {this.getButtons()}
                </div>
            </div>
        );
    }
}