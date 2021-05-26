import React from 'react';
import './Group.css';
import { MemberStatus } from './MemberStatus';
import { GroupMember } from './GroupMember';
import Matching from '../Matching/Matching';

export default class Group extends React.Component {

    constructor(props) {
        super(props);
        this.groupId = new URLSearchParams(window.location.search).get('id');
        
        this.state = {
            name: '',
            members: []
        };

        this.getGroupInfo = this.getGroupInfo.bind(this);
        this.getMemberDivs = this.getMemberDivs.bind(this);
        
        setTimeout(this.getGroupInfo, 1000);
    }

    async getGroupInfo() {
        // TODO request info from API
        // and for security reasons, make sure it can only be requested if we are actually in the group
        this.setState({
            name: 'Movie night with the boys',
            members: [
                {
                    name: 'Samuel',
                    status: MemberStatus.ONLINE,
                    owner: false
                },
                {
                    name: 'Moritz',
                    status: MemberStatus.OFFLINE,
                    owner: false
                },
                {
                    name: 'Djemie',
                    status: MemberStatus.ONLINE,
                    owner: true
                }
            ]
        });
    }

    getMemberDivs() {
        return this.state.members.map((memberInfo, index) => {
            return (
                <GroupMember key={index} {...memberInfo} />
            );
        });
    }

    render() {
        return (
            <div className='groupViewContainer darkBg'>
                <div className='groupFilm'></div>
                <div className='groupMemberList'>{this.getMemberDivs()}</div>
                <Matching/>
            </div>  
        );
    }
}