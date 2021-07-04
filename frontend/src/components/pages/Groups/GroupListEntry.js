import React from 'react';
import './Groups.css'
import { Button } from '../../assets/Button/Button';
import APIHandler from '../../manage/api/APIHandler';

const MAX_NAME_LENGTH = 100;
const MAX_MEMBER_LENGTH = 40;

// The GroupListEntry component handles a single group in the group list on the "Groups" page.
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

    /**
     * Retrieve a string to represent the members in a group entry.
     * If there are 0 members, "No members" is shown.
     * If there are 1 or 2 members, the member names are shown.
     * If there are more than 2 members, the first two members are shown, plus the amount of other users.
     * @param {List} members 
     * @returns The members string.
     */
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

    /**
     * Trim a string to a certain maximum length.
     * If the string exceeds this length, it is cut off by three periods (...).
     * @param {*} str The string to trim.
     * @param {*} maxLength The maximum length of the string, in characters.
     * @returns The trimmed string.
     */
    trimString(str, maxLength) {
        if (str.length <= maxLength) {
            return str;
        }

        return str.substring(0, maxLength - 3) + '...';
    }

    /**
     * Handle clicking on the group entry (i.e. open the group so that the user can
     * join or leave/delete the group).
     */
    onClick() {
        if (this.state.canClickGroup) {
            this.setState({ open: !this.state.open });
        }
    }

    /**
     * Retrieve the join and leave/delete button elements for when the group is clicked.
     * @returns The HTML content.
     */
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

    /**
     * Check if the currently logged in user owns the group.
     * @returns True if the user owns the group, false if not.
     */
    isOwner() {
        return (this.state.owner === localStorage.getItem('uid'));
    }

    /**
     * Retrieve the div element that displays if the user owns the group.
     * @returns The div element.
     */
    getIsOwnerDiv() {
        return this.isOwner()
            ? <div className='groupListEntryMembers'>Owned by me.</div>
            : null;
    }

    /**
     * Attempt to delete a group (only possible if the user owns the group, but this is handled
     * on the backend).
     */
    async deleteGroup() {
        this.setState({ canClickGroup: false, open: true });
        await APIHandler.postRequest('http://127.0.0.1:5000/api/deleteGroup', {
            user_id: localStorage.getItem('uid'),
            group_id: this.state.id
        });

        window.location.reload();
    }

    /**
     * Leave a group that the user is in.
     */
    async leaveGroup() {
        this.setState({ canClickGroup: false, open: true });
        await APIHandler.postRequest('http://127.0.0.1:5000/api/leaveGroup', {
            user_id: localStorage.getItem('uid'),
            group_id: this.state.id
        });

        window.location.reload();
    }

    /**
     * Join a group, i.e. go to the group page for this group.
     */
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