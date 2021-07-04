import React from 'react';
import { RiVipCrownFill } from 'react-icons/ri';

// The GroupMember component handles a single member in a group's member list.
export const GroupMember = ({
    name,
    owner
}) => {

    const nameParagraph = owner
        ? <p className='groupMemberText'><RiVipCrownFill /> {name}</p>
        : <p className='groupMemberText'>{name}</p>;

    return (
        <div className='groupMember darkBg'>
            {nameParagraph}
        </div>
    )
};
