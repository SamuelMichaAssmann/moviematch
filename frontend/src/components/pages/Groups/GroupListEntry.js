import React from 'react';
import './Groups.css'

const MAX_NAME_LENGTH = 100;
const MAX_MEMBER_LENGTH = 40;

export default class GroupListEntry extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: this.trimString(props.name, MAX_NAME_LENGTH),
            members: this.getMemberString(props.members),
            open: false
        };

        this.onClick = this.onClick.bind(this);
    }

    getMemberString(members) {
        switch (members.length) {
            case 0:
                return'No members.';
    
            case 1:
                return `${this.trimString(members[0], MAX_MEMBER_LENGTH)}.`;
    
            case 2:
                return `${this.trimString(members[0], MAX_MEMBER_LENGTH)} and `
                    + `${this.trimString(members[1], MAX_MEMBER_LENGTH)}.`;
    
            default:
                return `${this.trimString(members[0], MAX_MEMBER_LENGTH)}, `
                    + `${this.trimString(members[1], MAX_MEMBER_LENGTH)} and ${members.length - 2} `
                    + `other${(members.length == 3) ? '' : 's'}.`;
        }
    }
    
    trimString(str, maxLength) {
        if (str.length <= maxLength) {
            return str;
        }
    
        return str.substring(0, maxLength - 3) + '...';
    }

    onClick() {
        window.open(`group?id=${this.state.id}`, '_self');
        // this.setState({ open: true });
    }

    render() {
        return (
            <div className='groupListContainer'>
                <div className='groupListEntry' onClick={this.onClick}>
                    <img className='groupListIcon' src='images/group.svg' alt='group'></img>
                    <div className='groupListText'>
                        <div className='groupListEntryName'>{this.state.name}</div>
                        <div className='groupListEntryMembers'>{this.state.members}</div>
                    </div>
                </div>
            </div>
        );
    }
}