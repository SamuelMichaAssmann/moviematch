import React from 'react';
import './Group.css';
import { MemberStatus } from './MemberStatus';
import { GroupPhase } from './GroupPhase';
import { GroupMember } from './GroupMember';
import Matching from '../Matching/Matching';
import { MatchingType } from '../Matching/MatchingType';
import Loading from '../../assets/Loading/Loading';
import { Button } from '../../assets/Button/Button';

export default class Group extends React.Component {

    constructor(props) {
        super(props);
        this.groupId = new URLSearchParams(window.location.search).get('id');

        this.state = {
            name: '',
            members: [],
            loaded: false,
            phase: GroupPhase.IDLE
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
            ],
            loaded: true
        });
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
                <div className='groupViewContainer darkBg'>
                    <div className='groupContent'>{this.getGroupPhaseContent()}</div>
                    <div className='groupMemberList'>
                        <h2 className='groupTitle'>Members</h2>
                        {this.getMemberDivs()}
                    </div>
                </div>
            </>
        );
    }

    getGroupPhaseContent() {
        switch (this.state.phase) {
            case GroupPhase.IDLE:
                return (
                    <div className='groupStartMatchButtonWrapper'>
                        <Button
                            buttonSize='btn--wide' buttonColor='blue'
                            extraClasses='groupStartMatchButton'
                            onClick={() => this.setState({ phase: GroupPhase.MATCHING })}
                        >
                            Find a movie!
                        </Button>
                    </div>
                );

            case GroupPhase.MATCHING:
                return <Matching type={MatchingType.GROUP} />;
        }
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