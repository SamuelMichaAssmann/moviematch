import React from 'react';
import './Group.css';
import { GroupMember } from './GroupMember';
import Loading from '../../assets/Loading/Loading';
import Matching from '../../assets/Matching/Matching';
import { matchingObj } from './Data';
import APIHandler from '../../manage/api/APIHandler';

const MAX_MEMBER_NAME_LENGTH = 20;

export default class Group extends React.Component {

    constructor(props) {
        super(props);
        this.groupId = new URLSearchParams(window.location.search).get('id');

        this.state = {
            name: '',
            members: [],
            loaded: false
        };

        this.getGroupInfo = this.getGroupInfo.bind(this);
        this.getMemberDivs = this.getMemberDivs.bind(this);

        this.getGroupInfo();
        
    }

    async getGroupInfo() {
        const response = await APIHandler.getRequest('http://127.0.0.1:5000/api/getGroupInfo', {
            group_id: this.groupId
        });

        if ('errorMsg' in response) {
            return;
        }

        this.setState({
            name: response.name,
            members: response.members.map(item => ({
                name: this.trimString(item.name, MAX_MEMBER_NAME_LENGTH),
                owner: item.owner
            })),
            loaded: true
        });
    }

    trimString(str, maxLength) {
        if (str.length <= maxLength) {
            return str;
        }

        return str.substring(0, maxLength - 3) + '...';
    }

    getMemberDivs() {
        return this.state.members.map((memberInfo, index) => {
            return (
                <GroupMember key={index} {...memberInfo} />
            );
        });
    }

    getGroupContent() {
        if (!this.state.loaded) {
            return (
                <Loading />
            );
        }

        return (
            <>
                <h1 className='groupTitle'>
                    {this.state.name}
                </h1>
                <h2 className='groupId'>
                    {`ID: ${this.groupId}`}
                </h2>
                <div className='groupViewContainer darkBg'>
                    <div className='groupContent'>{this.getGroupPhaseContent()}</div>
                    <div className='groupMemberList'>
                        <h2 className='groupTitle'>Members</h2>
                        <div className='groupMembers'>
                            {this.getMemberDivs()}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    getGroupPhaseContent() {

        return (
            <div>
                <Matching {...matchingObj} />
                {/* <Match/> */}
            </div>
        );
    }

    render() {
        return (
            <div className='darkBg'>
                <div className='groupContainer'>
                    {this.getGroupContent()}
                </div>
            </div>
        );
    }
}