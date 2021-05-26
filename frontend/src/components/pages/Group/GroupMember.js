import React from 'react';
import { MemberStatus } from './MemberStatus';
import { RiVipCrownFill } from 'react-icons/ri';

export const GroupMember = ({
    name,
    status,
    owner
}) => {

    const nameParagraph = owner
        ? <p className='groupMemberText'><RiVipCrownFill /> {name}</p>
        : <p className='groupMemberText'>{name}</p>;

    return (
        <div className='groupMember darkBg'>
            <span className={`groupMemberStatus ${(status == MemberStatus.ONLINE) ? 'online' : 'offline'}`}></span>
            {nameParagraph}
        </div>
    )
};
